/* eslint-disable @next/next/no-img-element */

import { MembershipTypeIcon } from "@/utils/stats/profile";
import { useManifestStore } from "@/utils/stores";
import { Badge, Loader, Tooltip } from "@mantine/core";
import { DateTime } from "luxon";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import _ from "underscore";
import DataTreeView from "../DataTreeView";

const Character = dynamic(() => import("./Character"), {
  ssr: false,
  loading: () => <Loader variant="oval" />,
});

const ProfileCard: React.FC<{
  profile: any;
  characters: any;
}> = ({ profile, characters }) => {
  const manifest = useManifestStore((state) => state.manifest);

  useEffect(() => {
    if (manifest) {
      console.log(manifest);
    }
  }, [manifest]);

  const PlatformIcon =
    MembershipTypeIcon[
      profile.userInfo.membershipType as keyof typeof MembershipTypeIcon
    ];

  const lastSeen = () => {
    const lastSeen = DateTime.fromISO(profile.dateLastPlayed);
    const now = DateTime.now();

    const diff = now.diff(lastSeen);

    return DateTime.now().minus(diff).toRelative();
  };

  if (manifest) {
    return (
      <>
        <div className="flex items-center gap-2">
          <div className="text-xl">{profile.userInfo.displayName}</div>
          <PlatformIcon size={20} />
          <Tooltip position="bottom" label={profile.dateLastPlayed}>
            <Badge>
              <span>Last seen {lastSeen()}</span>
            </Badge>
          </Tooltip>
        </div>
        <div className="mt-4 flex gap-4">
          {manifest &&
            _.map(characters, (char, idx) => (
              <Character key={idx} char={char} manifest={manifest} />
            ))}
        </div>
        {<DataTreeView data={manifest} />}
      </>
    );
  }

  return null;
};

export default ProfileCard;
