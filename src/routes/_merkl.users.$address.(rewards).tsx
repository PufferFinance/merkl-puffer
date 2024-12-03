import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { useMemo } from "react";
import { RewardService } from "src/api/services/reward.service";
import ClaimRewardsLibrary from "src/components/element/rewards/ClaimRewardsLibrary";
import { formatUnits } from "viem";

export async function loader({ params: { address } }: LoaderFunctionArgs) {
  if (!address) throw "";

  const rewards = await RewardService.getForUser(address);

  return json({ rewards, address });
}

export default function Index() {
  const { rewards, address } = useLoaderData<typeof loader>();

  const claimed = useMemo(() => {
    return rewards.reduce(({claimed, unclaimed}, chain) => {
      const valueClaimed = chain.rewards.reduce((sum, token) => {
        const value = Number.parseFloat(formatUnits(token.amount - token.claimed, token.token.decimals)) * (token.token.price ?? 0);

        return sum + value
      }, 0);
      const valueEarned = chain.rewards.reduce((sum, token) => sum + token.amount, 0n);

      return {claimed: claimed}
    })
  }, [rewards]);

  return (
    <Container>
      <Space size="md" />
      <ClaimRewardsLibrary from={address} rewards={rewards} />
    </Container>
  );
}
