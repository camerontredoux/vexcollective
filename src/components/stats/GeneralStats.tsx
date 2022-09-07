import { CustomHistoricalStats } from "@/utils/stats/profile";
import React from "react";

interface GeneralStatsProps {
  stats: CustomHistoricalStats | null;
}

interface StatCardProps {
  stats: CustomHistoricalStats | null;
  title: string;
  idx: string;
}

const StatCard: React.FC<StatCardProps> = ({ idx, title, stats }) => {
  return (
    <div className="flex-col stat-card">
      <div className="font-bold">
        {stats?.historicalStats[idx]?.basic.value.toLocaleString("en", {
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="text-md sm:text-xs text-slate-400">{title}</div>
    </div>
  );
};

const GeneralStats: React.FC<GeneralStatsProps> = ({ stats }) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:text-sm mt-2">
        <StatCard stats={stats} idx={"kills"} title="Kills" />
        <StatCard stats={stats} idx={"deaths"} title="Deaths" />
        <StatCard stats={stats} idx={"assists"} title="Assists" />

        <StatCard stats={stats} idx={"efficiency"} title="Efficiency" />
        <StatCard stats={stats} idx={"killsDeathsRatio"} title="KDR" />
        <StatCard stats={stats} idx={"killsDeathsAssists"} title="KDA" />
      </div>
      {/* <DataTreeView data={stats} expand={false} /> */}
    </>
  );
};

export default GeneralStats;
