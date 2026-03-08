'use client';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon bug in Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
});

// Click handler inside map
function LocationPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ onSelect }: { onSelect: (location: any) => void }) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`,
      {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'MicroProblemsPK/1.0'
      }
    }
    );
    const data = await res.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      const location = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        address: display_name,
      };
      setMarker({ lat: parseFloat(lat), lng: parseFloat(lon) });
      onSelect(location);
    }
  };

  const handlePick = async (lat: number, lng: number) => {
    setMarker({ lat, lng });
    // reverse geocode
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    onSelect({
      latitude: lat,
      longitude: lng,
      address: data.display_name,
    });
  };

  return (
    <div>
      {/* Search box */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search location..."
          style={{ flex: 1, padding: '8px' }}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>

      {/* Map */}
      <MapContainer
        center={marker ? [marker.lat, marker.lng] : [30.3753, 69.3451]}
        zoom={marker ? 15 : 5}
        style={{ width: '100%', height: '300px' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          
        />
        <LocationPicker onPick={handlePick} />
        {marker && (
          <Marker position={[marker.lat, marker.lng]} icon={defaultIcon} />
        )}
      </MapContainer>
      <p style={{ fontSize: '12px', color: '#888' }}>Click on the map to pin exact location</p>
    </div>
  );
}