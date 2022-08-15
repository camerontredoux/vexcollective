import Bungie from "@/utils/bungie";
import z from "zod";
import { createRouter } from "./context";

const BungieAPI = new Bungie(process.env.X_API_KEY!);

export const destinyRouter = createRouter()
  .mutation("manifest", {
    async resolve() {
      const data = await BungieAPI.fetchAPI("Destiny2/Manifest/");
      const manifest = await data.json();

      return {
        manifest,
      };
    },
  })
  .mutation("entityDefinition", {
    input: z.object({
      entityType: z.string(),
      hashIdentifier: z.number(),
    }),
    async resolve({ input }) {
      const data = await BungieAPI.fetchAPI(
        `Destiny2/Manifest/${input.entityType}/${input.hashIdentifier}/`
      );
      const json = await data.json();

      return {
        json,
      };
    },
  });
