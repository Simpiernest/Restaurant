import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Restaurant from '../../../restaurant';
import brands from '../../../lib/preview-brands.json';

const pages: Record<string, string> = {
  home: 'Website Concept',
  menu: 'Our Menu',
  about: 'Our Story',
  gallery: 'Our Gallery',
  testimonials: 'Guest Stories',
  contact: 'Contact Us',
  cart: 'Your Cart',
  reservations: 'Reserve a Table',
  checkout: 'Checkout',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  faq: 'Frequently Asked Questions',
};

type Params = { slug: string; section?: string[] };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(brands).flatMap(slug =>
    Object.keys(pages).map(page => ({ slug, section: page === 'home' ? [] : [page] })),
  );
}

function getPreview({ slug, section = [] }: Params) {
  const name = brands[slug as keyof typeof brands];
  const [page = 'home'] = section;
  if (!name || !Object.hasOwn(pages, page) || section.length > 1) notFound();
  return { name, page, slug };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { name, page } = getPreview(await params);
  return {
    title: `${name} | ${pages[page]}`,
    description: `Unofficial website concept for ${name}. Uses sample content.`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: { params: Promise<Params> }) {
  const { name, page, slug } = getPreview(await params);
  return <Restaurant page={page} preview={{ name, slug }} />;
}
