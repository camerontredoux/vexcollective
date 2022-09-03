import { ManifestDefinitions } from "@/utils/indexeddb";
import {
  Badge,
  Blockquote,
  Modal,
  ScrollArea,
  Tabs,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Icon3dCubeSphere, IconBook, IconDatabase } from "@tabler/icons";
import {
  DestinyItemComponent,
  DestinyItemResponse,
  DestinyProfileResponse,
} from "bungie-api-ts/destiny2";
import { useState } from "react";
import _ from "underscore";
import DataTreeView from "../DataTreeView";

interface ItemViewProps {
  item: DestinyItemComponent;
  profile: DestinyProfileResponse;
  manifest: ManifestDefinitions | null;
  destinyMembershipId: string;
  membershipType: string;
  setCurrentItem: (item: DestinyItemResponse | null) => void;
}

const specialStats = [4284893193, 3871231066, 2715839340];

const ItemView: React.FC<ItemViewProps> = ({
  item,
  profile,
  manifest,
  destinyMembershipId,
  membershipType,
  setCurrentItem,
}) => {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  const ItemDefinition = (hash: number) =>
    manifest?.DestinyInventoryItemDefinition[hash];

  const lore =
    manifest?.DestinyLoreDefinition[ItemDefinition(item.itemHash)?.loreHash!]
      ?.displayProperties.description;

  const instancedItems = profile.itemComponents.stats.data!;

  let totalStat = 0;
  const instancedItemStats = _.map(
    instancedItems[item.itemInstanceId!]?.stats!,
    (instancedItem, idx) => {
      totalStat += instancedItem.value;

      return (
        <div key={idx}>
          <div className="flex gap-2 items-center">
            {manifest?.DestinyStatDefinition[instancedItem.statHash]
              ?.displayProperties.hasIcon && (
              <img
                width={20}
                alt={
                  manifest?.DestinyStatDefinition[instancedItem.statHash]
                    ?.displayProperties.name
                }
                src={`https://bungie.net${
                  manifest?.DestinyStatDefinition[instancedItem.statHash]
                    ?.displayProperties.icon
                }`}
              />
            )}
            {
              manifest?.DestinyStatDefinition[instancedItem.statHash]
                ?.displayProperties.name
            }
          </div>

          {specialStats.includes(instancedItem.statHash) ? (
            <div className="text-sm text-white">{instancedItem.value}</div>
          ) : (
            <div className="bg-gray-mantine-dark relative w-full h-4 rounded-sm overflow-hidden">
              {ItemDefinition(item.itemHash)?.itemType === 3 ? (
                <div
                  style={{
                    fontSize: "0.7rem",
                    width: `calc(100% - ${100 - instancedItem.value}%)`,
                  }}
                  className={`bg-neutral-900 text-white flex items-center justify-center absolute top-0 left-0 h-4`}
                >
                  {instancedItem.value > 1 && instancedItem.value}
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "0.7rem",
                    width: `calc(calc(100% - ${
                      100 - instancedItem.value
                    }%) * 2.5)`,
                  }}
                  className={`bg-neutral-900 text-white flex items-center justify-center absolute top-0 left-0 h-4`}
                >
                  {instancedItem.value > 1 && instancedItem.value}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  );

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
              {ItemDefinition(item.itemHash)?.flavorText && (
                <Blockquote>
                  {ItemDefinition(item.itemHash)?.flavorText}
                </Blockquote>
              )}
              <Tabs
                defaultValue={instancedItemStats.length > 0 ? "stats" : "json"}
              >
                <Tabs.List>
                  {instancedItemStats.length > 0 && (
                    <Tabs.Tab
                      icon={<Icon3dCubeSphere size={14} />}
                      value="stats"
                    >
                      Stats
                    </Tabs.Tab>
                  )}
                  {lore && (
                    <Tabs.Tab icon={<IconBook size={14} />} value="lore">
                      Lore
                    </Tabs.Tab>
                  )}
                  <Tabs.Tab icon={<IconDatabase size={14} />} value="json">
                    Data
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="stats">
                  <div className="p-2" style={{ whiteSpace: "pre-line" }}>
                    {item.itemInstanceId && (
                      <div className="flex flex-col gap-1">
                        {instancedItemStats}
                      </div>
                    )}
                    {ItemDefinition(item.itemHash)?.itemType === 2 && (
                      <div className="mt-2">
                        Total:{" "}
                        <span className="text-white">{totalStat}/100</span>
                      </div>
                    )}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="lore">
                  <div
                    className="p-2 text-gray-400"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {lore}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="json">
                  <DataTreeView
                    data={ItemDefinition(item.itemHash)}
                    expand={false}
                  />
                  <DataTreeView data={profile.itemComponents} expand={false} />
                </Tabs.Panel>
              </Tabs>
            </div>
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

        {profile.itemComponents.perks?.data && (
          <div className="flex gap-2 flex-wrap">
            {_.map(
              profile.itemComponents?.perks.data[item.itemInstanceId!]?.perks!,
              (perk, idx) => {
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
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemView;
