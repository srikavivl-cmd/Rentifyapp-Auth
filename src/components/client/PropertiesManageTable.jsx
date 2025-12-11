'use client';

import { DeletePropertyButton } from './AdminActions';

export default function PropertiesManageTable({ properties }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id}>
              <td className="px-6 py-4">{p.title}</td>
              <td className="px-6 py-4">{p.city}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    p.verified
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {p.verified ? 'Verified' : 'Pending'}
                </span>
              </td>
              <td className="px-6 py-4">
                <DeletePropertyButton propertyId={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
