import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function PropertyCard({ property }) {
  const t = await getTranslations();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={property.images?.[0] || 'https://picsum.photos/800/600'}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {property.verified && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {t('property.verified')}
          </span>
        )}
        {property.highlight && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            {t('property.featured')}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{property.city}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary-600 font-bold text-lg">
            ${property.price}{t('property.perMonth')}
          </span>
          <span className={`text-sm ${property.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
            {property.availability === 'Available' ? t('property.available') : t('property.notAvailable')}
          </span>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <span className="mr-3">{property.type}</span>
        </div>
        <Link
          href={`/properties/${property.id}`}
          className="mt-4 block text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
        >
          {t('property.viewDetails')}
        </Link>
      </div>
    </div>
  );
}
