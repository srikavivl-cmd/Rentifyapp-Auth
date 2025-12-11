import { getTranslations } from 'next-intl/server';
import SearchBox from '@/components/client/SearchBox';

export default async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('home.heroTitle')}</h1>
        <p className="text-xl mb-8 text-primary-100">{t('home.heroSubtitle')}</p>
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-xl">
            <SearchBox placeholder={t('nav.search') || 'Search...'} width="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
