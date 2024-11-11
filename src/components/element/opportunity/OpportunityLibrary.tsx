import type { Chain, Opportunity } from "@angleprotocol/merkl-api";
import { Group, Icon, type Order } from "dappkit";
import { Button } from "dappkit";
import { useMemo } from "react";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";
import OpportunityFilters, { type OpportunityFilterProps } from "./OpportunityFilters";
import { OpportunityTable, type opportunityColumns } from "./OpportunityTable";
import OpportunityTableRow from "./OpportunityTableRow";

export type OpportunityLibrary = {
  opportunities: Opportunity[];
  chains?: Chain[];
} & OpportunityFilterProps;

export default function OpportunityLibrary({ opportunities, only, exclude, chains }: OpportunityLibrary) {
  const rows = useMemo(
    () =>
      opportunities?.map(o => <OpportunityTableRow key={`${o.chainId}_${o.type}_${o.identifier}`} opportunity={o} />),
    [opportunities],
  );

  const sortable = ["apr", "tvl", "rewards"] as const satisfies typeof opportunityColumns;

  const [sortIdAndOrder, setSortIdAndOrder] = useSearchParamState<[id: (typeof sortable)[number], order: Order]>(
    "sort",
    v => v?.join("-"),
    v => v?.split("-") as [(typeof sortable)[number], order: Order],
  );

  function onSort(column: (typeof opportunityColumns)[number], order: Order) {
    if (!sortable.some(s => s === column)) return;

    setSortIdAndOrder([column as (typeof sortable)[number], order]);
  }

  return (
    <OpportunityTable
      sortable={sortable}
      order={(sortIdAndOrder ?? [])?.[1]}
      sort={(sortIdAndOrder ?? [])?.[0] ?? "rewards"}
      onSort={onSort}
      header={
        <Group className="justify-between w-full">
          <OpportunityFilters {...{ only, exclude, chains }} />
          <Group>
            <Button size="sm" look="base">
              Sort
              <Icon size="sm" remix="RiSortDesc" />
            </Button>
            <Button size="sm" look="base">
              <Icon size="sm" remix="RiGridFill" />
            </Button>
          </Group>
        </Group>
      }>
      {rows}
    </OpportunityTable>
  );
}
