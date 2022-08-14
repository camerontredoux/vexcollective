import create from "zustand";

interface DataState {
  data: any | null;
  setData: (data: any) => void;
}

export const useDataStore = create<DataState>()((set) => ({
  data: null,
  setData: (data) => set((state) => (state.data = data)),
}));
