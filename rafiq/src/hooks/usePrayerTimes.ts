import { useQuery } from '@tanstack/react-query';
import { useLocation } from './useLocation';

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface HijriDate {
  day: number;
  month: { en: string; ar: string };
  year: number;
  formatted: string;
}

export interface PrayerTimesResponse {
  timings: PrayerTimes;
  hijri: HijriDate;
  date: string;
}

export function usePrayerTimes() {
  const { location, loading: locationLoading } = useLocation();

  return useQuery<PrayerTimesResponse>({
    queryKey: ['prayer-times', location?.latitude, location?.longitude],
    queryFn: async () => {
      if (!location) throw new Error('No location available');
      
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      
      const response = await fetch(
        `https://api.aladhan.com/v1/calendar?latitude=${location.latitude}&longitude=${location.longitude}&method=2&month=${mm}&year=${yyyy}`
      );
      
      const data = await response.json();
      const todayData = data.data[today.getDate() - 1];
      
      return {
        timings: todayData.timings,
        hijri: todayData.date.hijri,
        date: todayData.date.gregorian.date,
      };
    },
    enabled: !!location && !locationLoading,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function getNextPrayer(timings: PrayerTimes): { name: string; time: string; countdown: string } | null {
  const prayers = [
    { name: 'Fajr', key: 'Fajr' },
    { name: 'Sunrise', key: 'Sunrise' },
    { name: 'Dhuhr', key: 'Dhuhr' },
    { name: 'Asr', key: 'Asr' },
    { name: 'Maghrib', key: 'Maghrib' },
    { name: 'Isha', key: 'Isha' },
  ];

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  for (const prayer of prayers) {
    const prayerTime = new Date(`${today}T${timings[prayer.key as keyof PrayerTimes]}`);
    if (prayerTime > now) {
      const diff = prayerTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return {
        name: prayer.name,
        time: timings[prayer.key as keyof PrayerTimes],
        countdown: `${hours}:${String(minutes).padStart(2, '0')}`,
      };
    }
  }

  // If no more prayers today, return Fajr tomorrow
  return { name: 'Fajr', time: timings.Fajr, countdown: 'غداً' };
}