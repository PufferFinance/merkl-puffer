import { FetchedOpportunity } from "src/api/fetch/fetchOpportunities";
import { opportunityColumns, OpportunityTable } from "./OpportunityTable";
import { useMemo, useState } from "react";
import OpportunityTableRow from "./OpportunityTableRow";
import Input from "dappkit/components/primitives/Input";
import Select from "dappkit/components/extenders/Select";
import Group from "dappkit/components/extenders/Group";
import { Button } from "dappkit/index";
import Icon from "dappkit/components/primitives/Icon";
import { Order } from "dappkit/components/primitives/Table";
import { chains } from "src/config/chains";

export type OpportunityLibrary = {
  opportunities: FetchedOpportunity[];
};

export default function OpportunityLibrary({ opportunities }: OpportunityLibrary) {
  const rows = useMemo(
    () => opportunities.map(o => <OpportunityTableRow key={o.id} opportunity={o} />),
    [opportunities],
  );
  
  const sortable = ["apr", "tvl", "rewards"] as const satisfies (typeof opportunityColumns)

  function onSort(column: (typeof opportunityColumns)[number] , order: Order) {
    console.log("SORT", column, order);
  }

  const actions = {pool: <><Icon size="sm" remix="Ri24HoursFill"/> Pool</>, hold: <><Icon size="sm" remix="Ri24HoursFill"/> Hold</>, testsomelongenoughstring: <><Icon size="sm" remix="Ri24HoursFill"/> Test</>}
  const chainOptions = Object.entries(chains).reduce((obj, [id, chain]) => Object.assign(obj, {[id]: <><Icon size="sm" chain={id}/>{chain.label}</>}), {})
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  return (
    <OpportunityTable
      sortable={sortable}
      onSort={onSort}
      header={
        <Group className="justify-between w-full">
          <Group>
            <Input size="sm" placeholder="Search" />
            {/* <Select multiple options={actions} size="sm" placeholder="Action" /> */}
            <Select search options={chainOptions} size="sm" placeholder="Chain" />
            {/* <Select size="sm" placeholder="TVL" /> */}
          </Group>
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
