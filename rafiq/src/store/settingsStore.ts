import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

type Language = 'ar' | 'en';

interface SettingsState {
  language: Language;
  cityOverride: string | null;
  prayerCalculationMethod: number;
  notificationsEnabled: boolean;
  setTheme: (language: Language) => void;
  setCityOverride: (city: string | null) => void;
  setPrayerCalculationMethod: (method: number) => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'ar',
      cityOverride: null,
      prayerCalculationMethod: 2,
      notificationsEnabled: true,
      setTheme: (language) => set({ language }),
      setCityOverride: (cityOverride) => set({ cityOverride }),
      setPrayerCalculationMethod: (method) => set({ prayerCalculationMethod: method }),
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);