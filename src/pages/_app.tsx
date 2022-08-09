// src/pages/_app.tsx
import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useState } from "react";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp2({ Component, pageProps }: AppPropsWithLayout) {
  const [opened, setOpened] = useState(false);

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

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
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}

// const getBaseUrl = () => {
//   if (typeof window !== "undefined") {
//     return "";
//   }
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };

// export default withTRPC<AppRouter>({
//   config({ ctx }) {
//     /**
//      * If you want to use SSR, you need to use the server's full URL
//      * @link https://trpc.io/docs/ssr
//      */
//     const url = `${getBaseUrl()}/api/trpc`;

//     return {
//       url,
//       transformer: superjson,
//       /**
//        * @link https://react-query.tanstack.com/reference/QueryClient
//        */
//       // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/ssr
//    */
//   ssr: false,
// })(MyApp);
