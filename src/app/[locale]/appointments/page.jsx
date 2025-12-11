import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { authOptions } from '@/lib/auth';
import { getAppointments } from '@/lib/data';
import AppointmentsList from '@/components/client/AppointmentsList';

export default async function AppointmentsPage({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations();
  const userId = Number(session.user.id);
  const appointments = getAppointments({ userId });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('appointment.myAppointments')}</h1>
      <AppointmentsList appointments={appointments} />
    </div>
  );
}
