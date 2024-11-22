import type { Reward } from "@angleprotocol/merkl-api";
import { Checkbox, Group, Space, Value } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import { type PropsWithChildren, useMemo, useState } from "react";
import { formatUnits } from "viem";
import OpportuntiyButton from "../opportunity/OpportunityButton";
import Token from "../token/Token";
import { ClaimRewardsTokenRow } from "./ClaimRewardsTokenTable";

export type ClaimRewardsTokenTableRowProps = PropsWithChildren & {
  reward: Reward["rewards"][number];
};

export default function ClaimRewardsTokenTableRow({ reward, ...props }: ClaimRewardsTokenTableRowProps) {
  const [open, setOpen] = useState(false);

  const unclaimed = useMemo(() => reward.amount - reward.claimed, [reward]);
  const [selected, setSelected] = useState(true);

  return (
    <ClaimRewardsTokenRow
      data-look={props?.look ?? "none"}
      {...props}
      onClick={() => setOpen(o => !o)}
      tokenColumn={<Token token={reward.token} />}
      amountColumn={<Value format="0,0.###">{formatUnits(unclaimed, reward.token.decimals)}</Value>}
      claimedColumn={<Value format="0,0.###">{formatUnits(reward.claimed, reward.token.decimals)}</Value>}
      pendingColumn={<Value format="0,0.###">{formatUnits(reward.pending, reward.token.decimals)}</Value>}
      claimColumn={
        <Group className="items-center justify-center">
          <Checkbox state={[selected, setSelected]} className="m-auto" size="sm" />
        </Group>
      }>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        {reward.breakdowns
          .sort((a, b) => Number(b.amount - b.claimed - (a.amount - a.claimed)))
          .map(b => (
            <ClaimRewardsTokenRow
              {...props}
              key={b.opportunity.identifier}
              data-look={props?.look ?? "none"}
              className="!p-0 !m-0 border-none"
              onClick={() => setOpen(o => !o)}
              tokenColumn={<OpportuntiyButton opportunity={b.opportunity} />}
              amountColumn={
                <Value format="0,0.###">{formatUnits(BigInt(b.amount - b.claimed), reward.token.decimals)}</Value>
              }
              claimedColumn={<Value format="0,0.###">{formatUnits(BigInt(b.claimed), reward.token.decimals)}</Value>}
              pendingColumn={<Value format="0,0.###">{formatUnits(BigInt(b.pending), reward.token.decimals)}</Value>}
              claimColumn={<></>}
            />
          ))}
      </Collapsible>
    </ClaimRewardsTokenRow>
  );
}
