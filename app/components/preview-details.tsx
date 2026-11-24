'use client';

import { motion } from 'motion/react';
import { ArrowRight, Clock3, MapPin, Phone, Utensils } from 'lucide-react';
import { PreviewLink } from '../lib/preview-brand';
import { phoneHref, type PreviewListing } from '../lib/preview-listing';

type Props = { listing: PreviewListing };

export function MapLink({ listing, children }: Props & { children: React.ReactNode }) {
  return <a href={listing.map} target="_blank" rel="noreferrer">{children}</a>;
}

export function PhoneLink({ listing }: Props) {
  return <a href={phoneHref(listing)}>{listing.phone}</a>;
}

export function PreviewMenu({ listing, home = false }: Props & { home?: boolean }) {
  const dishes = home ? listing.dishes.slice(0, 4) : listing.dishes;
  return (
    <section className={home ? 'home-menu wrap' : 'menu-page wrap preview-menu'}>
      <div className="section-top">
        <div>
          <div className="eyebrow">FOOD &amp; DRINK</div>
          <h2>{home ? 'Explore Our Menu' : 'Menu Highlights'}</h2>
        </div>
        {home && dishes.length > 0 && <PreviewLink className="text-link" href="/menu">View menu highlights <ArrowRight/></PreviewLink>}
      </div>
      {dishes.length > 0 ? <>
        <p className="preview-menu-note">
          {listing.menuKind === 'menu' ? 'Selected items from a public menu.' : 'Selections mentioned in public listings or guest reviews.'}
          {' '}Call for current availability and prices.
        </p>
        <div className="dish-grid">
          {dishes.map(dish => (
            <motion.article whileHover={{ y: -3 }} className="preview-dish" key={dish}>
              <Utensils aria-hidden="true"/>
              <h3>{dish}</h3>
            </motion.article>
          ))}
        </div>
        {!home && <a className="text-link" href={listing.menuSource} target="_blank" rel="noreferrer">View the food listing <ArrowRight/></a>}
      </> : <div className="preview-dish">
        <h3>Ask about today’s menu</h3>
        <p>A public item list was unavailable. Call {listing.name} for dishes and prices.</p>
        <PhoneLink listing={listing}/>
      </div>}
    </section>
  );
}

export function PreviewRating({ listing }: Props) {
  const many = listing.reviews !== '1';
  return (
    <section className="wrap preview-rating">
      <div className="eyebrow">GUEST REVIEWS</div>
      <h2>On Google Maps</h2>
      <p><strong>★ {listing.rating}</strong> · {listing.reviews} {many ? 'reviews' : 'review'}</p>
      <MapLink listing={listing}>Read on Google Maps</MapLink>
    </section>
  );
}

export function PreviewContact({ listing }: Props) {
  return (
    <section className="contact-main wrap preview-contact">
      <aside>
        <h2>Contact Information</h2>
        <div className="contact-details">
          <div><MapPin/><span><b>ADDRESS</b><p>{listing.address}, Ghana</p></span></div>
          <div><Phone/><span><b>PHONE</b><p><PhoneLink listing={listing}/></p></span></div>
          <div><Clock3/><span><b>OPENING HOURS</b><p><MapLink listing={listing}>Check hours on Google Maps</MapLink></p></span></div>
        </div>
      </aside>
      <div>
        <div className="eyebrow">VISIT US</div>
        <h2>Find Us Here</h2>
        <p>Get directions to {listing.name} in {listing.area}.</p>
        <a className="button" href={listing.map} target="_blank" rel="noreferrer"><MapPin/> Open in Google Maps</a>
      </div>
    </section>
  );
}

export function PreviewInfoStrip({ listing }: Props) {
  return (
    <section className="info-strip">
      <div><Clock3/><span><h3>Opening Hours</h3><MapLink listing={listing}>Check on Google Maps</MapLink></span></div>
      <div><MapPin/><span><h3>Our Location</h3><MapLink listing={listing}>{listing.address}</MapLink></span></div>
      <div><Phone/><span><h3>Contact Us</h3><PhoneLink listing={listing}/></span></div>
      <div><span><h3>Guest Reviews</h3><MapLink listing={listing}>★ {listing.rating} on Google Maps</MapLink></span></div>
    </section>
  );
}
