'use client'; // Ensure this is a Client Component

import dynamic from 'next/dynamic';
import L from 'leaflet'; // Import leaflet for creating custom marker icons
import 'leaflet/dist/leaflet.css';

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

export default function Map({ archives }) {
  return (
    <MapContainer center={[4.8156, 6.9293]} zoom={8} style={{ height: '90vh', width: '100%' }} 
    scrollWheelZoom={false}  >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      {archives.map((archive) => (
        archive.locations.map((location, index) => (
          <Marker 
            key={`${archive.id}-${index}`} 
            position={[location.latitude, location.longitude]} 
            icon={L.icon({ 
              iconUrl: archive.coverImage.url, // Use the archive's image URL as the marker icon
              iconSize: [50, 50], // Adjust size as needed
              iconAnchor: [16, 32], // Adjust to center the image properly
              popupAnchor: [0, -32], // Adjust the popup position
              className: 'circular-marker border-2'
            })}
          >
            <Popup>
              <img src={archive.coverImage.url} width={200} height={150} alt={archive.title} className='object-contain py-4 flex' />
              <h3 className='font-black'>{archive.title}</h3>
              <p className='my-0'>{archive.description}</p>
              <p  className='font-black'>{location.description}</p>
            </Popup>
          </Marker>
        ))
      ))}
    </MapContainer>
  );
}
