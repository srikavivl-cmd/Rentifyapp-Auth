'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import VerificationTable from './VerificationTable';
import PropertiesManageTable from './PropertiesManageTable';
import UsersManageTable from './UsersManageTable';

export default function AdminTabs({ pendingProperties, allProperties, users }) {
  const [activeTab, setActiveTab] = useState('verification');
  const t = useTranslations();

  return (
    <div>
      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'verification'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
          >
            {t('admin.verificationQueue')}
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'properties'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
          >
            {t('admin.manageProperties')}
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500'
            }`}
          >
            {t('admin.manageUsers')}
          </button>
        </div>
      </div>

      {activeTab === 'verification' && <VerificationTable properties={pendingProperties} />}
      {activeTab === 'properties' && <PropertiesManageTable properties={allProperties} />}
      {activeTab === 'users' && <UsersManageTable users={users} />}
    </div>
  );
}
