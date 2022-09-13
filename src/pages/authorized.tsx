import Layout from "@/components/layouts/Layout";
import SearchLayout from "@/components/layouts/SearchLayout";
import { useAuthStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { NextPageWithLayout } from "./_app";

const Authorized: NextPageWithLayout = () => {
  const router = useRouter();

  const context = trpc.useContext();

  const { authorized, setAuthorized } = useAuthStore();

  const { code } = router.query;

  const { data, error } = useSWR(
    code ? `https://www.bungie.net/Platform/App/OAuth/Token` : null,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}&grant_type=authorization_code&code=${code}`,
      });

      return res.json();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    (async () => {
      if (data) {
        const session_state = window.sessionStorage.getItem("state");
        const { state } = router.query;

        if (state && state === session_state) {
          setAuthorized(true);
          window.localStorage.setItem("token", data.access_token);
        } else {
          context.invalidateQueries();
          setAuthorized(false);
        }
      }
    })();
  }, [data]);

  if (authorized)
    return (
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">Authorized!</div>
        <div className="font-bold text-sky-600">
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold">
        Unauthorized - Session did not match
      </div>
      <div className="font-bold text-sky-600">
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </div>
    </div>
  );
};

Authorized.getLayout = (page) => {
  return (
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  );
};

export default Authorized;
