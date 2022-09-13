import { MembershipTypeIcon } from "@/utils/stats/profile";
import { useCharacterStore, useManifestStore } from "@/utils/stores";
import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  HoverCard,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { GiDiamonds } from "@react-icons/all-files/gi/GiDiamonds";
import { IconDatabase } from "@tabler/icons";
import {
  DestinyCharacterComponent,
  DestinyItemResponse,
  DestinyProfileComponent,
} from "bungie-api-ts/destiny2";
import { DateTime, Duration } from "luxon";
import { useState } from "react";

import _ from "underscore";
import DataTreeView from "../DataTreeView";
import PerformanceStats from "./PerformanceStats";

interface ProfileCardProps {
  profileResponse: any;
  extraProfile: any;
  profile: DestinyProfileComponent;
  characters: { [key: string]: DestinyCharacterComponent };
  character: string;
  setCharacter: (char: string) => void;
  currentItem: DestinyItemResponse | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileResponse,
  extraProfile,
  profile,
  characters,
  character,
  setCharacter,
  currentItem,
}) => {
  const manifest = useManifestStore((state) => state.manifest);
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);

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

  const [opened, setOpened] = useState(false);

  if (manifest) {
    return (
      <>
        <Modal
          title={<div className="font-bold">Character Data</div>}
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <DataTreeView
            data={{ ...extraProfile?.Response, ...profileResponse }}
            expand={false}
          />
        </Modal>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <div className="text-xl">{profile.userInfo.displayName}</div>
            <PlatformIcon size={20} />
            <Tooltip position="bottom" label={profile.dateLastPlayed}>
              <Badge>
                <span>Last seen {lastSeen()}</span>
              </Badge>
            </Tooltip>
          </div>
          <ActionIcon variant="default" onClick={() => setOpened(true)}>
            <IconDatabase size={18} />
          </ActionIcon>
        </div>
        <div className="mt-4 flex gap-4">
          {manifest &&
            _.map(characters, (char, idx) => (
              <Avatar
                style={{
                  boxShadow: `0px 5px 0px -1px ${
                    char.characterId === character
                      ? "rgb(253, 186, 116,0.8)"
                      : "rgba(0,0,0,0)"
                  }`,
                }}
                key={idx}
                onClick={() => {
                  setCharacter(char.characterId);
                  setCharacterId(char.characterId);
                }}
                className="cursor-pointer"
                size={"lg"}
                src={`https://www.bungie.net${char.emblemPath}`}
              />
            ))}
        </div>
        {character && (
          <>
            <Group mt={"lg"}>
              <div
                className="w-full max-w-[461.58px] rounded-md"
                style={{
                  backgroundImage: `url(https://www.bungie.net${characters[character]?.emblemBackgroundPath}`,
                  backgroundSize: "cover",
                  height: "94px",
                  overflow: "hidden",
                }}
              >
                <Stack ml={100} mt={30} spacing={5}>
                  <Text
                    color={"white"}
                    size="sm"
                    weight={700}
                    sx={{ lineHeight: 1 }}
                  >
                    <div className="flex">
                      {
                        manifest.DestinyClassDefinition[
                          characters[character]?.classHash!
                        ]?.displayProperties.name
                      }
                      <span className="flex ml-2 text-orange-300 drop-shadow-md">
                        <GiDiamonds /> {characters[character]?.light}
                      </span>
                    </div>
                  </Text>
                  <Text
                    color={"white"}
                    size="xs"
                    weight={400}
                    sx={{ lineHeight: 1 }}
                  >
                    {manifest.DestinyRaceDefinition
                      ? manifest.DestinyRaceDefinition[
                          characters[character]?.raceHash!
                        ]?.genderedRaceNamesByGenderHash[
                          characters[character]?.genderHash!
                        ]
                      : "Unknown"}
                  </Text>
                </Stack>
              </div>
            </Group>

            <div className="min-h-[93.48px] flex flex-col justify-center mt-4 px-3 pb-2 pt-5 bg-gray-mantine-light rounded-md border border-gray-mantine-dark">
              <Text size="sm" weight={600}>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(characters[character]?.stats!).map(
                    (key, index) => {
                      if (Number(key) !== 1935470627) {
                        return (
                          <HoverCard
                            key={index}
                            width={200}
                            withArrow
                            closeDelay={50}
                            openDelay={200}
                          >
                            <HoverCard.Target>
                              <div className="flex gap-1 items-center cursor-pointer">
                                <img
                                  width={22}
                                  alt="test"
                                  src={`https://www.bungie.net${
                                    manifest.DestinyStatDefinition[Number(key)]
                                      ?.displayProperties.icon
                                  }`}
                                />{" "}
                                {characters[character]?.stats[Number(key)]}
                              </div>
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Group>
                                <Text weight={700}>
                                  {
                                    manifest.DestinyStatDefinition[Number(key)]
                                      ?.displayProperties.name
                                  }
                                  <span className="ml-2 text-orange-300">
                                    Tier{" "}
                                    {Math.floor(
                                      characters[character]?.stats[
                                        Number(key)
                                      ]! / 10
                                    )}
                                  </span>
                                </Text>
                                <Text weight={400}>
                                  {
                                    manifest.DestinyStatDefinition[Number(key)]
                                      ?.displayProperties.description
                                  }
                                </Text>
                              </Group>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        );
                      }
                    }
                  )}
                </div>
              </Text>

              <Group
                mt={"sm"}
                spacing={"xl"}
                className="whitespace-nowrap flex-nowrap"
              >
                {characters[character]?.titleRecordHash && (
                  <Text size="sm">
                    <HoverCard
                      width={200}
                      withArrow
                      closeDelay={50}
                      openDelay={0}
                    >
                      <HoverCard.Target>
                        <div className="flex gap-1 items-center">
                          <img
                            width={20}
                            alt="test"
                            src={`https://www.bungie.net${
                              manifest.DestinyRecordDefinition[
                                characters[character]?.titleRecordHash!
                              ]?.displayProperties.icon
                            }`}
                          />
                          <b className="ml-1">
                            {
                              manifest.DestinyRecordDefinition[
                                characters[character]?.titleRecordHash!
                              ]?.displayProperties.name
                            }
                          </b>
                        </div>
                      </HoverCard.Target>
                      <HoverCard.Dropdown>
                        <Text weight={400} className="whitespace-normal">
                          {
                            manifest.DestinyRecordDefinition[
                              characters[character]?.titleRecordHash!
                            ]?.displayProperties.description
                          }
                        </Text>
                      </HoverCard.Dropdown>
                    </HoverCard>
                  </Text>
                )}
                <Text
                  size="sm"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                >
                  <b>
                    {Duration.fromObject({
                      minutes: +characters[character]?.minutesPlayedTotal!,
                    })
                      .shiftTo("hour", "minutes")
                      .toHuman()}{" "}
                    played
                  </b>
                </Text>
              </Group>

              <div className="mt-2 flex flex-col gap-2">
                {currentItem && currentItem.stats.data
                  ? _.map(currentItem.stats.data.stats, (stat, idx) => {
                      return (
                        <div key={idx}>
                          {
                            manifest?.DestinyStatDefinition[stat.statHash]
                              ?.displayProperties.name
                          }
                          {stat.value}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col justify-center mt-4 p-3 bg-gray-mantine-light rounded-md border border-gray-mantine-dark">
          <PerformanceStats />
        </div>
      </>
    );
  }

  return null;
};

export default ProfileCard;
