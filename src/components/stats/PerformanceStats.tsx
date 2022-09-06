import { getHistoricalStats } from "@/utils/stats/profile";
import { Table, Tabs } from "@mantine/core";
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
      <Tabs defaultValue={"overall"}>
        <Tabs.List>
          <Tabs.Tab value="overall">Overall</Tabs.Tab>
          <Tabs.Tab value="weapons">Weapon Kills</Tabs.Tab>
          <Tabs.Tab value="misc">Misc</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overall">Overall Stats</Tabs.Panel>
        <Tabs.Panel value="weapons">
          <Table highlightOnHover className="table-fixed">
            <col width="25%" />
            <col width="60%" />
            <col width="20%" />
            <thead>
              <tr>
                <th>Type</th>
                <th></th>
                <th>Kills</th>
              </tr>
            </thead>
            <tbody>
              {_.map(stats.weapons, (weapon, idx) => {
                return (
                  <tr key={idx}>
                    <td style={{ fontFamily: "Destiny Keys" }}>
                      {weapon.icon}
                    </td>
                    <td>{weapon.weaponName}</td>
                    <td>{weapon.basic.value}</td>
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
