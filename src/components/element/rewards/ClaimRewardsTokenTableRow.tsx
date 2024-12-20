import type { Reward } from "@merkl/api";
import { Checkbox, Divider, type GetSet, Group, Icon, Space } from "dappkit";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import { type PropsWithChildren, useMemo, useState } from "react";
import Tag from "../Tag";
import OpportuntiyButton from "../opportunity/OpportunityButton";
import { ClaimRewardsTokenRow } from "./ClaimRewardsTokenTable";
import ClaimRewardsTokenTablePrice from "./ClaimRewardsTokenTablePrice";

export type ClaimRewardsTokenTableRowProps = PropsWithChildren & {
  reward: Reward["rewards"][number];
  checkedState?: GetSet<boolean>;
};

export default function ClaimRewardsTokenTableRow({ reward, checkedState, ...props }: ClaimRewardsTokenTableRowProps) {
  const [open, setOpen] = useState(false);

  const unclaimed = useMemo(() => BigInt(reward.amount) - BigInt(reward.claimed), [reward]);

  return (
    <ClaimRewardsTokenRow
      data-look={props?.look ?? "none"}
      {...props}
      onClick={() => setOpen(o => !o)}
      tokenColumn={
        <Group>
          <Tag type="token" value={reward.token} />
          <Icon
            data-state={!open ? "closed" : "opened"}
            className="text-main-10 transition duration-150 ease-out data-[state=opened]:rotate-180"
            remix={"RiArrowDropDownLine"}
          />
        </Group>
      }
      amountColumn={
        <ClaimRewardsTokenTablePrice amount={unclaimed} price={reward.token.price} decimals={reward.token.decimals} />
      }
      claimedColumn={
        <ClaimRewardsTokenTablePrice
          amount={BigInt(reward.claimed)}
          price={reward.token.price}
          decimals={reward.token.decimals}
        />
      }
      pendingColumn={
        <ClaimRewardsTokenTablePrice
          amount={BigInt(reward.pending)}
          price={reward.token.price}
          decimals={reward.token.decimals}
        />
      }
      claimColumn={
        <Group className="items-center justify-center">
          <Checkbox state={checkedState} className="m-auto" size="sm" />
        </Group>
      }>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        {reward.breakdowns
          .sort((a, b) => Number(b.amount - b.claimed - (a.amount - a.claimed)))
          .map(b => {
            return (
              <>
                <Divider look="soft" horizontal key={b.opportunity.identifier.concat("-divider")} />
                <ClaimRewardsTokenRow
                  {...props}
                  key={b.opportunity.identifier}
                  data-look={props?.look ?? "none"}
                  className="!px-0  !m-0 border-none"
                  onClick={() => setOpen(o => !o)}
                  tokenColumn={
                    <Group className="flex-col justify-center">
                      <OpportuntiyButton opportunity={b.opportunity} />
                    </Group>
                  }
                  amountColumn={
                    <ClaimRewardsTokenTablePrice
                      amount={b.amount - b.claimed}
                      price={reward.token.price}
                      decimals={reward.token.decimals}
                    />
                  }
                  claimedColumn={
                    <ClaimRewardsTokenTablePrice
                      amount={b.claimed}
                      price={reward.token.price}
                      decimals={reward.token.decimals}
                    />
                  }
                  pendingColumn={
                    <ClaimRewardsTokenTablePrice
                      amount={b.pending}
                      price={reward.token.price}
                      decimals={reward.token.decimals}
                    />
                  }
                  claimColumn={null}
                />
              </>
            );
          })}
      </Collapsible>
    </ClaimRewardsTokenRow>
  );
}
