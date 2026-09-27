import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { ClientProviders } from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'Nestora - Real Estate Marketplace | Find a place that feels like home',
  description: 'Find a place that feels like home. Browse homes for sale and rent, explore neighborhood data, calculate mortgages, and connect with top real estate advisors.',
  openGraph: {
    title: 'Nestora - Real Estate Marketplace',
    description: 'Find a place that feels like home. Browse homes for sale and rent, explore neighborhood data, calculate mortgages, and connect with top real estate advisors.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nestora - Real Estate Marketplace',
    description: 'Find a place that feels like home. Browse homes for sale and rent, explore neighborhood data, calculate mortgages, and connect with top real estate advisors.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
