import { create } from "zustand";
interface GlobalState {
  searchQuery: string;
  page: number;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
}
export const useGlobalState = create<GlobalState>((set) => ({
  searchQuery: "",
  page: 1,
  setSearchQuery: (query) =>
    set({
      searchQuery: query,
      page: 1,
    }),
  setPage: (page) => set({ page }),
}));






