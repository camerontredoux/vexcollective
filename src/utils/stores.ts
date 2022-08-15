import create from "zustand";

interface DataState {
  data: any | null;
  value: string | null;
  setData: (data: any) => void;
  setValue: (value: string | null) => void;
}

export const useDataStore = create<DataState>()((set) => ({
  data: null,
  value: null,
  setData: (data) => set((state) => ({ ...state, data })),
  setValue: (value) => set((state) => ({ ...state, value })),
}));
