import Bungie from "@/utils/bungie";
import { ServerResponse } from "bungie-api-ts/common";
import { DestinyItemResponse } from "bungie-api-ts/destiny2";
import z from "zod";
import { createRouter } from "./context";

export const BungieAPI = new Bungie(process.env.X_API_KEY!);

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
        `/Destiny2/${membershipType}/Profile/${membershipId}?components=900,1100`,
        false
      );

      const json = await data.json();

      return {
        json,
      };
    },
  })
  .query("item", {
    input: z.object({
      destinyMembershipId: z.string(),
      itemInstanceId: z.string(),
      membershipType: z.string(),
    }),
    async resolve({ input }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${input.membershipType}/Profile/${input.destinyMembershipId}/Item/${input.itemInstanceId}?components=302,304`,
        false
      );

      const itemStats: ServerResponse<DestinyItemResponse> = await data.json();

      return { itemStats: itemStats.Response };
    },
  });
