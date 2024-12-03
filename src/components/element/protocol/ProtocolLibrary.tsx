import type { Protocol } from "@merkl/api";
import { Group, type Order } from "dappkit";
import { useMemo } from "react";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";
import ProtocolTableRow from "./ProtocolTableRow";
import { ProtocolTable } from "./ProtocolTable";
import OpportunityPagination from "../opportunity/OpportunityPagination";
import OpportunityFilters from "../opportunity/OpportunityFilters";
import ProtocolFilters from "./ProtocolFilters";

export type ProtocolLibraryProps = {
  protocols: Protocol[];
  count?: number;
};

export default function ProtocolLibrary({ protocols, count }: ProtocolLibraryProps) {
  const rows = useMemo(
    () =>
      protocols?.map(p => <ProtocolTableRow key={`${p.name}`} protocol={p} />),
    [protocols],
  );

  return (
    <ProtocolTable
      footer={count !== undefined && <OpportunityPagination count={count} />}
      header={
        <Group className="justify-between w-full">
          <ProtocolFilters />
        </Group>
      }>
      {rows}
    </ProtocolTable>
  );
}
