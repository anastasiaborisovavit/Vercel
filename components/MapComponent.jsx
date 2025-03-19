'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

import customMarkerIcon from '/public/1.png'; 

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

// Создаем кастомный Icon
const myIcon = L.icon({
  iconUrl: customMarkerIcon.src, 
  iconRetinaUrl: customMarkerIcon.src, 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
});

export default function MapComponent({ stores }) {
  const defaultPosition = [53.2007, 45.0046];
  const defaultZoom = 13;

  return (
    <MapContainer center={defaultPosition} zoom={defaultZoom} style={{ height: '1000px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map(store => {
        const position = [store.latitude, store.longitude];
        return (
          <Marker key={store.id} position={position} icon={myIcon}> 
            <Popup>
              <b>{store.name}</b>
              <br />
              {store.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}