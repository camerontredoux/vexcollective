import DataTreeView from "@/components/DataTreeView";
import SearchLayout from "@/components/layouts/SearchLayout";
import ItemView from "@/components/stats/ItemView";
import { BungieAPI } from "@/server/router/destiny";
import { useManifestStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  Button,
  Modal,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import {
  DestinyItemComponent,
  DestinyItemResponse,
  DestinyProfileResponse,
} from "bungie-api-ts/destiny2";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "underscore";
import { NextPageWithLayout } from "../../_app";

const ProfileCard = dynamic(() => import("@/components/stats/ProfileCard"), {
  ssr: false,
});

const includedItemTypes = [16, 21, 22, 24];

interface ReportProps {
  profileResponse: DestinyProfileResponse;
  errorCode: number;
}

const Report: NextPageWithLayout<ReportProps> = ({
  profileResponse,
  errorCode,
}) => {
  const router = useRouter();

  const manifest = useManifestStore((state) => state.manifest);

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
    profileResponse.profile.data?.characterIds[0]
  );
  const [currentItem, setCurrentItem] = useState<DestinyItemResponse | null>(
    null
  );

  useEffect(() => {
    (async () => {
      if (membershipType && destinyMembershipId) {
        setExtraProfile(profileQuery.data?.json);
      }
    })();
  }, [profileQuery.data?.json, membershipType, destinyMembershipId]);

  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  if (errorCode === 1) {
    return (
      <>
        <div className="flex flex-col lg:flex-row relative z-10 drop-shadow-md bg-gray-mantine-dark-100 border border-gray-mantine-dark rounded-md">
          <div className="lg:w-1/2 m-4">
            <ProfileCard
              profile={profileResponse.profile.data}
              characters={profileResponse.characters.data}
              character={character!}
              setCharacter={setCharacter}
              currentItem={currentItem}
            />
          </div>
          <div className="lg:w-1/2 p-5 m-4 rounded-md border border-gray-mantine-dark bg-gray-mantine-light">
            <h1 className="text-lg font-medium flex items-center">
              Equipped Gear{" "}
              <span className="ml-2">
                <Tooltip
                  color={theme.colors.gray![8]}
                  label={"Click on gear to view more information"}
                  position={"bottom"}
                >
                  <ActionIcon>
                    <IconInfoCircle strokeWidth={2} size={20} />
                  </ActionIcon>
                </Tooltip>
              </span>
            </h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-gray-400">Weapons</h1>

              {_.map(
                profileResponse.characterEquipment.data?.[character!]?.items ||
                  [],
                (item: DestinyItemComponent, idx) => {
                  if (
                    (manifest?.DestinyInventoryItemDefinition[item.itemHash]
                      ?.itemType as number) === 3
                  ) {
                    return (
                      <ItemView
                        destinyMembershipId={destinyMembershipId as string}
                        membershipType={membershipType as string}
                        manifest={manifest}
                        key={idx}
                        item={item}
                        profile={profileResponse}
                        setCurrentItem={setCurrentItem}
                      />
                    );
                  }
                }
              )}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <h1 className="text-gray-400">Armor</h1>
              {_.map(
                profileResponse.characterEquipment.data?.[character!]?.items ||
                  [],
                (item: DestinyItemComponent, idx) => {
                  if (
                    (manifest?.DestinyInventoryItemDefinition[item.itemHash]
                      ?.itemType as number) === 2
                  ) {
                    return (
                      <ItemView
                        destinyMembershipId={destinyMembershipId as string}
                        membershipType={membershipType as string}
                        manifest={manifest}
                        key={idx}
                        item={item}
                        profile={profileResponse}
                        setCurrentItem={setCurrentItem}
                      />
                    );
                  }
                }
              )}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <h1 className="text-gray-400">Miscellaneous</h1>

              {_.map(
                profileResponse.characterEquipment.data?.[character!]?.items ||
                  [],
                (item: DestinyItemComponent, idx) => {
                  if (
                    includedItemTypes.includes(
                      manifest?.DestinyInventoryItemDefinition[item.itemHash]
                        ?.itemType as number
                    ) ||
                    manifest?.DestinyInventoryItemDefinition[
                      item.itemHash
                    ]?.itemTypeDisplayName.includes("Subclass")
                  ) {
                    return (
                      <ItemView
                        destinyMembershipId={destinyMembershipId as string}
                        membershipType={membershipType as string}
                        manifest={manifest}
                        key={idx}
                        item={item}
                        profile={profileResponse}
                        setCurrentItem={setCurrentItem}
                      />
                    );
                  }
                }
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpened(true)}>
          Show JSON
        </Button>
        <Modal opened={opened} onClose={() => setOpened(false)}>
          <DataTreeView data={extraProfile && extraProfile} expand={false} />
          <DataTreeView data={profileResponse} expand={false} />
        </Modal>
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
    `/Destiny2/${membershipType}/Profile/${destinyMembershipId}?components=100,102,200,201,205,300,302,304`,
    false
  );

  const json = await data.json();
  const profileResponse: DestinyProfileResponse = json.Response;

  return {
    props: {
      profileResponse: profileResponse!,
      errorCode: json.ErrorCode,
    },
  };
};

export default Report;
