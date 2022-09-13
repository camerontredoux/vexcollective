import Bungie from "@/utils/bungie";
import { TRPCError } from "@trpc/server";
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
    async resolve({ ctx, input: { membershipType, membershipId } }) {
      if (!ctx.accessToken) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${membershipType}/Profile/${membershipId}?components=900,1100,104,201,102`,
        false,
        undefined,
        ctx.accessToken
      );

      const json = await data.json();

      console.log(json);

      return {
        json,
      };
    },
  })
  .query("account-stats", {
    input: z.object({
      membershipType: z.string(),
      destinyMembershipId: z.string(),
    }),
    async resolve({ input: { destinyMembershipId, membershipType } }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Stats?components=General,Weapons,Medals`,
        false
      );

      const json = await data.json();

      return {
        json,
      };
    },
  })
  .query("character-stats-all", {
    input: z.object({
      membershipType: z.string(),
      destinyMembershipId: z.string(),
      characterId: z.string(),
    }),
    async resolve({
      input: { characterId, destinyMembershipId, membershipType },
    }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/?modes=AllPvE,AllPvP&groups=General,Weapons,Medals`,
        false
      );

      const json = await data.json();

      return json;
    },
  })
  .query("pvp-activity-history", {
    input: z.object({
      membershipType: z.string(),
      destinyMembershipId: z.string(),
      characterId: z.string(),
    }),
    async resolve({
      input: { characterId, destinyMembershipId, membershipType },
    }) {
      const data = await BungieAPI.fetchAPI(
        `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/?mode=5&count=250`,
        false
      );

      const json = await data.json();

      return json.Response.activities;
    },
  })
  .mutation("get-oauth", {
    input: z.object({
      authCode: z.string(),
    }),
    async resolve({ input: { authCode } }) {
      const res = await fetch(
        `https://www.bungie.net/Platform/App/OAuth/Token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `client_id=40971&grant_type=authorization_code&code=${authCode}`,
        }
      );

      console.log(await res.json());
    },
  })
  .mutation("get-current-user", {
    input: z.object({}),
    async resolve({ input }) {
      // const;
    },
  });
