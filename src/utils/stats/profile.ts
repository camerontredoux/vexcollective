import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa";

export const dateLastPlayed = (json: any) => {
  return json["profile"]["data"]["dateLastPlayed"];
};

export const MembershipTypeIcon = {
  1: FaXbox,
  2: FaPlaystation,
  3: FaSteam,
};
