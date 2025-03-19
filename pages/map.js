'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <p>Загрузка карты...</p>
});

export default function MapPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/stores');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Зоомагазины на карте</h1>
      {stores.length > 0 ? (
        <MapComponent stores={stores} />
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}