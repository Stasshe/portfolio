import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Creative Developer & Designer | Portfolio',
  description: 'Student and developer specializing in web development, backend systems, and Swift-based game development. Crafting digital experiences through code and design.',
  keywords: ['developer', 'designer', 'portfolio', 'web development', 'swift', 'game development', 'frontend', 'backend'],
  authors: [{ name: 'Portfolio' }],
  creator: 'Portfolio',
  publisher: 'Portfolio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio-example.com'),
  openGraph: {
    title: 'Creative Developer & Designer | Portfolio',
    description: 'Student and developer specializing in web development, backend systems, and Swift-based game development.',
    url: 'https://portfolio-example.com',
    siteName: 'Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Developer & Designer | Portfolio',
    description: 'Student and developer specializing in web development, backend systems, and Swift-based game development.',
    creator: '@portfolio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script src="//cdn.jsdelivr.net/npm/eruda" strategy="beforeInteractive" />
        <Script id="eruda-init" strategy="afterInteractive">
          {`eruda.init();`}
        </Script>
      </body>
    </html>
  );
}