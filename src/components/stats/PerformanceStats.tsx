import { getHistoricalStats } from "@/utils/stats/profile";
import { Table, Tabs, Tooltip } from "@mantine/core";
import { DestinyHistoricalStatsAccountResult } from "bungie-api-ts/destiny2";
import React from "react";
import _ from "underscore";
import DataTreeView from "../DataTreeView";

interface PerformanceStatsProps {
  historicalStats: DestinyHistoricalStatsAccountResult;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  historicalStats,
}) => {
  const stats = getHistoricalStats(historicalStats);

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
              {_.map(stats.weapons, (weapon, idx) => {
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
      <DataTreeView
        data={
          historicalStats &&
          historicalStats.mergedAllCharacters.results["allPvP"]?.allTime
        }
        expand={false}
      />
      <DataTreeView data={stats} expand={false} />
    </>
  );
};

export default PerformanceStats;
