import create from "zustand";

interface DataState {
  data: any;
  setData: (data: any) => void;
}

export const useDataStore = create<DataState>()((set) => ({
  data: {},
  setData: (data) => set((state) => (state.data = data)),
}));
