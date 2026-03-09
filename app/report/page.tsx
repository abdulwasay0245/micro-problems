'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ImageUpload from '../../component/layout/features/imageupload';

const MapPicker = dynamic(() => import('../../component/layout/features/mappicker'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-green-50 rounded-xl flex items-center justify-center text-green-700">
      Loading map...
    </div>
  ),
});

const categories = [
  { value: 'road', label: '🛣️ Road & Infrastructure' },
  { value: 'water', label: '💧 Water & Drainage' },
  { value: 'electricity', label: '⚡ Electricity' },
  { value: 'sanitation', label: '🗑️ Sanitation & Waste' },
  { value: 'other', label: '📌 Other' },
];

export default function ReportPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', category: '', description: '',
    image: '', address: '', latitude: 0, longitude: 0,
  });

  const handleSubmit = async () => {
  console.log('Form data:', form);        // check what's in the form
  
  if (!session) return alert('Please sign in first');

  const res = await fetch('/api/issue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  console.log('Response status:', res.status);  // check response
  const data = await res.json();
  console.log('Response data:', data);           // check error message

  if (res.ok) router.push('/dashboard');
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-green-900 px-10 py-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-400 bg-green-800 px-3 py-1 rounded-full">
            Community Report
          </span>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">Report an Issue</h1>
          <p className="text-green-400 text-sm font-light">
            Help us fix small problems that make a big difference
          </p>
        </div>

        {/* Body */}
        <div className="px-10 py-8 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-green-800 mb-2">
              Issue Title
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10 transition"
              placeholder="e.g. Broken streetlight on Main Road"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-green-800 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat.value })}
                  className={`px-4 py-3 rounded-xl text-sm text-left border transition font-medium
                    ${form.category === cat.value
                      ? 'bg-green-900 text-white border-green-900'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-900 hover:bg-green-50'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-green-800 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-green-900 focus:bg-white focus:ring-2 focus:ring-green-900/10 transition resize-none"
              placeholder="Describe the issue in detail..."
              rows={4}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <hr className="border-gray-100" />

          {/* Image Upload */}
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-3">📷 Add a Photo</h2>
            <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} />
          </div>

          <hr className="border-gray-100" />

          {/* Map */}
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-3">📍 Pin the Location</h2>
            <MapPicker onSelect={(location) => setForm({ ...form, ...location })} />
            {form.address && (
              <p className="mt-3 text-xs text-green-800 bg-green-50 px-4 py-2 rounded-lg">
                📍 {form.address}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !form.title || !form.category}
            className="w-full py-4 bg-green-900 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition text-sm tracking-wide"
          >
            {submitting ? 'Submitting...' : 'Submit Issue'}
          </button>

        </div>
      </div>
    </div>
  );
}