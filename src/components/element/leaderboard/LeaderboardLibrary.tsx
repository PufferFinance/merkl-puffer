import type { Campaign } from "@merkl/api";
import { useSearchParams } from "@remix-run/react";
import { Text, Title } from "dappkit";
import { useMemo } from "react";
import type { IRewards } from "src/api/services/reward.service";
import OpportunityPagination from "../opportunity/OpportunityPagination";
import { LeaderboardTable } from "./LeaderboardTable";
import LeaderboardTableRow from "./LeaderboardTableRow";

export type IProps = {
  leaderboard: IRewards[];
  count?: number;
  total?: number;
  campaign: Campaign;
};

export default function LeaderboardLibrary(props: IProps) {
  const { leaderboard, count, total, campaign } = props;
  const [searchParams] = useSearchParams();

  const items = searchParams.get("items");
  const page = searchParams.get("page");

  const rows = useMemo(() => {
    return leaderboard?.map((row, index) => (
      <LeaderboardTableRow
        key={crypto.randomUUID()}
        total={BigInt(total ?? 0n)}
        row={row}
        rank={index + 1 + Math.max(Number(page) - 1, 0) * Number(items)}
        campaign={campaign}
      />
    ));
  }, [leaderboard, page, items, total, campaign]);

  return (
    <LeaderboardTable
      dividerClassName={index => (index < 2 ? "bg-accent-8" : "bg-main-8")}
      header={
        <Title h={5} className="!text-main-11 w-full">
          Leaderboard
        </Title>
      }
      footer={count !== undefined && <OpportunityPagination count={count} />}>
      {!!rows.length ? rows : <Text>No rewarded users</Text>}
    </LeaderboardTable>
  );
}
