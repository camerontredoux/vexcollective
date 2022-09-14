import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import {
  DestinyHistoricalStatsValue,
  DestinyInventoryItemDefinition,
  DestinyItemComponent,
} from "bungie-api-ts/destiny2";
import _ from "underscore";
import { DestinyItemType } from "../definitions";

export const MembershipTypeIcon = {
  1: FaXbox,
  2: FaPlaystation,
  3: FaSteam,
};

const defaultWeaponNames = [
  "AutoRifle",
  "BeamRifle",
  "Bow",
  "Glaive",
  "FusionRifle",
  "HandCannon",
  "TraceRifle",
  "MachineGun",
  "PulseRifle",
  "RocketLauncher",
  "ScoutRifle",
  "Shotgun",
  "Sniper",
  "Submachinegun",
  "Relic",
  "SideArm",
  "Sword",
  "Ability",
  "Grenade",
  "GrenadeLauncher",
  "Super",
  "Melee",
];

const weaponIcons = {
  Bow: "\uE099",
  "Auto Rifle": "\uE100",
  "Pulse Rifle": "\uE101",
  "Scout Rifle": "\uE102",
  "Hand Cannon": "\uE103",
  Shotgun: "\uE104",
  Sniper: "\uE105",
  "Fusion Rifle": "\uE106",
  "Submachine Gun": "\uE107",
  "Rocket Launcher": "\uE108",
  Sidearm: "\uE109",
  Melee: "\uE110",
  Grenade: "\uE111",
  Ability: "\uE112",
  "Grenade Launcher": "\uE113",
  Relic: "\uE134",
  "Trace Rifle": "\uE138",
  "Beam Rifle": "\uE138",
  Super: "\uE141",
  Sword: "\uE153",
  "Machine Gun": "\uE154",
  Glaive: "\uE156",
} as const;

type WeaponType = keyof typeof weaponIcons;
type IconType = typeof weaponIcons[WeaponType];

export const isArmor = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Armor;

export const isWeapon = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Weapon;

export const isMasterworked = (item: DestinyItemComponent | undefined) =>
  item?.state === 4 || item?.state === (4 | 1);

export type CustomHistoricalStats = {
  historicalStats: {
    [key: string]: DestinyHistoricalStatsValue;
  };
  weapons: {
    name: string | undefined;
    icon: IconType;
    stats: DestinyHistoricalStatsValue[];
  }[];
};

export const getHistoricalStats = (historicalStats: {
  [key: string]: DestinyHistoricalStatsValue;
}): CustomHistoricalStats => {
  const combinedWeaponStats = _.map(defaultWeaponNames, (name) => {
    return _.filter(historicalStats, (stat) => {
      const statIdWithoutPrefix = stat.statId.substring(
        stat.statId.lastIndexOf("Kills") + 5
      );

      return statIdWithoutPrefix === name;
    });
  });

  const sortedWeaponStats = _.sortBy(combinedWeaponStats, (weapon) => {
    return weapon[0]?.basic.value;
  }).reverse();

  const weapons = _.map(sortedWeaponStats, (weapon) => {
    // https://stackoverflow.com/a/26188945
    let name = weapon[0]?.statId
      .substring(11)
      .replace(/([A-Z][a-z])/g, " $1")
      .trim();

    if (name === "Submachinegun") {
      name = "Submachine Gun";
    } else if (name === "Side Arm") {
      name = "Sidearm";
    }

    const icon = weaponIcons[name as WeaponType];

    return {
      name,
      icon,
      stats: weapon,
    };
  });

  return {
    historicalStats,
    weapons,
  };
};
