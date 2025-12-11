import { getTranslations } from 'next-intl/server';
import { getProperties } from '@/lib/data';
import PropertyGrid from '@/components/server/PropertyGrid';
import FilterPanel from '@/components/client/FilterPanel';

export default async function PropertiesPage({ searchParams }) {
  const t = await getTranslations();
  const params = await searchParams;
  
  let properties = getProperties();

  if (params.highlight === 'true') {
    properties = properties.filter((p) => p.highlight);
  }

  if (params.city) {
    properties = properties.filter((p) => p.city === params.city);
  }

  if (params.type) {
    properties = properties.filter((p) => p.type === params.type);
  }

  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    properties = properties.filter((p) =>
      p.title.toLowerCase().includes(searchTerm) ||
      p.city.toLowerCase().includes(searchTerm) ||
      p.type.toLowerCase().includes(searchTerm) ||
      (p.description && p.description.toLowerCase().includes(searchTerm))
    );
  }

  if (params._sort) {
    const order = params._order === 'desc' ? -1 : 1;
    properties = [...properties].sort((a, b) => {
      if (a[params._sort] < b[params._sort]) return -1 * order;
      if (a[params._sort] > b[params._sort]) return 1 * order;
      return 0;
    });
  }

  if (params._limit) {
    properties = properties.slice(0, Number(params._limit));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('property.title')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <FilterPanel />
        </aside>

        <main className="flex-1">
          <PropertyGrid properties={properties} />
        </main>
      </div>
    </div>
  );
}
