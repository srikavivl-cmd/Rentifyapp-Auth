import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import PropertyCard from './PropertyCard';

export default async function PropertiesSection({ title, properties, showViewAll = true }) {
  const t = await getTranslations();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showViewAll && (
            <Link href="/properties" className="text-primary-600 hover:underline">
              {t('home.viewAll')}
            </Link>
          )}
        </div>
        {properties.length === 0 ? (
          <div className="text-center py-8 text-gray-500">{t('property.noProperties')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
