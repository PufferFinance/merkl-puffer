import { Text } from "dappkit";
import { useMemo } from "react";
import type { DummyLeaderboard } from "src/routes/_merkl.opportunities.$chain.$type.$id.leaderboard";
import { LeaderboardTable } from "./LeaderboardTable";
import LeaderboardTableRow from "./LeaderboardTableRow";

export type IProps = {
  leaderboard: DummyLeaderboard[];
};

export default function LeaderboardLibrary(props: IProps) {
  const { leaderboard } = props;

  const rows = useMemo(() => {
    return leaderboard?.map(row => <LeaderboardTableRow key={row.address} row={row} />);
  }, [leaderboard]);

  return (
    <LeaderboardTable header={<Text className="w-full">Leaderboard</Text>} footer={"Something"}>
      {!!rows.length ? rows : <Text>No rewarded users</Text>}
    </LeaderboardTable>
  );
}
