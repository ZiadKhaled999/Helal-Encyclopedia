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

export interface Bookmark {
  id: string;
  surahId: number;
  ayahId: number;
  timestamp: number;
}

interface QuranState {
  lastRead: {
    surahId: number;
    ayahId: number;
    timestamp: number;
  } | null;
  bookmarks: Bookmark[];
  addBookmark: (surahId: number, ayahId: number) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surahId: number, ayahId: number) => boolean;
  setLastRead: (surahId: number, ayahId: number) => void;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      lastRead: null,
      bookmarks: [],
      addBookmark: (surahId, ayahId) => {
        const id = `bookmark-${Date.now()}`;
        set((state) => ({
          bookmarks: [...state.bookmarks, { id, surahId, ayahId, timestamp: Date.now() }],
        }));
      },
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },
      isBookmarked: (surahId, ayahId) => {
        return get().bookmarks.some(
          (b) => b.surahId === surahId && b.ayahId === ayahId
        );
      },
      setLastRead: (surahId, ayahId) => {
        set({
          lastRead: { surahId, ayahId, timestamp: Date.now() },
        });
      },
    }),
    {
      name: 'quran-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);