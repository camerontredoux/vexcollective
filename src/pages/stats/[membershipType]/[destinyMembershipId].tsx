import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import { BungieAPI } from "@/server/router/destiny";
import { Button, Collapse } from "@mantine/core";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { NextPageWithLayout } from "../../_app";

const ProfileCard = dynamic(() => import("@/components/stats/ProfileCard"), {
  ssr: false,
});

const Report: NextPageWithLayout = ({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter();

  // const { membershipType, destinyMembershipId } = router.query;

  // const profileQuery = trpc.useQuery(
  //   [
  //     "destiny.profile",
  //     {
  //       membershipId: destinyMembershipId as string,
  //       membershipType: membershipType as string,
  //     },
  //   ],
  //   {
  //     enabled: Boolean(membershipType && destinyMembershipId),
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //   }
  // );

  // const [profile, setProfile] = useState<any | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     if (membershipType && destinyMembershipId) {
  //       setProfile(profileQuery.data?.json);
  //     }
  //   })();
  // }, [profileQuery.data?.json, membershipType, destinyMembershipId]);

  const [collapsed, setCollapsed] = useState(true);

  // if (profileQuery.isLoading) {
  //   return <Loader variant="oval" />;
  // } else {
  //   if (profile && profile.ErrorCode === 1) {
  //     return (
  //       <>
  //         <div className="relative z-10 drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
  //           <div className="backdrop-brightness-75 p-8 rounded-md">
  //             <ProfileCard
  //               profile={profile.Response.profile.data}
  //               characters={profile.Response.characters.data}
  //             />
  //           </div>
  //         </div>
  //         <Button variant="outline" onClick={() => setCollapsed((o) => !o)}>
  //           Show JSON
  //         </Button>
  //         <Collapse in={collapsed}>
  //           <DataTreeView data={profile ? profile : null} />
  //         </Collapse>
  //       </>
  //     );
  //   }
  // }

  if (profile.ErrorCode === 1) {
    return (
      <>
        <div className="relative z-10 drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
          <div className="backdrop-brightness-75 p-8 rounded-md">
            <ProfileCard
              profile={profile.Response.profile.data}
              characters={profile.Response.characters.data}
            />
          </div>
        </div>
        <Button variant="outline" onClick={() => setCollapsed((o) => !o)}>
          Show JSON
        </Button>
        <Collapse in={collapsed}>
          <DataTreeView data={profile ? profile : null} />
        </Collapse>
      </>
    );
  }

  return (
    <div className="flex justify-center text-red-400">
      Bungie.net Server Error - Bungie Services are potentially offline, or
      account does not exist.
    </div>
  );
};

Report.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { membershipType, destinyMembershipId } = ctx.query;

  const data = await BungieAPI.fetchAPI(
    `/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=100,104,200,202,205,305,306,900,1100`,
    false
  );

  const profile = await data.json();

  return {
    props: {
      profile,
    },
  };
};

export default Report;
