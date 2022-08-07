// src/pages/_app.tsx
import {
  ColorScheme,
  ColorSchemeProvider,
  Drawer,
  MantineProvider,
} from "@mantine/core";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import type { AppType } from "next/dist/shared/lib/utils";
import { ReactElement, ReactNode, useState } from "react";
import "../styles/globals.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp2({ Component, pageProps }: AppPropsWithLayout) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [opened, setOpened] = useState(false);

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
          }}
        >
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Register"
            padding="lg"
            size="md"
            overlayOpacity={0.55}
            overlayBlur={3}
          >
            {/* Drawer content */}
          </Drawer>
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

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
