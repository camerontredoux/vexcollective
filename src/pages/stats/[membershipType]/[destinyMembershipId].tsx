import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import { trpc } from "@/utils/trpc";
import { Button, Collapse, Loader } from "@mantine/core";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

interface ReportProps {
  profile: any;
}

const ProfileCard = dynamic(() => import("@/components/stats/ProfileCard"), {
  ssr: false,
});

const Report: NextPageWithLayout<ReportProps> = () => {
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

  const [collapsed, setCollapsed] = useState(true);

  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (membershipType && destinyMembershipId) {
        setProfile(profileQuery.data?.json);
      }
    })();
  }, [profileQuery.data?.json, membershipType, destinyMembershipId]);

  if (profileQuery.isLoading) {
    return <Loader variant="oval" />;
  } else {
    if (profile && profile.ErrorCode === 1) {
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

export default Report;
