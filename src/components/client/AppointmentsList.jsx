'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { updateAppointmentStatusAction } from '@/app/actions';

export default function AppointmentsList({ appointments: initialAppointments }) {
  const t = useTranslations();
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleCancel = async (id) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      await updateAppointmentStatusAction(id, 'cancelled');
      setAppointments(
        appointments.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      );
      router.refresh();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">{t('appointment.noAppointments')}</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t('appointment.property')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t('appointment.date')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t('appointment.status')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {t('admin.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                Property #{appointment.propertyId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.scheduledDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                  {t(`appointment.${appointment.status}`) || appointment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {appointment.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    {t('appointment.cancel')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
