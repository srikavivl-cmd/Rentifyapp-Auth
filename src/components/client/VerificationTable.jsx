'use client';

import { VerifyButton, RejectButton } from './AdminActions';

export default function VerificationTable({ properties }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id}>
              <td className="px-6 py-4">{p.title}</td>
              <td className="px-6 py-4">{p.city}</td>
              <td className="px-6 py-4">{p.type}</td>
              <td className="px-6 py-4">${p.price}/mo</td>
              <td className="px-6 py-4 space-x-2">
                <VerifyButton propertyId={p.id} />
                <RejectButton propertyId={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
