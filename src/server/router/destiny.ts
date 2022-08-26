import Bungie from "@/utils/bungie";
import z from "zod";
import { createRouter } from "./context";

const BungieAPI = new Bungie(process.env.X_API_KEY!);

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
        `/Destiny2/${membershipType}/Profile/${membershipId}?components=100,200`,
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
      const data = await BungieAPI.getManifest();

      const json = await data.json();

      return {
        json,
      };
    },
  });
