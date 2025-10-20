import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Photo } from "../MyApp/component/interface/interface";
interface FavoritesStore {
  favorites: Photo[];
  addFavorite: (photo: Photo) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}
const favoritesState = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (photo) => {
        const current = get().favorites;
        if (!current.some((p) => p.id === photo.id)) {
          set({ favorites: [...current, photo] });
        }
      },
      removeFavorite: (id) => {
        set({
          favorites: get().favorites.filter((p) => p.id !== id),
        });
      },
      isFavorite: (id) => {
        return get().favorites.some((p) => p.id === id);
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage", 
    }
  )
);
export default favoritesState;






