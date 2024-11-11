import { createTable, Space } from "dappkit";
import { ClaimRewardsTokenRow } from "./ClaimRewardsTokenTable";
import Token from "../token/Token";
import { PropsWithChildren, useState } from "react";
import Accordion from "packages/dappkit/src/components/primitives/Accordion";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";

export type ClaimRewardsTokenTableRowProps = PropsWithChildren;

export default function ClaimRewardsTokenTableRow(props: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <ClaimRewardsTokenRow
    {...props}
      onClick={() => setOpen(o => !o)}
      tokenColumn={<Token token={{ symbol: "WETH" }} />}
      valueColumn={"3m"}
      claimColumn={"2m"}>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        {/* <Icon remix=""/> */}
      </Collapsible>
    </ClaimRewardsTokenRow>
  );
}
