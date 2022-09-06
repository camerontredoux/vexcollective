import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import {
  DestinyHistoricalStatsAccountResult,
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

export const getHistoricalStats = (
  historicalStats: DestinyHistoricalStatsAccountResult
) => {
  const mergedCharactersPvP =
    historicalStats.mergedAllCharacters.results["allPvP"]?.allTime;

  const activitiesEntered = mergedCharactersPvP?.activitiesEntered;
  const activitiesWon = mergedCharactersPvP?.activitiesWon;
  const assists = mergedCharactersPvP?.assists;
  const averageDeathDistance = mergedCharactersPvP?.averageDeathDistance;
  const averageKillDistance = mergedCharactersPvP?.averageKillDistance;
  const totalDeathDistance = mergedCharactersPvP?.totalDeathDistance;
  const totalKillDistance = mergedCharactersPvP?.totalKillDistance;
  const kills = mergedCharactersPvP?.kills;
  const deaths = mergedCharactersPvP?.deaths;
  const efficiency = mergedCharactersPvP?.efficiency;
  const killsDeathRatio = mergedCharactersPvP?.killsDeathRatio;
  const killsDeathsAssists = mergedCharactersPvP?.killsDeathsAssists;
  const precisionKills = mergedCharactersPvP?.precisionKills;
  const suicides = mergedCharactersPvP?.suicides;

  const sortedWeapons = _.sortBy(
    _.filter(mergedCharactersPvP!, (statType) => {
      return statType.statId.includes("weaponKills");
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
    overall: {
      activitiesEntered,
      activitiesWon,
      assists,
      averageDeathDistance,
      averageKillDistance,
      totalDeathDistance,
      totalKillDistance,
      kills,
      deaths,
      efficiency,
      killsDeathRatio,
      killsDeathsAssists,
      precisionKills,
      suicides,
    },
    weapons: {
      ...weapons,
    },
  };
};
