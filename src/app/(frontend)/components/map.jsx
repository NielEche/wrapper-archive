'use client' // Ensure this is a Client Component

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import Image from "next/legacy/image";

// Move L (Leaflet) import inside the component
let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
}

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });


  const RichTextRenderer = ({ content, maxLength }) => {
    if (!content || !content.root || !content.root.children) return null;
  
    const renderNode = (node) => {
      if (node.type === 'text') {
        return node.text;
      }
  
      if (node.type === 'linebreak') {
        return <br />;
      }
  
      if (node.type === 'unordered-list') {
        return (
          <ul className="list-disc ml-6">
            {node.children.map((child, index) => (
              <li key={index}>{renderNode(child)}</li>
            ))}
          </ul>
        );
      }
  
      if (node.type === 'ordered-list') {
        return (
          <ol className="list-decimal ml-6">
            {node.children.map((child, index) => (
              <li key={index}>{renderNode(child)}</li>
            ))}
          </ol>
        );
      }
  
      if (node.type === 'list-item') {
        return <li>{node.children.map(renderNode)}</li>;
      }
  
      if (node.children) {
        return (
          <div>
            {node.children.map((child, index) => (
              <span key={index}>{renderNode(child)}</span>
            ))}
          </div>
        );
      }
  
      return null;
    };
  
    // Extract plain text from the content
    const plainText = content.root.children
      .flatMap((node) => node.children?.map((child) => child.text) || [])
      .join(' ');
  
    // Apply character limit if maxLength is provided
    const truncatedText =
      maxLength && plainText.length > maxLength
        ? `${plainText.slice(0, maxLength)}....`
        : plainText;
  
    return (
      <div className="rich-text space-y-4 text-base articulatcfLight">
        {truncatedText}
      </div>
    );
  };
   
export default function Map({ archives }) {
  // Create icon only on client side
  const createIcon = (url) => {
    if (!L) return null;
    return L.icon({ 
      iconUrl: url,
      iconSize: [50, 50],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: 'circular-marker border-2'
    });
  };

  return (
    <MapContainer center={[4.8156, 6.9293]} zoom={8} style={{ height: '90vh', width: '100%' }} 
    scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      {archives.map((archive) => (
        archive.locations.map((location, index) => (
          <Marker 
            key={`${archive.id}-${index}`} 
            position={[location.latitude, location.longitude]} 
            icon={createIcon(archive.coverImage.url)}
          >
            <Popup>
              <Image src={archive.coverImage.url} width={200} height={150} alt={archive.title} className='object-contain py-4 flex' />
              <h3 className='font-black py-2 text-lg'>{archive.title}</h3>
                 <div className="DMSans-Regular text-xs leading-tight text-justify">
                {archive.description ? (
                  <RichTextRenderer content={archive.description} maxLength={200} />
                ) : (
                  <p>No description available.</p>
                )}
              </div>
               <Link className="flex text-black text-base pt-2 underline" href={`/archives/${archive.slug}`} >Explore</Link>
              <p className='font-black'>{location.description}</p>
            </Popup>
          </Marker>
        ))
      ))}
    </MapContainer>
     // Add a slider to the bottom of the map saying "Zoom in the map to see more archives"
  );
}
