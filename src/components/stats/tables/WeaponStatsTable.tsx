import { ScrollArea, Table, Tooltip } from "@mantine/core";
import { DestinyHistoricalStatsValue } from "bungie-api-ts/destiny2";
import React from "react";
import _ from "underscore";

interface WeaponStatsTableProps {
  stats: {
    historicalStats: {
      [key: string]: DestinyHistoricalStatsValue;
    };
    weapons: {
      name: string;
      icon: string;
      weapon: DestinyHistoricalStatsValue[];
    }[];
  };
}

const WeaponStatsTable: React.FC<WeaponStatsTableProps> = ({ stats }) => {
  return (
    <>
      <ScrollArea>
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
                  position={"bottom"}
                  label="Per Game Average"
                >
                  <div>PGA</div>
                </Tooltip>
              </th>
              <th>Precision</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {stats && stats.historicalStats ? (
              _.map(stats.weapons, (weapon, idx) => {
                return (
                  <tr key={idx}>
                    <td
                      style={{ fontFamily: "Destiny Keys" }}
                      className="text-center"
                    >
                      {weapon.icon}
                    </td>
                    <td>{weapon.name}</td>
                    <td>{weapon.weapon[0]?.basic.value.toLocaleString()}</td>
                    <td>{weapon.weapon[0]?.pga.value.toFixed(2)}</td>
                    <td>{weapon.weapon[1]?.basic.value.toLocaleString()}</td>
                    <td>
                      {weapon.weapon[2]?.basic.value.toLocaleString("en", {
                        style: "percent",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default WeaponStatsTable;
