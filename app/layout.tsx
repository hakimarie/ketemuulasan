import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'KetemuReview — Google Maps Review Management',
  description: 'Kelola review Google Business Profile dari satu inbox dengan AI.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
