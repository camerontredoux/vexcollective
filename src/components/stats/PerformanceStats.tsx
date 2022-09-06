import { getHistoricalStats } from "@/utils/stats/profile";
import { useCharacterStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { ActionIcon, Loader, Modal, Tabs } from "@mantine/core";
import { IconArrowsMaximize } from "@tabler/icons";
import { DestinyHistoricalStatsAccountResult } from "bungie-api-ts/destiny2";
import React, { useEffect, useState } from "react";
import DataTreeView from "../DataTreeView";
import WeaponStatsTable from "./tables/WeaponStatsTable";

interface PerformanceStatsProps {
  historicalStats: DestinyHistoricalStatsAccountResult;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  historicalStats,
}) => {
  const { characterId, destinyMembershipId, membershipType } =
    useCharacterStore();

  const characterStatsQuery = trpc.useQuery(
    [
      "destiny.character-stats-pvp",
      {
        characterId: characterId as string,
        destinyMembershipId: destinyMembershipId as string,
        membershipType: membershipType as string,
      },
    ],
    {
      enabled: Boolean(membershipType && destinyMembershipId),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const [stats, setCharacterStats] = useState<any | null>(null);
  useEffect(() => {
    if (membershipType && destinyMembershipId && characterStatsQuery.data) {
      const stats = getHistoricalStats(
        characterStatsQuery.data.Response?.allPvP?.allTime
      );

      setCharacterStats(stats);
    }
  }, [characterStatsQuery.data, membershipType, destinyMembershipId]);

  const [opened, setOpened] = useState(false);

  if (characterStatsQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Modal
        title={<div className="font-bold">Weapon Statistics</div>}
        size={1000}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <WeaponStatsTable stats={stats} />
      </Modal>
      <Tabs defaultValue={"general"}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="weapons">Weapon Kills</Tabs.Tab>
          <Tabs.Tab value="misc">Misc</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="general">Overall Stats</Tabs.Panel>
        <Tabs.Panel value="weapons" className="relative">
          <div className="absolute top-1 left-16">
            <ActionIcon
              className="hover:text-white"
              variant="transparent"
              onClick={() => setOpened(true)}
            >
              <IconArrowsMaximize size={16} />
            </ActionIcon>
          </div>

          <WeaponStatsTable stats={stats} />
        </Tabs.Panel>
        <Tabs.Panel value="misc">Misc</Tabs.Panel>
      </Tabs>
      <DataTreeView data={historicalStats && historicalStats} expand={false} />
      <DataTreeView data={stats} expand={false} />
    </>
  );
};

export default PerformanceStats;
