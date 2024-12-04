import { type Component, Hash, Text, Value, mergeClass } from "dappkit";
import { useMemo } from "react";
import type { IRewards } from "src/api/services/reward.service";
import { formatUnits, parseUnits } from "viem";
import { LeaderboardRow } from "./LeaderboardTable";

export type CampaignTableRowProps = Component<{
  row: IRewards;
  rank: number;
}>;

export default function LeaderboardTableRow({ row, rank, className, ...props }: CampaignTableRowProps) {
  const rewardAmount = useMemo(() => formatUnits(parseUnits(row?.amount, 0), row?.Token?.decimals), [row]);

  return (
    <LeaderboardRow
      {...props}
      className={mergeClass("cursor-pointer", className)}
      rankColumn={<Text>#{rank}</Text>}
      addressColumn={<Hash format="short">{row?.recipient}</Hash>}
      rewardsColumn={
        <Value className="text-right" look={rewardAmount === "0" ? "soft" : "base"} format="$0,0.#">
          {rewardAmount}
        </Value>
      }
      protocolColumn={<Text>{row?.reason.split("_")[0]}</Text>}
    />
  );
}
