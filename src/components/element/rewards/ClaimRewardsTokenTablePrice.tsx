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
  const value = formatUnits(amount, decimals);

  return (
    <Group size="sm" className="flex-col">
      <Value fallback={(v) => {
        console.log(price);
        
        if (price === 0) return "-"
        return ((v.toString()) as string).includes('0.0') && "<0.1"}} className="text-right" look={amount.toString() === "0" ? "soft" : "base"} format="$0,0.#">
        {Number.parseFloat(value) * price}
      </Value>{" "}
      <Value fallback={(v) => (v as string).includes('0.000') && "<0.001"} size="xs" className="text-right" look={"soft"} format="0,0.###">
        {value} 
      </Value>
    </Group>
  );
}
