import Bungie from "@/utils/bungie";
import { createRouter } from "./context";

const BungieAPI = new Bungie(process.env.X_API_KEY!);

export const destinyRouter = createRouter().mutation("manifest", {
  async resolve() {
    const manifest = await BungieAPI.getDestinyManifest();

    return {
      manifest,
    };
  },
});
