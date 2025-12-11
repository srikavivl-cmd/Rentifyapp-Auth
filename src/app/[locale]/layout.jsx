import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import SessionProvider from '@/components/SessionProvider';
import { routing } from '@/i18n/routing';
import Header from '@/components/client/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: {
      default: 'Rentify - Property Rental Platform',
      template: '%s | Rentify',
    },
    description: 'Find your perfect rental home with Rentify. Explore properties, book appointments, and connect with owners.',
    keywords: ['rentify', 'property rental', 'rent homes', 'book appointments', 'rental platform'],
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
