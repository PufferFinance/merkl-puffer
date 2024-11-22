import type { Reward } from "@angleprotocol/merkl-api";
import { Checkbox, Group, Icon, Space, Value } from "dappkit";
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
      tokenColumn={
        <Group>
          <Token token={reward.token} />
          <Icon
            data-state={!open ? "closed" : "opened"}
            className="text-main-10 transition duration-150 ease-out data-[state=opened]:rotate-180"
            remix={"RiArrowDropDownLine"}
          />
        </Group>
      }
      amountColumn={
        <Value look={unclaimed.toString() === "0" ? "soft" : "base"} format="0,0.###">
          {formatUnits(unclaimed, reward.token.decimals)}
        </Value>
      }
      claimedColumn={
        <Value look={reward.claimed.toString() === "0" ? "soft" : "base"} format="0,0.###">
          {formatUnits(reward.claimed, reward.token.decimals)}
        </Value>
      }
      pendingColumn={
        <Value look={reward.pending.toString() === "0" ? "soft" : "base"} format="0,0.###">
          {formatUnits(reward.pending, reward.token.decimals)}
        </Value>
      }
      claimColumn={
        <Group className="items-center justify-center">
          <Checkbox state={[selected, setSelected]} className="m-auto" size="sm" />
        </Group>
      }>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        {reward.breakdowns
          .sort((a, b) => Number(b.amount - b.claimed - (a.amount - a.claimed)))
          .map(b => {
            return (
              <ClaimRewardsTokenRow
                {...props}
                key={b.opportunity.identifier}
                data-look={props?.look ?? "none"}
                className="!p-0 !m-0 border-none"
                onClick={() => setOpen(o => !o)}
                tokenColumn={<OpportuntiyButton opportunity={b.opportunity} />}
                amountColumn={
                  <Value look={(b.amount - b.claimed).toString() === "0" ? "soft" : "base"} format="0,0.###">
                    {formatUnits(BigInt(b.amount - b.claimed), reward.token.decimals)}
                  </Value>
                }
                claimedColumn={
                  <Value look={b.claimed.toString() === "0" ? "soft" : "base"} format="0,0.###">
                    {formatUnits(BigInt(b.claimed), reward.token.decimals)}
                  </Value>
                }
                pendingColumn={
                  <Value look={b.pending.toString() === "0" ? "soft" : "base"} format="0,0.###">
                    {formatUnits(BigInt(b.pending), reward.token.decimals)}
                  </Value>
                }
                claimColumn={<></>}
              />
            );
          })}
      </Collapsible>
    </ClaimRewardsTokenRow>
  );
}
