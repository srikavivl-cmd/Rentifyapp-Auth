'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const propertyTypes = ['Apartment', 'House', 'Villa', 'Studio', 'Condo'];

export default function PropertyForm({ onSubmit, onCancel, initialData = null }) {
  const t = useTranslations();

  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      description: '',
      city: '',
      type: 'Apartment',
      price: '',
      images: ['https://picsum.photos/800/600'],
      availability: 'Available',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseInt(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Property title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price per month ($)</label>
          <input
            type="number"
            name="price"
            placeholder="Price per month"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Property description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          {t('common.save')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          {t('common.cancel')}
        </button>
      </div>
    </form>
  );
}
