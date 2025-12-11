'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PropertyForm } from '@/components/forms';
import { createPropertyAction, deletePropertyAction, updateAppointmentStatusAction } from '@/app/actions';

export default function OwnerDashboardContent({ 
  userName, 
  userId,
  properties: initialProperties, 
  appointments: initialAppointments,
  stats 
}) {
  const t = useTranslations();
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [properties, setProperties] = useState(initialProperties);
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleAddProperty = async (propertyData) => {
    await createPropertyAction({
      ...propertyData,
      ownerId: Number(userId),
      verified: false,
      highlight: false,
      datePosted: new Date().toISOString().slice(0, 10),
    });
    setShowAddForm(false);
    router.refresh();
  };

  const handleDeleteProperty = async (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await deletePropertyAction(id);
      setProperties(properties.filter((p) => p.id !== id));
      router.refresh();
    }
  };

  const handleAppointmentAction = async (id, status) => {
    await updateAppointmentStatusAction(id, status);
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status } : a))
    );
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t('dashboard.welcome')}, {userName}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">{t('dashboard.totalProperties')}</h3>
          <p className="text-3xl font-bold">{stats.totalProperties}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">{t('dashboard.pendingAppointments')}</h3>
          <p className="text-3xl font-bold">{stats.pendingAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">{t('dashboard.verifiedProperties')}</h3>
          <p className="text-3xl font-bold">{stats.verifiedProperties}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('nav.myProperties')}</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            {t('property.addProperty')}
          </button>
        </div>

        {showAddForm && (
          <PropertyForm onSubmit={handleAddProperty} onCancel={() => setShowAddForm(false)} />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4">{property.title}</td>
                  <td className="px-6 py-4">{property.city}</td>
                  <td className="px-6 py-4">${property.price}/mo</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        property.verified
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {property.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      {t('common.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">{t('nav.appointments')}</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="px-6 py-4">Property #{apt.propertyId}</td>
                  <td className="px-6 py-4">{apt.scheduledDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        apt.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : apt.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {apt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAppointmentAction(apt.id, 'confirmed')}
                          className="text-green-600 hover:underline text-sm"
                        >
                          {t('appointment.confirm')}
                        </button>
                        <button
                          onClick={() => handleAppointmentAction(apt.id, 'cancelled')}
                          className="text-red-600 hover:underline text-sm"
                        >
                          {t('appointment.cancel')}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
