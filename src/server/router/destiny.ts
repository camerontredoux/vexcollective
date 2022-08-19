import Bungie from "@/utils/bungie";
import z from "zod";
import { createRouter } from "./context";

const BungieAPI = new Bungie(process.env.X_API_KEY!);

export const destinyRouter = createRouter().mutation("get", {
  input: z.object({
    path: z.string(),
  }),
  async resolve({ input }) {
    const data = await BungieAPI.fetchAPI(input.path);
    const json = await data.json();

    return {
      json,
    };
  },
});
