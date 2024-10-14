import { opportunityColumns, OpportunityTable } from "./OpportunityTable";
import { useMemo, useState } from "react";
import OpportunityTableRow from "./OpportunityTableRow";
import Input from "dappkit/components/primitives/Input";
import Select from "dappkit/components/extenders/Select";
import Group from "dappkit/components/extenders/Group";
import { Button } from "dappkit/index";
import Icon from "dappkit/components/primitives/Icon";
import type { Order } from "dappkit/components/primitives/Table";
import { chains } from "src/config/chains";
import List from "dappkit/components/primitives/List";
import { Opportunity } from "merkl-api";
import { useFetcher, useSearchParams } from "@remix-run/react";
import useSearchParamState from "dappkit/hooks/filtering/useSearchParamState";
import OpportunityFilters, { OpportunityFilterProps } from "./OpportunityFilters";

export type OpportunityLibrary = {
  opportunities: Opportunity[];
} & OpportunityFilterProps;

export default function OpportunityLibrary({ opportunities, only, exclude }: OpportunityLibrary) {
  const [searchParams, setSearchParams] = useSearchParams();

  const rows = useMemo(
    () => opportunities?.map(o => <OpportunityTableRow key={`${o.chainId}_${o.identifier}`} opportunity={o} />),
    [opportunities],
  );
  
  const sortable = ["apr", "tvl", "rewards"] as const satisfies (typeof opportunityColumns)

  function onSort(column: (typeof opportunityColumns)[number] , order: Order) {
    console.log("SORT", column, order);
  }

  return (
    <OpportunityTable
      sortable={sortable}
      onSort={onSort}
      header={
        <Group className="justify-between w-full">
            <OpportunityFilters {...{only, exclude}}/>
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
      }
      >
      {rows}
    </OpportunityTable>
  );
}
