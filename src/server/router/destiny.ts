import Bungie from "@/utils/bungie";
import z from "zod";
import { createRouter } from "./context";

const BungieAPI = new Bungie(process.env.X_API_KEY!);

export const destinyRouter = createRouter().mutation("get", {
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
});
