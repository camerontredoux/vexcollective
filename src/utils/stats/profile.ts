import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import {
  DestinyHistoricalStatsValue,
  DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import _ from "underscore";
import { DestinyItemType } from "../definitions";

export const MembershipTypeIcon = {
  1: FaXbox,
  2: FaPlaystation,
  3: FaSteam,
};

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

type WeaponIcon = keyof typeof weaponIcons;

export const isArmor = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Armor;

export const isWeapon = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Weapon;

export const getHistoricalStats = (historicalStats: {
  [key: string]: DestinyHistoricalStatsValue;
}) => {
  const sortedWeapons = _.sortBy(
    _.filter(historicalStats, (statType) => {
      return (
        statType.statId.startsWith("weaponKills") &&
        !statType.statId.startsWith("weaponKillsPrecision")
      );
    }),
    (weapon) => {
      return weapon.basic.value;
    }
  ).reverse();

  const weapons = _.map(sortedWeapons, (weapon) => {
    // https://stackoverflow.com/a/26188945
    let weaponName = weapon.statId
      .substring(11)
      .replace(/([A-Z][a-z])/g, " $1")
      .trim();

    if (weaponName === "Submachinegun") {
      weaponName = "Submachine Gun";
    } else if (weaponName === "Side Arm") {
      weaponName = "Sidearm";
    }

    const icon = weaponIcons[weaponName as WeaponIcon];

    return {
      weaponName,
      basic: weapon.basic,
      pga: weapon.pga,
      icon,
    };
  });

  return {
    historicalStats,
    weapons: {
      ...weapons,
    },
  };
};
