import { type Component, Text, mergeClass } from "dappkit";
import type { DummyLeaderboard } from "src/routes/_merkl.opportunity.$chain.$type.$id.leaderboard";
import { LeaderboardRow } from "./LeaderboardTable";

export type CampaignTableRowProps = Component<{
  row?: DummyLeaderboard;
}>;

export default function LeaderboardTableRow({ row, className, ...props }: CampaignTableRowProps) {
  return (
    <LeaderboardRow
      {...props}
      className={mergeClass("cursor-pointer", className)}
      rankColumn={<Text>#{row?.rank}</Text>}
      addressColumn={<Text>{row?.address}</Text>}
      rewardsColumn={<Text>{row?.rewards}</Text>}
      protocolColumn={<Text>{row?.protocol}</Text>}
    />
  );
}
