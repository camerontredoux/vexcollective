import { getHistoricalStats } from "@/utils/stats/profile";
import { useCharacterStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { Loader, Table, Tabs, Tooltip } from "@mantine/core";
import { DestinyHistoricalStatsAccountResult } from "bungie-api-ts/destiny2";
import React, { useEffect, useState } from "react";
import _ from "underscore";
import DataTreeView from "../DataTreeView";

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

  if (characterStatsQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Tabs defaultValue={"general"}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="weapons">Weapon Kills</Tabs.Tab>
          <Tabs.Tab value="misc">Misc</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="general">Overall Stats</Tabs.Panel>
        <Tabs.Panel value="weapons">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Weapon</th>
                <th></th>
                <th>Kills</th>
                <th>
                  <Tooltip
                    withArrow
                    color={"gray"}
                    position={"right"}
                    label="Per Game Average"
                  >
                    <div>PGA</div>
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {stats &&
                _.map(stats.weapons, (weapon, idx) => {
                  return (
                    <tr key={idx}>
                      <td
                        style={{ fontFamily: "Destiny Keys" }}
                        className="text-center"
                      >
                        {weapon.icon}
                      </td>
                      <td>{weapon.weaponName}</td>
                      <td>{weapon.basic.value.toLocaleString()}</td>
                      <td>{weapon.pga.displayValue}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Tabs.Panel>
        <Tabs.Panel value="misc">Misc</Tabs.Panel>
      </Tabs>
      <DataTreeView data={historicalStats && historicalStats} expand={false} />
      <DataTreeView data={stats} expand={false} />
    </>
  );
};

export default PerformanceStats;
