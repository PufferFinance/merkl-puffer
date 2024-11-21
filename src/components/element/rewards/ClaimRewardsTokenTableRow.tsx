import { Checkbox, Space, Text, Value } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import { type PropsWithChildren, useMemo, useState } from "react";
import Token from "../token/Token";
import { ClaimRewardsTokenRow } from "./ClaimRewardsTokenTable";
import { Reward } from "@angleprotocol/merkl-api";
import { formatUnits } from "viem";

export type ClaimRewardsTokenTableRowProps = PropsWithChildren & {
  reward: Reward["rewards"][number]
};

export default function ClaimRewardsTokenTableRow({reward, ...props}: ClaimRewardsTokenTableRowProps) {
  const [open, setOpen] = useState(false);

  const unclaimed = useMemo(() => 
    reward.amount - reward.claimed
  , [reward])

  return (
    <ClaimRewardsTokenRow
      data-look={props?.look ?? "none"}
      {...props}
      onClick={() => setOpen(o => !o)}
      tokenColumn={<Token token={reward.token}/>}
      amountColumn={<Value format="0,0.###">{formatUnits(unclaimed, reward.token.decimals)}</Value>}
      claimedColumn={<Value format="0,0.###">{formatUnits(reward.claimed, reward.token.decimals)}</Value>}
      claimColumn={<Checkbox/>}
    >
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        {reward.breakdowns.sort().map(b => <Text key={b.opportunity?.name}>{b.opportunity?.name}</Text>)}
      </Collapsible>
    </ClaimRewardsTokenRow>
  );
}
