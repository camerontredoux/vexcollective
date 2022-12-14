import { ManifestDefinitions } from "@/utils/indexeddb";
import { isArmor, isMasterworked, isWeapon } from "@/utils/stats/profile";
import {
  Badge,
  Blockquote,
  Group,
  HoverCard,
  Modal,
  ScrollArea,
  Tabs,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { GiDiamonds } from "@react-icons/all-files/gi/GiDiamonds";
import { Icon3dCubeSphere, IconBook, IconDatabase } from "@tabler/icons";
import {
  DestinyItemComponent,
  DestinyProfileResponse,
} from "bungie-api-ts/destiny2";
import { useState } from "react";
import _ from "underscore";
import DataTreeView from "../DataTreeView";

interface ItemViewProps {
  item: DestinyItemComponent;
  profile: DestinyProfileResponse;
  manifest: ManifestDefinitions | null;
}

const specialStats = [4284893193, 3871231066, 2715839340];

const ItemView: React.FC<ItemViewProps> = ({ item, profile, manifest }) => {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  const ItemDefinition = (hash: number) =>
    manifest?.DestinyInventoryItemDefinition[hash];

  const lore =
    manifest?.DestinyLoreDefinition[ItemDefinition(item.itemHash)?.loreHash!]
      ?.displayProperties.description;

  const instancedItems = profile.itemComponents.stats.data!;
  const instances = profile.itemComponents.instances.data!;

  let totalStat = 0;
  const instancedItemStats = _.map(
    instancedItems[item.itemInstanceId!]?.stats!,
    (instancedItem, idx) => {
      totalStat += instancedItem.value;

      return (
        <div key={idx}>
          <div className="flex gap-2 items-center mb-[2px]">
            {manifest?.DestinyStatDefinition[instancedItem.statHash]
              ?.displayProperties.hasIcon && (
              <img
                width={20}
                alt={
                  manifest?.DestinyStatDefinition[instancedItem.statHash]
                    ?.displayProperties.name
                }
                src={`https://www.bungie.net${
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
              {isWeapon(ItemDefinition(item.itemHash)) ? (
                <div
                  style={{
                    fontSize: "0.7rem",
                    width: `calc(100% - ${100 - instancedItem.value}%)`,
                  }}
                  className={`bg-gray-200 text-black font-bold flex items-center justify-center absolute top-0 left-0 h-4`}
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
                  className={`bg-gray-200 text-black font-bold flex items-center justify-center absolute top-0 left-0 h-4`}
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
        padding={"xl"}
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
            className="mr-3"
            style={{
              height: "calc(100vh - 190px)",
            }}
          >
            <div
              className={`relative ${
                isMasterworked(item) &&
                "screenshot-masterwork overflow-clip rounded-md"
              }`}
            >
              {isMasterworked(item) && (
                <div className="absolute left-1 top-1 italic text-sm p-1 text-yellow-500">
                  Masterworked
                </div>
              )}
              <img
                alt={"Screenshot"}
                src={`https://www.bungie.net${
                  ItemDefinition(item.overrideStyleItemHash ?? item.itemHash)
                    ?.screenshot
                }`}
                className={`rounded-md mx-auto ${
                  isMasterworked(item)
                    ? "shadow-inner-custom"
                    : "drop-shadow-sm"
                }`}
              />
            </div>

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
                    <div className="flex items-center gap-2 my-1">
                      {profile.itemComponents.instances.data?.[
                        item.itemInstanceId!
                      ]?.primaryStat && (
                        <Badge color={"orange"}>
                          <div className="flex items-center">
                            <span>Light Level</span>
                            <span className="ml-2 flex text-orange-300 drop-shadow-md items-center">
                              <GiDiamonds />{" "}
                              {
                                profile.itemComponents.instances.data?.[
                                  item.itemInstanceId!
                                ]?.primaryStat.value!
                              }
                            </span>
                          </div>
                        </Badge>
                      )}
                      {manifest?.DestinyInventoryItemDefinition[item.itemHash]
                        ?.damageTypeHashes && (
                        <Tooltip
                          label={`Damage Type: ${
                            manifest?.DestinyDamageTypeDefinition[
                              instances[item.itemInstanceId!]?.damageTypeHash!
                            ]?.displayProperties.name
                          } Energy`}
                        >
                          <div className="flex gap-1 items-center cursor-default">
                            <img
                              className="drop-shadow-md mr-[1px]"
                              width={15}
                              src={`https://www.bungie.net${
                                manifest?.DestinyDamageTypeDefinition[
                                  instances[item.itemInstanceId!]
                                    ?.damageTypeHash!
                                ]?.displayProperties.icon
                              }`}
                              alt={`Damage Type: ${
                                manifest?.DestinyDamageTypeDefinition[
                                  instances[item.itemInstanceId!]
                                    ?.damageTypeHash!
                                ]?.displayProperties.name
                              }`}
                            />
                            <span className="text-sm font-bold">Energy</span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                    {item.itemInstanceId && (
                      <div className="flex flex-col gap-1">
                        {instancedItemStats}
                      </div>
                    )}
                    {isArmor(ItemDefinition(item.itemHash)) && (
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
      <div
        className={`${
          isMasterworked(item)
            ? "border-2 border-orange-300"
            : "border-2 border-transparent"
        }`}
      >
        <div
          onClick={() => setOpened(true)}
          className={`${
            isMasterworked(item) && "item-masterwork"
          } drop-shadow-md relative overflow-clip cursor-pointer`}
        >
          <img
            width={50}
            className="drop-shadow-sm"
            alt={ItemDefinition(item.itemHash)?.displayProperties.name}
            src={`https://www.bungie.net${
              ItemDefinition(item.overrideStyleItemHash ?? item.itemHash)
                ?.displayProperties.icon
            }`}
          />
          {ItemDefinition(item.itemHash)?.iconWatermark && (
            <img
              width={50}
              className="shadow-inner-custom cursor-pointer absolute top-0 left-0"
              alt={ItemDefinition(item.itemHash)?.displayProperties.name}
              src={`https://www.bungie.net${
                ItemDefinition(item.itemHash)?.iconWatermark
              }`}
            />
          )}
        </div>
      </div>
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
                      borderRadius: "5px",
                    }}
                  >
                    <HoverCard
                      width={200}
                      withArrow
                      openDelay={25}
                      closeDelay={50}
                    >
                      <HoverCard.Target>
                        <img
                          className="cursor-pointer"
                          width={18}
                          alt={
                            manifest?.DestinySandboxPerkDefinition[
                              perk.perkHash
                            ]?.displayProperties.name
                          }
                          src={`https://www.bungie.net${
                            manifest?.DestinySandboxPerkDefinition[
                              perk.perkHash
                            ]?.displayProperties.icon
                          }`}
                        />
                      </HoverCard.Target>
                      <HoverCard.Dropdown>
                        <Group>
                          <Text weight={700} size={"xs"}>
                            {
                              manifest?.DestinySandboxPerkDefinition[
                                perk.perkHash
                              ]?.displayProperties.name
                            }
                          </Text>
                          <Text weight={400} size={"xs"}>
                            {
                              manifest?.DestinySandboxPerkDefinition[
                                perk.perkHash
                              ]?.displayProperties.description
                            }
                          </Text>
                        </Group>
                      </HoverCard.Dropdown>
                    </HoverCard>
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
