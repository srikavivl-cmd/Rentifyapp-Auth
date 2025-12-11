'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { createAppointmentAction } from '@/app/actions';

export default function BookingWidget({ propertyId, ownerId }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'authenticated') {
      router.push(`/${locale}/login`);
      return;
    }

    setLoading(true);
    try {
      await createAppointmentAction({
        propertyId: parseInt(propertyId),
        userId: Number(session.user.id),
        ownerId: ownerId,
        scheduledDate: date,
      });
      setShowForm(false);
      setDate('');
      alert(t('appointment.submitted') || 'Appointment request submitted!');
    } catch (error) {
      alert('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
      >
        {t('property.bookAppointment')}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('appointment.selectDate')}</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? t('common.loading') : t('common.submit')}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          {t('common.cancel')}
        </button>
      </div>
    </form>
  );
}
