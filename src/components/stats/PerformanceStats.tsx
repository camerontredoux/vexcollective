import {
  CustomHistoricalStats,
  getHistoricalStats,
} from "@/utils/stats/profile";
import { useCharacterStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { Loader, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import DataTreeView from "../DataTreeView";
import GeneralStats from "./GeneralStats";
import WeaponStatsTable from "./tables/WeaponStatsTable";

interface PerformanceStatsProps {}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({}) => {
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
  const [stats, setCharacterStats] = useState<CustomHistoricalStats | null>(
    null
  );
  useEffect(() => {
    if (membershipType && destinyMembershipId && characterStatsQuery.data) {
      const stats = getHistoricalStats(
        characterStatsQuery.data.Response?.allPvP?.allTime
      );

      setCharacterStats(stats);
    }
  }, [characterStatsQuery.data, membershipType, destinyMembershipId]);

  return (
    <>
      <Tabs defaultValue={"general"}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="weapons">Weapon Kills</Tabs.Tab>
          <Tabs.Tab value="misc">Misc</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="general">
          <GeneralStats stats={stats} />
        </Tabs.Panel>
        <Tabs.Panel value="weapons" className="relative">
          {characterStatsQuery.isLoading ? (
            <div className="mt-4">
              <Loader mx={"auto"} />
            </div>
          ) : (
            <WeaponStatsTable stats={stats} />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="misc">Misc</Tabs.Panel>
      </Tabs>
      <DataTreeView data={stats} expand={false} />
    </>
  );
};

export default PerformanceStats;
