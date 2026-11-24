import type { Metadata } from 'next';
import './globals.css';
import { MotionProvider, ScrollTools } from './components/motion/system';
export const metadata: Metadata = { title: 'BellaVista | A Taste Beyond the Ordinary', icons: { icon: '/icon.svg' }, description: 'Exceptional cuisine, warm hospitality, and unforgettable moments. Explore BellaVista Restaurant.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body><MotionProvider><ScrollTools/>{children}</MotionProvider></body></html>; }

