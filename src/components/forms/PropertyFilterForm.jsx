'use client';

import { useTranslations } from 'next-intl';

const cities = ['Los Angeles', 'Chicago', 'New York', 'Houston', 'Phoenix'];
const types = ['Apartment', 'House', 'Villa', 'Studio', 'Condo'];

export default function PropertyFilterForm({ filters, onFilterChange, onApply, onClear }) {
  const t = useTranslations();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold mb-4">{t('property.filters')}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('property.city')}</label>
          <select
            value={filters.city || ''}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">{t('property.allCities')}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('property.type')}</label>
          <select
            value={filters.type || ''}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">{t('property.allTypes')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={onApply}
            className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
          >
            {t('common.apply')}
          </button>
          <button
            onClick={onClear}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
          >
            {t('common.clear')}
          </button>
        </div>
      </div>
    </div>
  );
}
