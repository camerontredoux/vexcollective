import { DestinyResponse } from "./DestinyResponse";

interface JsonWorldContentPath {
  DestinyAchievementDefinition: string;
  DestinyActivityDefinition: string;
  DestinyActivityGraphDefinition: string;
  DestinyActivityInteractableDefinition: string;
  DestinyActivityModeDefinition: string;
  DestinyActivityModifierDefinition: string;
  DestinyActivityTypeDefinition: string;
}

export interface DestinyManifest extends DestinyResponse {
  Response: {
    version: string;
    mobileAssetContentPath: string;
    mobileGearAssetDataBases: {
      version: number;
      path: string;
    }[];
    mobileWorldContentPaths: {
      en: string;
      es: string;
      fr: string;
      it: string;
      ja: string;
      pl: string;
      pt: string;
      ru: string;
      zh: string;
    };
    jsonWorldContentPaths: {
      en: JsonWorldContentPath;
      es: string;
      fr: string;
      it: string;
      ja: string;
      pl: string;
      pt: string;
      ru: string;
      zh: string;
    };
    jsonWorldComponentContentPaths: {
      en: string;
      es: string;
      fr: string;
      it: string;
      ja: string;
      pl: string;
      pt: string;
      ru: string;
      zh: string;
    };
    mobileClanBannerDatabasePath: string;
    mobileGearCDN: {
      en: string;
      es: string;
      fr: string;
      it: string;
      ja: string;
      pl: string;
      pt: string;
      ru: string;
      zh: string;
    };
    iconImagePyramidInfo: {
      name: string;
      factor: number;
    }[];
  };
}
