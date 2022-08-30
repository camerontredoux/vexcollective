// src/pages/_app.tsx
import Layout from "@/components/layouts/Layout";
import { manifestDb } from "@/utils/indexeddb";
import { useManifestStore } from "@/utils/stores";
import { MantineProvider } from "@mantine/core";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";
import { AppRouter } from "src/server/router";
import superjson from "superjson";
import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const setManifest = useManifestStore((state) => state.setManifest);

  useEffect(() => {
    (async () => {
      await manifestDb.open().catch((err) => console.error(err.stack || err));

      const manifest = await manifestDb.manifest.toArray();

      if (manifest) {
        setManifest(manifest[0]?.definitions);
      }
    })();
  }, [setManifest]);

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        breakpoints: {
          xs: 640,
        },
      }}
    >
      <Head>
        <title>Vex Collective</title>
      </Head>
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </MantineProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
