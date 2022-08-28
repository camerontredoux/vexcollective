import Bungie from "@/utils/bungie";
import z from "zod";
import { createRouter } from "./context";

export const BungieAPI = new Bungie(process.env.X_API_KEY!);

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

export const destinyRouter = createRouter()
  .mutation("get", {
    input: z.object({
      path: z.string(),
      method: z.string(),
      pcgr: z.boolean(),
      body: z.any().nullable(),
    }),
    async resolve({ input }) {
      let data;

      if (input.body) {
        data = await BungieAPI.fetchAPI(input.path, input.pcgr, input.body);
      } else {
        data = await BungieAPI.fetchAPI(input.path, input.pcgr);
      }

      const json = await data.json();

      return {
        json,
      };
    },
  })
  .mutation("search", {
    input: z.object({
      displayName: z.string(),
      displayNameCode: z.string(),
      membershipType: z.string(),
    }),
    async resolve({ input: { displayName, displayNameCode, membershipType } }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/SearchDestinyPlayerByBungieName/${membershipType}/`,
        false,
        { displayName, displayNameCode }
      );

      const json = await data.json();

      return {
        json,
      };
    },
  })
  .query("profile", {
    input: z.object({
      membershipType: z.string().nullish(),
      membershipId: z.string().nullish(),
    }),
    async resolve({ input: { membershipType, membershipId } }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${membershipType}/Profile/${membershipId}?components=100,104,200,202,205,305,306,900,1100`,
        false
      );

      const json = await data.json();

      return {
        json,
      };
    },
  })
  .query("manifest", {
    async resolve() {
      const manifest = (await getDestinyManifest(httpClient)).Response;

      const partialManifest = await getDestinyManifestSlice(httpClient, {
        destinyManifest: manifest,
        tableNames: [
          "DestinyRaceDefinition",
          "DestinyClassDefinition",
          "DestinyStatDefinition",
          "DestinyRecordDefinition",
        ],
        language: "en",
      });

      return partialManifest;
    },
  });
