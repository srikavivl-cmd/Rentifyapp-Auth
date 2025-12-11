'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserAction, deleteUserAction } from '@/app/actions';

export default function UsersManageTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'tenant' });
  const router = useRouter();

  const startEditing = (u) => {
    setEditingUser(u.id);
    setEditForm({ name: u.name, email: u.email, role: u.role });
  };

  const stopEditing = () => {
    setEditingUser(null);
  };

  const handleUpdateUser = async (id) => {
    const updated = await updateUserAction(id, editForm);
    if (updated) {
      setUsers(users.map((u) => (u.id === id ? updated : u)));
    }
    stopEditing();
    router.refresh();
  };

  const handleDeleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUserAction(id);
      setUsers(users.filter((u) => u.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-6 py-4">
                {editingUser === u.id ? (
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  u.name
                )}
              </td>
              <td className="px-6 py-4">
                {editingUser === u.id ? (
                  <input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  u.email
                )}
              </td>
              <td className="px-6 py-4">
                {editingUser === u.id ? (
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="tenant">Tenant</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      u.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : u.role === 'owner'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {u.role}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 space-x-3">
                {editingUser === u.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateUser(u.id)}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={stopEditing}
                      className="text-gray-600 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  u.role !== 'admin' && (
                    <>
                      <button
                        onClick={() => startEditing(u)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
