import type { Reward } from "@angleprotocol/merkl-api";
import { Button, Icon, Space, Text } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import EventBlocker from "packages/dappkit/src/components/primitives/EventBlocker";
import { type PropsWithChildren, useState } from "react";
import Chain from "../chain/Chain";
import { ClaimRewardsChainRow } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";

export type ClaimRewardsChainTableRowProps = PropsWithChildren & {
  reward: Reward;
};

export default function ClaimRewardsChainTableRow({ reward, ...props }: ClaimRewardsChainTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <ClaimRewardsChainRow
      {...props}
      onClick={() => setOpen(o => !o)}
      chainColumn={
        <>
          <Chain chain={reward.chain} />
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
          <Button look="hype">Claim</Button>
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
          {reward.rewards
            .sort((a, b) => Number(b.amount - b.claimed - (a.amount - a.claimed)))
            .map(_reward => (
              <ClaimRewardsTokenTableRow reward={_reward} />
            ))}
        </ClaimRewardsTokenTable>
      </Collapsible>
    </ClaimRewardsChainRow>
  );
}
