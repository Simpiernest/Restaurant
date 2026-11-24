# BellaVista Restaurant

A responsive, front-end-only restaurant website built with Next.js App Router, React, TypeScript, and CSS. The visual direction and photo assets come from the supplied BellaVista references.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
```

The production build exports static files into `out/`. No database, API routes, payment gateway, authentication service, or backend is required.

## Pages

Home, Menu, About, Gallery, Testimonials, Contact, Reservations, Cart, Checkout, FAQs, Privacy, and Terms.

## Interactions

- Menu categories, quantity selectors, favorites, and add-to-cart actions.
- Browser-local cart and favorites persistence.
- Cart editing, item removal, totals, and a demo checkout.
- Filterable photo gallery and keyboard-accessible lightbox.
- Validated reservation, contact, and newsletter forms with honest demo confirmations.
- Responsive navigation, phone/email links, and map directions.

Forms do not transmit data and reservations do not book real tables. The social links currently open the social platforms; replace them with the restaurant's actual profiles before launch. Restaurant details, awards, and testimonials reproduce the supplied design content and should be confirmed before public use.

## Source

- `app/restaurant.tsx`: shared page layouts and interactive components.
- `app/globals.css`: visual system and responsive layouts.
- `app/[page]/page.tsx`: statically generated page routes.
- `public/assets/`: locally hosted WebP photographs extracted from the references.
- `scripts/extract-assets.cjs`: one-time extraction utility using the supplied local PNG files.

The two home references have differences; the second reference is the primary homepage layout. Font rendering, responsive behavior, and source-photo resolution mean this is a close recreation rather than a pixel-for-pixel image reproduction.

## Motion and interaction system

Motion for React adds page and hero entrances, one-time scroll reveals, staggered content, desktop parallax, animated filters, cart updates, image dialogs, and toast transitions. Timing, easing, travel distances, and illustrative delivery/tax amounts are centralized in `app/lib/animations.ts`. Reusable helpers live in `app/components/motion/system.tsx`.

Native scrolling is retained. Mobile uses shorter movements and disables parallax. `prefers-reduced-motion` disables decorative transforms and CSS animation; all content remains available in static HTML before hydration. The carousel is manually controlled, and the gallery supports previous/next buttons, arrow keys, Escape, and a keyboard focus trap.

Form progress and confirmations remain front-end demonstrations. No backend requests or payments were added. Pickup/delivery totals are illustrative and stored only in the current browser.

For the production preview, run `npm run build` followed by `npm run preview`, then open http://localhost:3001.
