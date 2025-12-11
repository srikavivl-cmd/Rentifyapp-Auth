import { getTranslations } from 'next-intl/server';
import { getProperties } from '@/lib/data';
import HeroSection from '@/components/server/HeroSection';
import PropertiesSection from '@/components/server/PropertiesSection';

export default async function HomePage() {
  const t = await getTranslations();
  const properties = getProperties();

  const featuredProperties = properties.filter((p) => p.highlight).slice(0, 4);
  const recentProperties = properties.slice(0, 4);

  return (
    <div>
      <HeroSection />

      <PropertiesSection 
        title={t('home.featuredProperties')} 
        properties={featuredProperties} 
      />

      <section className="py-16 bg-gray-100">
        <PropertiesSection 
          title={t('home.recentProperties')} 
          properties={recentProperties} 
        />
      </section>
    </div>
  );
}
