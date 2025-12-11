'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const cities = ['Los Angeles', 'Chicago', 'New York', 'Houston', 'Phoenix'];
const types = ['Apartment', 'House', 'Villa', 'Studio', 'Condo'];

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();

  const [city, setCity] = useState(searchParams.get('city') || '');
  const [type, setType] = useState(searchParams.get('type') || '');

  const handleApply = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    const search = searchParams.get('search');
    if (search) params.set('search', search);
    router.push(`/${locale}/properties?${params.toString()}`);
  };

  const handleClear = () => {
    setCity('');
    setType('');
    router.push(`/${locale}/properties`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">{t('property.filters')}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('property.city')}</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">{t('property.allCities')}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('property.type')}</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">{t('property.allTypes')}</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleApply}
            className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
          >
            {t('common.apply')}
          </button>
          <button
            onClick={handleClear}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
          >
            {t('common.clear')}
          </button>
        </div>
      </div>
    </div>
  );
}
