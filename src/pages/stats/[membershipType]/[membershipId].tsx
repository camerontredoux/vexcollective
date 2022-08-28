import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import ProfileCard from "@/components/stats/ProfileCard";
import { stringOrNull } from "@/utils/misc";
import { trpc } from "@/utils/trpc";
import { Button, Collapse, Loader } from "@mantine/core";
import { DestinyManifestSlice } from "bungie-api-ts/destiny2/manifest";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const Report: NextPageWithLayout = () => {
  const router = useRouter();

  const membershipId = stringOrNull(router.query.membershipId)?.trim();
  const membershipType = stringOrNull(router.query.membershipType)?.trim();

  const [profile, setProfile] = useState<any | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const [manifest, setManifest] = useState<DestinyManifestSlice<
    (
      | "DestinyRaceDefinition"
      | "DestinyClassDefinition"
      | "DestinyStatDefinition"
      | "DestinyRecordDefinition"
    )[]
  > | null>(null);

  const profileQuery = trpc.useQuery(
    ["destiny.profile", { membershipId, membershipType }],
    {
      enabled: Boolean(membershipId && membershipType),
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const manifestQuery = trpc.useQuery(["destiny.manifest"], {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.json);
    }
    if (manifestQuery.data) {
      setManifest(manifestQuery.data);
    }
  }, [profileQuery.data, manifestQuery.data]);

  if (profileQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (profile && manifest) {
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
  }

  return (
    <div>Bungie.net Server Error - Bungie Services are potentially offline</div>
  );
};

Report.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};

export default Report;
