import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import { DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import { DestinyItemType } from "../definitions";

export const MembershipTypeIcon = {
  1: FaXbox,
  2: FaPlaystation,
  3: FaSteam,
};

export const isArmor = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Armor;

export const isWeapon = (item: DestinyInventoryItemDefinition | undefined) =>
  item?.itemType === DestinyItemType.Weapon;
