/* eslint-disable @next/next/no-img-element */

import { ManifestDefinitions } from "@/utils/indexeddb";
import {
  Avatar,
  BackgroundImage,
  Group,
  HoverCard,
  Stack,
  Text,
} from "@mantine/core";
import { GiDiamonds } from "@react-icons/all-files/gi/GiDiamonds";
import { Duration } from "luxon";

const Character: React.FC<{ char: any; manifest: ManifestDefinitions }> = ({
  char,
  manifest,
}) => {
  return (
    <div key={char.characterId}>
      <HoverCard width={400} withArrow openDelay={100} closeDelay={100}>
        <HoverCard.Target>
          <Avatar
            className="cursor-pointer"
            size={"lg"}
            src={`https://bungie.net${char.emblemPath}`}
          />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <BackgroundImage
              radius={"sm"}
              p={21}
              src={`https://bungie.net${char.emblemBackgroundPath}`}
            >
              <Stack ml={50} spacing={5}>
                <Text
                  color={"white"}
                  size="sm"
                  weight={700}
                  sx={{ lineHeight: 1 }}
                >
                  <div className="flex">
                    {
                      manifest.DestinyClassDefinition[char.classHash]
                        ?.displayProperties.name
                    }
                    <span className="flex ml-2 text-orange-300 drop-shadow-md">
                      <GiDiamonds /> {char.light}
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
                    ? manifest.DestinyRaceDefinition[char.raceHash]
                        ?.genderedRaceNamesByGenderHash[char.genderHash]
                    : "Unknown"}
                </Text>
              </Stack>
            </BackgroundImage>
          </Group>

          <Text size="sm" mt="md" weight={600}>
            <div className="flex gap-2">
              {Object.keys(char.stats).map((key, index) => {
                if (Number(key) !== 1935470627) {
                  return (
                    <HoverCard
                      key={index}
                      width={200}
                      withArrow
                      closeDelay={50}
                      openDelay={250}
                    >
                      <HoverCard.Target>
                        <div className="flex gap-1 items-center cursor-pointer">
                          <img
                            width={25}
                            alt="test"
                            src={`https://bungie.net${
                              manifest.DestinyStatDefinition[Number(key)]
                                ?.displayProperties.icon
                            }`}
                          />{" "}
                          {char.stats[key]}
                        </div>
                      </HoverCard.Target>
                      <HoverCard.Dropdown>
                        <Group>
                          <Text weight={700}>
                            {
                              manifest.DestinyStatDefinition[Number(key)]
                                ?.displayProperties.name
                            }
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
              })}
            </div>
          </Text>

          <Group mt="md" spacing="xl">
            {char.titleRecordHash && (
              <Text size="sm">
                <HoverCard width={200} withArrow closeDelay={50} openDelay={0}>
                  <HoverCard.Target>
                    <div className="flex gap-1 items-center">
                      <img
                        width={25}
                        alt="test"
                        src={`https://bungie.net${
                          manifest.DestinyRecordDefinition[char.titleRecordHash]
                            ?.displayProperties.icon
                        }`}
                      />
                      <b className="ml-1">
                        {
                          manifest.DestinyRecordDefinition[char.titleRecordHash]
                            ?.displayProperties.name
                        }
                      </b>
                    </div>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text weight={400}>
                      {
                        manifest.DestinyRecordDefinition[char.titleRecordHash]
                          ?.displayProperties.description
                      }
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Text>
            )}
            <Text size="sm">
              <b>
                {Duration.fromObject({ minutes: char.minutesPlayedTotal })
                  .shiftTo("hour", "minutes")
                  .toHuman()}
              </b>
            </Text>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default Character;
