'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useRouter } from 'next/navigation';

const statusColors: Record<string, string> = {
  pending: 'red',
  in_progress: 'orange',
  resolved: 'green',
};

function createIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 14px; height: 14px;
      background: ${color};
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconAnchor: [7, 7],
  });
}

export default function MapView({ issues }: { issues: any[] }) {
  const router = useRouter();

  const validIssues = issues.filter(i => i.latitude && i.longitude);

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={5}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
      />

      {validIssues.map(issue => (
        <Marker
          key={issue.id}
          position={[issue.latitude, issue.longitude]}
          icon={createIcon(statusColors[issue.status] || 'gray')}
        >
          <Popup>
            <div style={{ minWidth: '180px' }}>
              {issue.image && (
                <img src={issue.image} alt={issue.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
              )}
              <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{issue.title}</p>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{issue.category}</p>
              <span style={{
                fontSize: '11px', padding: '2px 8px', borderRadius: '10px',
                background: issue.status === 'resolved' ? '#dcfce7' : issue.status === 'in_progress' ? '#fef9c3' : '#fee2e2',
                color: issue.status === 'resolved' ? '#16a34a' : issue.status === 'in_progress' ? '#ca8a04' : '#dc2626',
              }}>
                {issue.status}
              </span>
              <br /><br />
              <button
                onClick={() => router.push(`/issues/${issue.id}`)}
                style={{ width: '100%', padding: '6px', background: '#14532d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
              >
                View Details →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}