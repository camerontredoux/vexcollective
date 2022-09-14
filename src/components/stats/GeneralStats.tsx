import { CustomHistoricalStats } from "@/utils/stats/profile";
import { Space } from "@mantine/core";
import React from "react";

interface GeneralStatsProps {
  stats: CustomHistoricalStats | null;
}

interface StatCardProps {
  stats: CustomHistoricalStats | null;
  title: string;
  idx: string;
  display?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ idx, title, stats, display }) => {
  return (
    <div className="flex-col stat-card whitespace-nowrap flex-nowrap">
      <div className="font-bold">
        {display
          ? stats?.historicalStats?.[idx]?.basic.displayValue
          : stats?.historicalStats?.[idx]?.basic.value.toLocaleString("en", {
              maximumFractionDigits: 2,
            })}
      </div>
      <div className="text-xs text-slate-400 overflow-ellipsis overflow-hidden">
        <span title={title}>{title}</span>
      </div>
    </div>
  );
};

const GeneralStats: React.FC<GeneralStatsProps> = ({ stats }) => {
  if (!stats?.historicalStats) {
    return <div className="sm:text-sm mt-2 p-1">No stats available.</div>;
  }

  return (
    <>
      <div className="text-sm mt-2">
        <div className="font-bold p-1">General</div>
        <div className="stat-grid">
          <StatCard
            display={true}
            stats={stats}
            idx={"secondsPlayed"}
            title="Time Played"
          />
          <StatCard
            stats={stats}
            idx={"activitiesEntered"}
            title="Activities Entered"
          />
          {stats.historicalStats?.["activitiesCleared"] && (
            <StatCard
              stats={stats}
              idx={"activitiesCleared"}
              title="Activities Cleared"
            />
          )}
          {stats.historicalStats?.["activitiesWon"] && (
            <StatCard
              stats={stats}
              idx={"activitiesWon"}
              title="Activities Won"
            />
          )}
        </div>
        <Space h={10} />
        <div className="font-bold p-1">Combat</div>
        <div className="stat-grid">
          <StatCard stats={stats} idx={"efficiency"} title="Efficiency" />
          <StatCard stats={stats} idx={"killsDeathsRatio"} title="KDR" />
          <StatCard stats={stats} idx={"killsDeathsAssists"} title="KDA" />
          <StatCard stats={stats} idx={"kills"} title="Kills" />
          <StatCard stats={stats} idx={"deaths"} title="Deaths" />
          <StatCard stats={stats} idx={"assists"} title="Assists" />
          <StatCard
            stats={stats}
            idx={"precisionKills"}
            title="Precision Kills"
          />
          <StatCard stats={stats} idx={"suicides"} title="Suicides" />
          <StatCard stats={stats} idx={"score"} title="Score" />
          <StatCard
            stats={stats}
            idx={"bestSingleGameKills"}
            title="Best Single Game Kills"
          />
          <StatCard
            stats={stats}
            idx={"longestKillSpree"}
            title="Longest Kill Spree"
          />
        </div>
        <Space h={10} />
        <div className="font-bold p-1">Playstyle</div>
        <div className="stat-grid">
          <StatCard
            stats={stats}
            idx={"longestKillDistance"}
            title="Longest Kill"
          />
          <StatCard
            stats={stats}
            idx={"totalKillDistance"}
            title="Kill Distance"
          />
          <StatCard
            stats={stats}
            idx={"averageKillDistance"}
            title="Avg. Kill Distance"
          />
          <StatCard
            stats={stats}
            idx={"objectivesCompleted"}
            title="Objectives"
          />
          <StatCard
            stats={stats}
            idx={"resurrectionsReceived"}
            title="Revives Given"
          />
          <StatCard
            stats={stats}
            idx={"resurrectionsPerformed"}
            title="Revives Received"
          />
          <StatCard
            display={true}
            stats={stats}
            idx={"averageLifespan"}
            title="Avg. Lifespan"
          />
        </div>
      </div>
      {/* <DataTreeView data={stats} expand={false} /> */}
    </>
  );
};

export default GeneralStats;
