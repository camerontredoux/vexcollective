import { Table, Tooltip } from "@mantine/core";
import React from "react";
import _ from "underscore";

interface WeaponStatsTableProps {
  stats: any;
}

const WeaponStatsTable: React.FC<WeaponStatsTableProps> = ({ stats }) => {
  return (
    <>
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
                position={"left"}
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
    </>
  );
};

export default WeaponStatsTable;
