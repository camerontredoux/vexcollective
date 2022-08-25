// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, paths, type, errors }) {
    const allPublic = paths && paths.every((path) => path.includes("destiny"));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";

    if (ctx?.res && allPublic && allOk && isQuery) {
      // cache request for 1 day + revalidate once every second
      const FIVE_MINUTES = 60 * 5;
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${FIVE_MINUTES}`,
        },
      };
    }
    return {};
  },
});
