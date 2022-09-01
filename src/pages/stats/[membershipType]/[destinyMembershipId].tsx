import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import ItemView from "@/components/stats/ItemView";
import { BungieAPI } from "@/server/router/destiny";
import { trpc } from "@/utils/trpc";
import { Button, Collapse } from "@mantine/core";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "underscore";
import { NextPageWithLayout } from "../../_app";

const ProfileCard = dynamic(() => import("@/components/stats/ProfileCard"), {
  ssr: false,
});

const Report: NextPageWithLayout = ({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { membershipType, destinyMembershipId } = router.query;

  const profileQuery = trpc.useQuery(
    [
      "destiny.profile",
      {
        membershipId: destinyMembershipId as string,
        membershipType: membershipType as string,
      },
    ],
    {
      enabled: Boolean(membershipType && destinyMembershipId),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const [extraProfile, setExtraProfile] = useState<any | null>(null);
  const [character, setCharacter] = useState(
    profile.Response.profile.data.characterIds[0]
  );

  useEffect(() => {
    (async () => {
      if (membershipType && destinyMembershipId) {
        // setExtraProfile(profileQuery.data?.json);
        // setExtraProfile(nu)
      }
    })();
  }, [profileQuery.data?.json, membershipType, destinyMembershipId]);

  const [collapsed, setCollapsed] = useState(true);

  if (profile.ErrorCode === 1) {
    return (
      <>
        <div className="flex flex-col lg:flex-row relative z-10 drop-shadow-md bg-gray-mantine-dark-100 border border-gray-mantine-dark rounded-md">
          <div className="lg:w-1/2 m-4">
            <ProfileCard
              profile={profile.Response.profile.data}
              characters={profile.Response.characters.data}
              character={character}
              setCharacter={setCharacter}
            />
          </div>
          <div className="lg:w-1/2 p-5 m-4 rounded-md border border-gray-mantine-dark bg-gray-mantine-light">
            <h1 className="text-lg font-medium">Equipped Gear</h1>
            <div>
              {_.map(
                profile.Response.characterEquipment.data[character].items,
                (item, idx) => {
                  return <ItemView key={idx} item={item} />;
                }
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => setCollapsed((o) => !o)}>
          Show JSON
        </Button>
        <Collapse in={collapsed}>
          <DataTreeView data={extraProfile && extraProfile} expand={false} />
          <DataTreeView data={profile} expand={false} />
        </Collapse>
      </>
    );
  }

  return (
    <div className="flex justify-center text-red-400">
      Bungie.net Server Error - Bungie Services are potentially offline, or this
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
    `/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=100,200,205`,
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
