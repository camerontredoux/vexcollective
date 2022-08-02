import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <body className="scroll-smooth selection:bg-sky-50 selection:text-blue-400 mx-auto max-w-6xl font-inter bg-zinc-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
