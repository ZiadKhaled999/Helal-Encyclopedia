import { useState, useEffect } from 'react';
import { Magnetometer } from 'expo-sensors';
import { useLocation } from './useLocation';

const MECCA_LAT = 21.422487;
const MECCA_LON = 39.826206;

export function useQibla() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { location } = useLocation();

  useEffect(() => {
    if (location) {
      const qibla = calculateQiblaDirection(location.latitude, location.longitude);
      setQiblaDirection(qibla);
    }
  }, [location]);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    if (isActive) {
      subscription = Magnetometer.addListener(({ x, y }) => {
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        angle = angle < 0 ? 360 + angle : angle;
        setHeading(Math.round(angle));
      });
      Magnetometer.setUpdateInterval(100);
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isActive]);

  return {
    heading,
    qiblaDirection,
    isActive,
    start: () => setIsActive(true),
    stop: () => setIsActive(false),
  };
}

function calculateQiblaDirection(lat: number, lon: number): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const lat1 = toRad(lat);
  const lon1 = toRad(lon);
  const lat2 = toRad(MECCA_LAT);
  const lon2 = toRad(MECCA_LON);

  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const bearing = Math.atan2(y, x);

  return (toDeg(bearing) + 360) % 360;
}