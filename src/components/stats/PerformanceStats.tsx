import {
  CustomHistoricalStats,
  getHistoricalStats,
} from "@/utils/stats/profile";
import { useCharacterStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { Loader, Space, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import GeneralStats from "./GeneralStats";
import WeaponStatsTable from "./tables/WeaponStatsTable";

interface PerformanceStatsProps {}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({}) => {
  const { characterId, destinyMembershipId, membershipType } =
    useCharacterStore();
  const [pvpStats, setPvPStats] = useState<CustomHistoricalStats | null>(null);

  const [pveStats, setPvEStats] = useState<CustomHistoricalStats | null>(null);

  const characterStatsQuery = trpc.useQuery(
    [
      "destiny.character-stats-all",
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

  useEffect(() => {
    if (membershipType && destinyMembershipId && characterStatsQuery.data) {
      const pvpstats = getHistoricalStats(
        characterStatsQuery.data.Response?.allPvP?.allTime
      );

      const pvestats = getHistoricalStats(
        characterStatsQuery.data.Response?.allPvE?.allTime
      );

      setPvPStats(pvpstats);
      setPvEStats(pvestats);
    }
  }, [characterStatsQuery.data, membershipType, destinyMembershipId]);

  return (
    <>
      <Tabs defaultValue={"pvp"}>
        <Tabs.List>
          <Tabs.Tab value="pvp">PvP</Tabs.Tab>
          <Tabs.Tab value="pve">PvE</Tabs.Tab>
        </Tabs.List>
        <Space mt={10} />
        <Tabs.Panel value="pvp">
          <InnerPanel
            isLoading={characterStatsQuery.isLoading}
            stats={pvpStats}
          />
        </Tabs.Panel>
        <Tabs.Panel value="pve">
          <InnerPanel
            isLoading={characterStatsQuery.isLoading}
            stats={pveStats}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

const InnerPanel = ({
  isLoading,
  stats,
}: {
  isLoading: boolean;
  stats: any;
}) => {
  return (
    <Tabs defaultValue={"general"}>
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="weapons">Weapon Kills</Tabs.Tab>
        <Tabs.Tab value="misc">Misc</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="general">
        {isLoading ? (
          <div className="mt-4">
            <Loader mx={"auto"} />
          </div>
        ) : (
          <GeneralStats stats={stats} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="weapons" className="relative">
        {isLoading ? (
          <div className="mt-4">
            <Loader mx={"auto"} />
          </div>
        ) : (
          <WeaponStatsTable stats={stats} />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="misc">Misc</Tabs.Panel>
    </Tabs>
  );
};

export default PerformanceStats;
