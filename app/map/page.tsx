'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../../component/layout/mapview'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center text-green-700">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/issue').then(r => r.json()).then(setIssues);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-green-900 px-6 py-4">
        <h1 className="text-white font-bold text-xl">🗺️ Issues Map</h1>
        <p className="text-green-400 text-sm">Click a marker to view issue details</p>
      </div>
      <div className="flex-1">
        <MapView issues={issues} />
      </div>
    </div>
  );
}