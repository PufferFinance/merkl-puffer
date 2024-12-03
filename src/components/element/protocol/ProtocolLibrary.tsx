import type { Protocol } from "@merkl/api";
import { Group } from "dappkit";
import { useMemo } from "react";
import OpportunityPagination from "../opportunity/OpportunityPagination";
import ProtocolFilters from "./ProtocolFilters";
import { ProtocolTable } from "./ProtocolTable";
import ProtocolTableRow from "./ProtocolTableRow";

export type ProtocolLibraryProps = {
  protocols: Protocol[];
  count?: number;
};

export default function ProtocolLibrary({ protocols, count }: ProtocolLibraryProps) {
  const rows = useMemo(() => protocols?.map(p => <ProtocolTableRow key={`${p.name}`} protocol={p} />), [protocols]);

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
