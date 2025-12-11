import { getTranslations } from 'next-intl/server';
import { getPropertyById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BookingWidget from '@/components/client/BookingWidget';
import BackButton from '@/components/client/BackButton';

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const t = await getTranslations();
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={property.images?.[0] || 'https://picsum.photos/800/600'}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {property.images?.length > 1 && (
            <div className="flex gap-2 mt-4">
              {property.images.slice(1).map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded overflow-hidden">
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-gray-500">{property.city}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-600">${property.price}</span>
              <span className="text-gray-500">{t('property.perMonth')}</span>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {property.verified && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {t('property.verified')}
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                property.availability === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {property.availability === 'Available'
                ? t('property.available')
                : t('property.notAvailable')}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {property.type}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">{t('property.description')}</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {property.availability === 'Available' && (
            <div className="border-t pt-6">
              <BookingWidget propertyId={property.id} ownerId={property.ownerId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
