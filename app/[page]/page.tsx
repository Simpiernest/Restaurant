import type { Metadata } from 'next';
import Restaurant from '../restaurant';
const pages: Record<string,string> = { menu:'Our Menu', about:'Our Story', gallery:'Our Gallery', testimonials:'Guest Stories', contact:'Contact Us', cart:'Your Cart', reservations:'Reserve a Table', checkout:'Checkout', privacy:'Privacy Policy', terms:'Terms of Service', faq:'Frequently Asked Questions' };
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(page => ({page})); }
export async function generateMetadata({params}:{params:Promise<{page:string}>}):Promise<Metadata> { const {page}=await params; return {title:`${pages[page] || 'BellaVista'} | BellaVista Restaurant`}; }
export default async function Page({params}: {params: Promise<{page:string}>}) { const {page} = await params; return <Restaurant page={page} />; }
