import { getTranslations } from 'next-intl/server';
import PropertyCard from './PropertyCard';

export default async function PropertyGrid({ properties }) {
  const t = await getTranslations();

  if (properties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('property.noProperties')}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
