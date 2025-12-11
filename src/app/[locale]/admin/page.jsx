import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { authOptions } from '@/lib/auth';
import { getProperties, getAppointments, getUsers } from '@/lib/data';
import StatsCard from '@/components/server/StatsCard';
import AdminTabs from '@/components/client/AdminTabs';

export default async function AdminDashboard({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  if (session.user.role !== 'admin') {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations();
  const properties = getProperties();
  const appointments = getAppointments();
  const users = getUsers();

  const pendingProperties = properties.filter((p) => !p.verified);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {t('dashboard.welcome')}, {session.user.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title={t('dashboard.totalUsers')} value={users.length} />
        <StatsCard title={t('dashboard.totalProperties')} value={properties.length} />
        <StatsCard title={t('dashboard.pendingVerifications')} value={pendingProperties.length} />
        <StatsCard title={t('dashboard.totalAppointments')} value={appointments.length} />
      </div>

      <AdminTabs
        pendingProperties={pendingProperties}
        allProperties={properties}
        users={users}
      />
    </div>
  );
}
