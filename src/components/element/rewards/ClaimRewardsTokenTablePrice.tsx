import { Group, Value } from "dappkit";
import type { PropsWithChildren } from "react";
import { formatUnits } from "viem";

export type ClaimRewardsTokenTablePriceProps = PropsWithChildren & {
  price: number;
  amount: bigint;
  decimals: number;
};

export default function ClaimRewardsTokenTablePrice({
  amount,
  price,
  decimals,
  ...props
}: ClaimRewardsTokenTablePriceProps) {
  return (
    <Group size="sm" className="flex-col">
      <Value className="text-right" look={amount.toString() === "0" ? "soft" : "base"} format="$0,0">
        {Number.parseFloat(formatUnits(amount, decimals)) * price}
      </Value>{" "}
      <Value size="xs" className="text-right" look={"soft"} format="0,0.###">
        {formatUnits(amount, decimals)}
      </Value>
    </Group>
  );
}
