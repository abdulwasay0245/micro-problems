'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

const statusOptions = ['pending', 'in_progress', 'resolved'];

export default function AdminPage() {
 
  const router = useRouter();
  const [issues, setIssues] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/issue').then(r => r.json()).then(setIssues);
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/issues/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    await fetch(`/api/admin/issues/${id}`, { method: 'DELETE' });
    setIssues(prev => prev.filter(i => i.id !== id));
  };

  const filtered = filter ? issues.filter(i => i.status === filter) : issues;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-900">🛠️ Admin Panel</h1>
          <span className="text-sm text-gray-500">Total: {issues.length} issues</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pending', value: issues.filter(i => i.status === 'pending').length, color: 'bg-red-100 text-red-700' },
            { label: 'In Progress', value: issues.filter(i => i.status === 'in_progress').length, color: 'bg-yellow-100 text-yellow-700' },
            { label: 'Resolved', value: issues.filter(i => i.status === 'resolved').length, color: 'bg-green-100 text-green-700' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.color} rounded-2xl p-6 text-center`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-6">
          {['', 'pending', 'in_progress', 'resolved'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${filter === s ? 'bg-green-900 text-white' : 'bg-white text-gray-600 hover:bg-green-50'}`}
            >
              {s === '' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Issue</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(issue => (
                <tr key={issue.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-green-900 text-sm">{issue.title}</p>
                    <p className="text-xs text-gray-400 mt-1">by {issue.user?.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{issue.category}</td>
                  <td className="px-6 py-4">
                    <select
                      value={issue.status}
                      onChange={e => handleStatusChange(issue.id, e.target.value)}
                      className="text-xs px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-green-900"
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => router.push(`/issues/${issue.id}`)}
                      className="text-xs px-3 py-1 bg-green-50 text-green-900 rounded-lg hover:bg-green-100 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}