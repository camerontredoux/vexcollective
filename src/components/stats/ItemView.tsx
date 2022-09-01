import { ManifestDefinitions } from "@/utils/indexeddb";
import { trpc } from "@/utils/trpc";
import {
  Badge,
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
        title={ItemDefinition(item.itemHash)?.displayProperties.name}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ScrollArea>
          <div
            style={{
              height: "calc(100vh - 175px)",
            }}
          >
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
      <div>
        <div>
          {
            manifest?.DestinyInventoryItemDefinition[item.itemHash]
              ?.displayProperties.name
          }
        </div>
        <Badge size="xs">
          {
            manifest?.DestinyInventoryItemDefinition[item.itemHash]
              ?.itemTypeDisplayName
          }
        </Badge>
        {itemStats && (
          <>
            <div className="mt-2 flex gap-2">
              {_.map(itemStats.perks.data!.perks, (perk, idx) => {
                return perk.visible ? (
                  <div
                    key={idx}
                    className={`bg-blue-400 ${"rounded-full"} p-1`}
                  >
                    <Tooltip
                      position="bottom"
                      color={theme.colors.gray[8]}
                      label={
                        manifest?.DestinySandboxPerkDefinition[perk.perkHash]
                          ?.displayProperties.name
                      }
                    >
                      <img
                        width={20}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ItemView;
