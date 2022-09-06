import create from "zustand";
import { ManifestDefinitions } from "./indexeddb";

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
  manifest: ManifestDefinitions | null;
  setManifest: (manifest: ManifestDefinitions) => void;
}

export const useManifestStore = create<ManifestState>()((set) => ({
  manifest: null,
  setManifest: (manifest) => set((state) => ({ ...state, manifest })),
}));

interface CharacterStore {
  characterId: string | null;
  destinyMembershipId: string | null;
  membershipType: string | null;
  setCharacterId: (characterId: string) => void;
  setDestinyMembershipId: (destinyMembershipId: string) => void;
  setMembershipType: (membershipType: string) => void;
}

export const useCharacterStore = create<CharacterStore>()((set) => ({
  characterId: null,
  destinyMembershipId: null,
  membershipType: null,
  setCharacterId: (characterId) => set((state) => ({ ...state, characterId })),
  setDestinyMembershipId: (destinyMembershipId) =>
    set((state) => ({ ...state, destinyMembershipId })),
  setMembershipType: (membershipType) =>
    set((state) => ({ ...state, membershipType })),
}));
