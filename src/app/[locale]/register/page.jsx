import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { RegisterForm } from '@/components/forms';

export default async function RegisterPage({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(`/${locale}`);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
