import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import ProfileCard from "@/components/stats/ProfileCard";
import { BungieAPI } from "@/server/router/destiny";
import { httpClient } from "@/utils/misc";
import { Button, Collapse } from "@mantine/core";
import {
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextPageWithLayout } from "../../_app";

interface ReportProps {
  profile: any;
  manifest: any;
}

const Report: NextPageWithLayout<ReportProps> = ({ manifest, profile }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  if (profile.ErrorCode === 1) {
    return (
      <>
        <div className="relative z-10 drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
          <div className="backdrop-brightness-75 p-8 rounded-md">
            <ProfileCard
              profile={profile.Response.profile.data}
              characters={profile.Response.characters.data}
              manifest={manifest}
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

  const manifest = (await getDestinyManifest(httpClient)).Response;

  const partialManifest = await getDestinyManifestSlice(httpClient, {
    destinyManifest: manifest,
    tableNames: [
      "DestinyRaceDefinition",
      "DestinyClassDefinition",
      "DestinyStatDefinition",
      "DestinyRecordDefinition",
    ],
    language: "en",
  });

  const data = await BungieAPI.fetchAPI(
    `/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=100,104,200,202,205,305,306,900,1100`,
    false
  );

  const json = await data.json();

  return {
    props: {
      profile: json,
      manifest: partialManifest,
    },
  };
};

export default Report;
