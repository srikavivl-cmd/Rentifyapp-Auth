import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getProperties, getAppointments } from '@/lib/data';
import OwnerDashboardContent from '@/components/client/OwnerDashboardContent';

export default async function OwnerDashboard({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  if (session.user.role !== 'owner') {
    redirect(`/${locale}/login`);
  }

  const userId = Number(session.user.id);
  const properties = getProperties();
  const appointments = getAppointments({ ownerId: userId });

  const ownerProperties = properties.filter((p) => p.ownerId === userId);
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const verifiedProperties = ownerProperties.filter((p) => p.verified);

  return (
    <OwnerDashboardContent
      userName={session.user.name}
      userId={session.user.id}
      properties={ownerProperties}
      appointments={appointments}
      stats={{
        totalProperties: ownerProperties.length,
        pendingAppointments: pendingAppointments.length,
        verifiedProperties: verifiedProperties.length,
      }}
    />
  );
}
