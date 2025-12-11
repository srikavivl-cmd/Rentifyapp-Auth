'use client';

import { useTranslations } from 'next-intl';
import { verifyPropertyAction, deletePropertyAction, updateUserAction, deleteUserAction } from '@/app/actions';
import { useRouter } from 'next/navigation';

export function VerifyButton({ propertyId }) {
  const t = useTranslations();
  const router = useRouter();

  const handleVerify = async () => {
    await verifyPropertyAction(propertyId);
    router.refresh();
  };

  return (
    <button onClick={handleVerify} className="text-green-600 hover:underline text-sm">
      {t('admin.verify')}
    </button>
  );
}

export function RejectButton({ propertyId }) {
  const t = useTranslations();
  const router = useRouter();

  const handleReject = async () => {
    await deletePropertyAction(propertyId);
    router.refresh();
  };

  return (
    <button onClick={handleReject} className="text-red-600 hover:underline text-sm">
      {t('admin.reject')}
    </button>
  );
}

export function DeletePropertyButton({ propertyId }) {
  const t = useTranslations();
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this property?')) {
      await deletePropertyAction(propertyId);
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline text-sm">
      {t('admin.delete')}
    </button>
  );
}

export function DeleteUserButton({ userId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUserAction(userId);
      router.refresh();
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline text-sm">
      Delete
    </button>
  );
}

export function EditUserButton({ user, onEdit }) {
  return (
    <button onClick={() => onEdit(user)} className="text-blue-600 hover:underline text-sm">
      Edit
    </button>
  );
}
