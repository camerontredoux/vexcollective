import { CustomHistoricalStats } from "@/utils/stats/profile";
import React from "react";
import DataTreeView from "../DataTreeView";

interface GeneralStatsProps {
  stats: CustomHistoricalStats | null;
}

const GeneralStats: React.FC<GeneralStatsProps> = ({ stats }) => {
  return (
    <>
      <DataTreeView data={stats} expand={false} />
    </>
  );
};

export default GeneralStats;
