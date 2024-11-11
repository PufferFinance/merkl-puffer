import { Button, Icon, Space, Text } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import EventBlocker from "packages/dappkit/src/components/primitives/EventBlocker";
import { type PropsWithChildren, useState } from "react";
import Chain from "../chain/Chain";
import { ClaimRewardsChainRow } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";

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
        <ClaimRewardsTokenTable
          tokenHeader={
            <Text size="xs" className="pl-md">
              TOKEN
            </Text>
          }
          size="sm"
          look="soft">
          <ClaimRewardsTokenTableRow />
          <ClaimRewardsTokenTableRow />
          <ClaimRewardsTokenTableRow />
        </ClaimRewardsTokenTable>
      </Collapsible>
    </ClaimRewardsChainRow>
  );
}
