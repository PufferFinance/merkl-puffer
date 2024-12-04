import { Text } from "dappkit";
import { useMemo } from "react";
import type { IRewards } from "src/api/services/reward.service";
import OpportunityPagination from "../opportunity/OpportunityPagination";
import { LeaderboardTable } from "./LeaderboardTable";
import LeaderboardTableRow from "./LeaderboardTableRow";

export type IProps = {
  leaderboard: IRewards[];
  count?: number;
};

export default function LeaderboardLibrary(props: IProps) {
  const { leaderboard, count } = props;

  const rows = useMemo(() => {
    return leaderboard?.map((row, index) => <LeaderboardTableRow key={row.recipient} row={row} rank={index} />);
  }, [leaderboard]);

  return (
    <LeaderboardTable
      header={<Text className="w-full">Leaderboard</Text>}
      footer={count !== undefined && <OpportunityPagination count={count} />}>
      {!!rows.length ? rows : <Text>No rewarded users</Text>}
    </LeaderboardTable>
  );
}
