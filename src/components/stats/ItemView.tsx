import { ManifestDefinitions } from "@/utils/indexeddb";
import { trpc } from "@/utils/trpc";
import {
  Badge,
  Blockquote,
  Modal,
  ScrollArea,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  DestinyItemComponent,
  DestinyItemComponentSetOfint64,
  DestinyItemResponse,
} from "bungie-api-ts/destiny2";
import { useEffect, useState } from "react";
import _ from "underscore";
import DataTreeView from "../DataTreeView";

interface ItemViewProps {
  item: DestinyItemComponent;
  itemComponents: DestinyItemComponentSetOfint64;
  manifest: ManifestDefinitions | null;
  destinyMembershipId: string;
  membershipType: string;
  setCurrentItem: (item: DestinyItemResponse | null) => void;
}

const ItemView: React.FC<ItemViewProps> = ({
  item,
  itemComponents,
  manifest,
  destinyMembershipId,
  membershipType,
  setCurrentItem,
}) => {
  const [itemStats, setItemStats] = useState<DestinyItemResponse | null>(null);

  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  const instancedItemQuery = trpc.useQuery(
    [
      "destiny.item",
      {
        destinyMembershipId,
        itemInstanceId: item.itemInstanceId!,
        membershipType,
      },
    ],
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (instancedItemQuery.data) {
      setItemStats(instancedItemQuery.data.itemStats);
    }
  }, [instancedItemQuery.data]);

  const ItemDefinition = (hash: number) =>
    manifest?.DestinyInventoryItemDefinition[hash];

  return (
    <div className="flex items-center gap-2">
      <Modal
        size={800}
        title={
          <div className="font-bold flex items-center gap-2">
            {ItemDefinition(item.itemHash)?.displayProperties.name}
            <Badge
              color={
                ItemDefinition(
                  item.itemHash
                )?.itemTypeAndTierDisplayName.includes("Exotic")
                  ? "orange"
                  : ItemDefinition(
                      item.itemHash
                    )?.itemTypeAndTierDisplayName.includes("Legendary")
                  ? "grape"
                  : "gray"
              }
            >
              {ItemDefinition(item.itemHash)?.itemTypeAndTierDisplayName}
            </Badge>
          </div>
        }
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ScrollArea>
          <div
            className="mr-5"
            style={{
              height: "calc(100vh - 175px)",
            }}
          >
            <img
              alt={"Screenshot"}
              src={`https://bungie.net${
                ItemDefinition(item.itemHash)?.screenshot
              }`}
              className="rounded-md drop-shadow-md mx-auto"
            />
            <div className="mt-2">
              <Blockquote>
                {ItemDefinition(item.itemHash)?.flavorText}
              </Blockquote>
            </div>
            <DataTreeView data={ItemDefinition(item.itemHash)} expand={false} />
            <DataTreeView data={itemComponents} expand={false} />
          </div>
        </ScrollArea>
      </Modal>
      <img
        onClick={() => setOpened(true)}
        width={50}
        className="cursor-pointer rounded-md"
        alt={ItemDefinition(item.itemHash)?.displayProperties.name}
        src={`https://bungie.net${
          ItemDefinition(item.itemHash)?.displayProperties.icon
        }`}
      />
      <div className="flex gap-1 flex-col justify-center">
        <div>
          {
            manifest?.DestinyInventoryItemDefinition[item.itemHash]
              ?.displayProperties.name
          }
        </div>

        {itemStats?.perks.data && (
          <div className="flex gap-2 flex-wrap">
            {_.map(itemStats.perks.data.perks, (perk, idx) => {
              return perk.visible ? (
                <div
                  key={idx}
                  style={{
                    backgroundColor: theme.colors.gray![8],
                    padding: "2px",
                    borderRadius: "5px",
                  }}
                >
                  <Tooltip
                    position="bottom"
                    color={theme.colors.gray![8]}
                    label={
                      manifest?.DestinySandboxPerkDefinition[perk.perkHash]
                        ?.displayProperties.name
                    }
                  >
                    <img
                      width={18}
                      alt={
                        manifest?.DestinySandboxPerkDefinition[perk.perkHash]
                          ?.displayProperties.name
                      }
                      src={`https://bungie.net${
                        manifest?.DestinySandboxPerkDefinition[perk.perkHash]
                          ?.displayProperties.icon
                      }`}
                    />
                  </Tooltip>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemView;
