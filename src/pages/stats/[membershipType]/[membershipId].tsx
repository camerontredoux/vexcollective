import DataTreeView from "@/components/DataTreeView";
import ProfileCard from "@/components/stats/ProfileCard";
import { stringOrNull } from "@/utils/misc";
import { dateLastPlayed } from "@/utils/stats/profile";
import { trpc } from "@/utils/trpc";
import { Button, Collapse, Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const Report: NextPageWithLayout = () => {
  const router = useRouter();

  const membershipId = stringOrNull(router.query.membershipId)?.trim();
  const membershipType = stringOrNull(router.query.membershipType)?.trim();

  const [profile, setProfile] = useState<any | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [characters, setCharacters] = useState<string[]>([]);

  const [manifest, setManifest] = useState<any | null>(null);

  const profileQuery = trpc.useQuery(
    ["destiny.profile", { membershipId, membershipType }],
    {
      enabled: Boolean(membershipId && membershipType),
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
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
      setManifest(manifestQuery.data.json);
    }
  }, [profileQuery.data, manifestQuery.data]);

  if (profileQuery.isLoading) {
    return <Loader />;
  }

  if (profileQuery.data && profile) {
    if (profile.ErrorCode === 1) {
      return (
        <>
          <div className="mt-6 sm:mt-0 drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
            <div className="backdrop-brightness-75 p-8 rounded-md">
              <ProfileCard
                profile={profile.Response.profile.data}
                characters={profile.Response.characters.data}
                manifest={manifest.Response}
              />
              <p className="text-xl mt-1">
                Date Last Played:{" "}
                {profile.Response ? dateLastPlayed(profile.Response) : null}
              </p>
            </div>
          </div>
          <div className="drop-shadow-md bg-gray-mantine-light border rounded-md border-gray-mantine-dark">
            <div className="backdrop-brightness-75 p-8 rounded-md">
              <h1 className="text-4xl font-bold">{}</h1>
              <Button variant="outline" onClick={() => setCollapsed((o) => !o)}>
                Show JSON
              </Button>
            </div>
          </div>
          <Collapse in={collapsed}>
            <DataTreeView data={profile ? profile : null} />
          </Collapse>
        </>
      );
    }

    return <div className="flex justify-center">Error fetching account</div>;
  }

  return <div>Error</div>;
};

export default Report;
