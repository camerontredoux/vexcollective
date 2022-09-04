import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import {
  DestinyInventoryItemDefinition,
  DestinyItemType,
} from "bungie-api-ts/destiny2";

export const MembershipTypeIcon = {
  1: FaXbox,
  2: FaPlaystation,
  3: FaSteam,
};

export const isArmor = (item: DestinyInventoryItemDefinition) =>
  item.itemType === DestinyItemType.Armor;

export const isWeapon = (item: DestinyInventoryItemDefinition) =>
  item.itemType === DestinyItemType.Weapon;
