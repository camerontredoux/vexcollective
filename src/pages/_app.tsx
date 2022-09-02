// src/pages/_app.tsx
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/layouts/Layout";
import { manifestDb } from "@/utils/indexeddb";
import { useManifestStore } from "@/utils/stores";
import { Loader, MantineProvider } from "@mantine/core";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
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
  const [pageLoading, setPageLoading] = useState(false);
  const [manifestLoading, setManifestLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      manifestDb.open();

      manifestDb.transaction("r", manifestDb.manifest, () => {
        manifestDb.manifest.toArray().then((man) => {
          setManifest(man[0]?.definitions);
          setManifestLoading(false);
        });
      });
    })();

    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [setManifest, router.events]);

  if (manifestLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-lg font-bold text-gray-500">
            Loading Destiny Manifest
          </h1>
          <p className="text-gray-600">
            This could take a while the first time...
          </p>
        </div>
      </div>
    );
  }

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        breakpoints: {
          xs: 639,
        },
      }}
    >
      <Head>
        <title>Vex Collective</title>
      </Head>
      <Layout>
        {pageLoading ? (
          <div className="mt-6 sm:mt-0 flex justify-center items-center flex-col gap-3">
            <Loader variant="oval" />
            <div className="text-gray-400">
              Note - This could take a while to load from Bungie
            </div>
          </div>
        ) : (
          getLayout(
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          )
        )}
      </Layout>
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
