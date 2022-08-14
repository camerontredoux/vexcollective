// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { destinyRouter } from "./destiny";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("destiny.", destinyRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
