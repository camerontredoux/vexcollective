// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  async function getAccessToken() {
    if (req?.headers.authorization) {
      const accessToken = req.headers.authorization.split(" ")[1];
      return accessToken;
    }
    return null;
  }

  const accessToken = await getAccessToken();

  return {
    req,
    res,
    accessToken,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
