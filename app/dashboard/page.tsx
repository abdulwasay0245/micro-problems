'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [filter, setFilter] = useState({ category: '', status: '' });

  useEffect(() => {
    fetch('/api/issue')
      .then(res => res.json())
      .then(setIssues);
  }, []);

  const filtered = issues.filter(issue => {
    if (filter.category && issue.category !== filter.category) return false;
    if (filter.status && issue.status !== filter.status) return false;
    return true;
  });

  const total = issues.length;
  const pending = issues.filter(i => i.status === 'pending').length;
  const resolved = issues.filter(i => i.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-green-900 mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Issues', value: total, color: 'bg-green-900' },
            { label: 'Pending', value: pending, color: 'bg-yellow-500' },
            { label: 'Resolved', value: resolved, color: 'bg-green-500' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.color} text-white rounded-2xl p-6 text-center`}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1 opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <select
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-green-900"
            value={filter.category}
            onChange={e => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="road">Road</option>
            <option value="water">Water</option>
            <option value="electricity">Electricity</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Other</option>
          </select>

          <select
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-green-900"
            value={filter.status}
            onChange={e => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">No issues found</div>
          )}
          {filtered.map(issue => (
            <div key={issue.id} className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
              {issue.image && (
                <img src={issue.image} alt={issue.title} className="w-24 h-24 object-cover rounded-xl" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-green-900 text-lg">{issue.title}</h2>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium
                    ${issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'}`}>
                    {issue.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{issue.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>📍 {issue.address || 'No location'}</span>
                  <span>👤 {issue.user?.name}</span>
                  <span>👍 {issue._count?.upvotes}</span>
                  <span>💬 {issue._count?.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}