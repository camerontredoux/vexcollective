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

interface ManifestState {
  manifest: any | null;
  setManifest: (manifest: any) => void;
}

export const useManifestStore = create<ManifestState>()((set) => ({
  manifest: null,
  setManifest: (manifest) => set((state) => ({ ...state, manifest })),
}));
