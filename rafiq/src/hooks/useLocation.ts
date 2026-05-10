import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        
        const place = reverseGeocode[0];
        setLocation({
          latitude,
          longitude,
          city: place.city || place.region || undefined,
          country: place.country || undefined,
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, errorMsg, loading };
}