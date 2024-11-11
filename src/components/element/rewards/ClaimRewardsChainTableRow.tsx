import { Button, createTable, Icon, Space } from "dappkit";
import { ClaimRewardsTokenRow, ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import Token from "../token/Token";
import { PropsWithChildren, useState } from "react";
import Accordion from "packages/dappkit/src/components/primitives/Accordion";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import Chain from "../chain/Chain";
import { ClaimRewardsChainRow } from "./ClaimRewardsChainTable";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";
import EventBlocker from "packages/dappkit/src/components/primitives/EventBlocker";

export type ClaimRewardsChainTableRowProps = PropsWithChildren;

export default function ClaimRewardsChainTableRow(props: ClaimRewardsChainTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <ClaimRewardsChainRow
      {...props}
      onClick={() => setOpen(o => !o)}
      chainColumn={
        <>
          <Chain chain={{ name: "Ethereum" }} />
          <Icon
            data-state={!open ? "closed" : "opened"}
            className="transition duration-150 ease-out data-[state=opened]:rotate-180"
            remix={"RiArrowDropDownLine"}
          />
        </>
      }
      unclaimedColumn={"3m"}
      claimColumn={
        <EventBlocker>
          <Button look="hype">Claim All</Button>
        </EventBlocker>
      }
      claimedColumn={""}>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        <ClaimRewardsTokenTable size="sm" look="soft">
          <ClaimRewardsTokenTableRow />
          <ClaimRewardsTokenTableRow />
          <ClaimRewardsTokenTableRow />
        </ClaimRewardsTokenTable>
      </Collapsible>
    </ClaimRewardsChainRow>
  );
}
