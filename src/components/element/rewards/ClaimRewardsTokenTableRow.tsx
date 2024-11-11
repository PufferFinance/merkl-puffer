import { Space } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import { type PropsWithChildren, useState } from "react";
import Token from "../token/Token";
import { ClaimRewardsTokenRow } from "./ClaimRewardsTokenTable";

export type ClaimRewardsTokenTableRowProps = PropsWithChildren;

export default function ClaimRewardsTokenTableRow(props: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <ClaimRewardsTokenRow
      data-look={props?.look ?? "none"}
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
