/* eslint-disable @next/next/no-img-element */

import { MembershipTypeIcon } from "@/utils/stats/profile";
import {
  Anchor,
  Avatar,
  BackgroundImage,
  Group,
  HoverCard,
  Stack,
  Text,
} from "@mantine/core";
import _ from "underscore";

const ProfileCard: React.FC<{
  profile: any;
  characters: any;
  manifest: any;
}> = ({ profile, characters, manifest }) => {
  const charactersData: React.ReactNode[] = _.map(characters, (char) => {
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
                    Mantine
                  </Text>
                  <Anchor
                    href="https://twitter.com/mantinedev"
                    color="dimmed"
                    size="xs"
                    sx={{ lineHeight: 1 }}
                  >
                    @mantinedev
                  </Anchor>
                </Stack>
              </BackgroundImage>
            </Group>

            <Text size="sm" mt="md">
              Customizable React components and hooks library with focus on
              usability, accessibility and developer experience
            </Text>

            <Group mt="md" spacing="xl">
              <Text size="sm">
                <b>0</b> Following
              </Text>
              <Text size="sm">
                <b>1,174</b> Followers
              </Text>
            </Group>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>
    );
  });

  const PlatformIcon =
    MembershipTypeIcon[
      profile.userInfo.membershipType as keyof typeof MembershipTypeIcon
    ];

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="text-xl">{profile.userInfo.displayName}</div>
        <PlatformIcon size={20} />
      </div>
      <div className="mt-4 flex gap-4">
        {charactersData.map((char) => char)}
      </div>
    </>
  );
};

export default ProfileCard;
