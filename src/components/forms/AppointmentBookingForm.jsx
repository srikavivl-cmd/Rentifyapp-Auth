'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AppointmentBookingForm({ onSubmit, onCancel }) {
  const t = useTranslations();

  const [bookingDate, setBookingDate] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      scheduledDate: bookingDate,
      message: bookingMessage,
    });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold">{t('appointment.bookAppointment')}</h3>

      <div>
        <label className="block text-sm font-medium mb-1">{t('appointment.selectDate')}</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
          min={minDate}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{t('appointment.message')}</label>
        <textarea
          value={bookingMessage}
          onChange={(e) => setBookingMessage(e.target.value)}
          placeholder={t('appointment.messagePlaceholder')}
          className="w-full border rounded-lg px-3 py-2 h-24"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
        >
          {t('appointment.submit')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          {t('appointment.cancel')}
        </button>
      </div>
    </form>
  );
}
