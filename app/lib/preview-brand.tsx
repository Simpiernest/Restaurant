'use client';

import { createContext, useContext, type ComponentProps } from 'react';
import NextLink from 'next/link';

export const PreviewBrand = createContext({ name: 'BellaVista', slug: '' });

export function usePreviewBrand() {
  const { name, slug } = useContext(PreviewBrand);
  return {
    slug,
    brand: (text: string) => text.replace(/Bella\s?Vista/gi, original =>
      original === original.toUpperCase() ? name.toUpperCase() : name),
  };
}

export function PreviewLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { slug } = usePreviewBrand();
  const scopedHref = slug && typeof href === 'string' && href.startsWith('/')
    ? `/preview/${slug}${href === '/' ? '' : href}`
    : href;
  return <NextLink href={scopedHref} {...props} />;
}
