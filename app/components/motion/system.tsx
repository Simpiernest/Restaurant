'use client';
import { useEffect, useState, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig, motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useAnimate } from 'motion/react';
import { inView, scroll, animate } from 'motion';
import { ArrowUp, LoaderCircle } from 'lucide-react';
import { ease, timing, motionSettings } from '../../lib/animations';

export function MotionProvider({children}:{children:ReactNode}) {
 return <MotionConfig reducedMotion="user" transition={{duration:timing.page,ease}}>{children}</MotionConfig>;
}

// Enhance visible HTML after hydration. No content is hidden in server-rendered markup.
export function PageMotion({children}:{children:ReactNode}) {
 const path=usePathname(); const reduced=useReducedMotion(); const [scope,run]=useAnimate();
 useEffect(()=>{
  if(reduced || !scope.current) return;
  const root=scope.current as HTMLElement;
  const mobile=matchMedia('(max-width: 700px)').matches;
  const distance=mobile?motionSettings.mobileTravel:motionSettings.desktopTravel;
  const transactional=/cart|checkout|contact|reservations/.test(path);
  const stops:(()=>void)[]=[];
  const animations:{stop:()=>void}[]=[];
  const hero=root.querySelector('.hero');
  if(hero){
   hero.querySelectorAll('.hero-content > *').forEach((el,i)=>{animations.push(run(el,{opacity:[0,1],y:[distance,0]},{duration:transactional?.5:timing.hero,delay:i*(mobile?.06:.1),ease}));});
   const image=hero.querySelector('img');
   if(image)animations.push(run(image,{scale:[1.07,1]},{duration:mobile?1:1.8,ease}));
  }
  const groups=['.dish-grid > .dish-card','.features > div','.section-top','.home-story > *','.special > div:first-child','.experience > *','.home-book > *','.about-intro > *','.philosophy > *','.about-duo article','.head-chef > *','.timeline > *','.featured-review > *','.reviews-grid > article','.awards > *','.contact-details > div','.contact-main > div','.location > *','.visitor > *','.reservation-page > div','.reserve-banner > *','.info-strip > div','.footer-main > *'];
  groups.forEach(selector=>{root.querySelectorAll(selector).forEach((el,i)=>{
   const stop=inView(el,()=>{
    const photo=el.tagName==='IMG';
    animations.push(run(el,photo&&!mobile?{opacity:[.35,1],clipPath:['inset(0 12% 0 0)','inset(0 0% 0 0)']}:{opacity:[.15,1],y:[distance,0]},{duration:transactional?.45:timing.reveal,delay:(i%4)*(mobile?.05:timing.stagger),ease}));
    if(el.closest('.timeline'))el.classList.add('timeline-visible');
   },{amount:.12});stops.push(stop);
  });});
  if(!mobile&&!transactional){root.querySelectorAll<HTMLElement>('.special > img').forEach(el=>{
   const target=el.parentElement!;const control=animate(el,{y:[-motionSettings.parallaxPixels,motionSettings.parallaxPixels]},{ease:'linear'});
   animations.push(control);stops.push(scroll(control,{target,offset:['start end','end start']}));
  });}
  return()=>{stops.forEach(stop=>stop());animations.forEach(a=>a.stop());};
 },[path,reduced,run,scope]);
 return <div ref={scope} className="motion-page">{children}</div>;
}

export function ScrollTools(){
 const reduced=useReducedMotion(); const {scrollYProgress}=useScroll();
 const progress=useSpring(scrollYProgress,{stiffness:120,damping:30});
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const update=()=>setVisible(window.scrollY>600);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update)},[]);
 return <><motion.div aria-hidden="true" className="scroll-progress" style={{scaleX:reduced?scrollYProgress:progress}}/><AnimatePresence>{visible&&<motion.button className="back-top" aria-label="Back to top" initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} onClick={()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'})}><ArrowUp size={19}/></motion.button>}</AnimatePresence></>;
}

export function AnimatedValue({value,className=''}:{value:string|number;className?:string}){
 const reduced=useReducedMotion();return <motion.span key={value} className={`animated-value ${className}`} initial={reduced?false:{opacity:.5,y:5}} animate={{opacity:1,y:0}} transition={{duration:.2}}>{value}</motion.span>;
}
export function Reveal({children,className=''}:{children:ReactNode;className?:string}){
 const [scope,run]=useAnimate();const reduced=useReducedMotion();
 useEffect(()=>{if(reduced||!scope.current)return;return inView(scope.current,()=>{run(scope.current,{opacity:[.1,1],y:[20,0]},{duration:timing.reveal,ease})},{amount:.12})},[reduced,run,scope]);
 return <div ref={scope} className={className}>{children}</div>;
}
export function useDemoSubmission(){
 const [busy,setBusy]=useState(false);const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 function submit(done:()=>void){if(timer.current)return;setBusy(true);timer.current=setTimeout(()=>{timer.current=null;setBusy(false);done()},350)}
 return {busy,submit};
}
export function BusyLabel({busy,children}:{busy:boolean;children:ReactNode}){return <>{busy?<><LoaderCircle className="loading-spinner" size={17}/>Preparing preview…</>:children}</>}
export function Stars(){return <span className="stars" role="img" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(i=><span key={i} style={{animationDelay:`${i*.07}s`}} aria-hidden="true">★</span>)}</span>}


