import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { LoginForm } from '@/components/forms';

export default async function LoginPage({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const user = session.user;
    if (user.role === 'admin') {
      redirect(`/${locale}/admin`);
    } else if (user.role === 'owner') {
      redirect(`/${locale}/owner`);
    } else {
      redirect(`/${locale}`);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
