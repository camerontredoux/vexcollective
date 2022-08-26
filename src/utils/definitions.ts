import {
  getDestinyManifest,
  getDestinyManifestSlice,
  HttpClientConfig,
} from "bungie-api-ts/destiny2";

const httpClient = async (config: HttpClientConfig) => {
  return fetch(config.url, config)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const partialManifest = async () => {
  const manifest = (await getDestinyManifest(httpClient)).Response;

  const partialManifest = await getDestinyManifestSlice(httpClient, {
    destinyManifest: manifest,
    tableNames: [
      "DestinyRaceDefinition",
      "DestinyClassDefinition",
      "DestinyStatDefinition",
    ],
    language: "en",
  });

  return partialManifest;
};
