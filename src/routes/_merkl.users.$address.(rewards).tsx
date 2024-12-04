import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { RewardService } from "src/api/services/reward.service";
import ClaimRewardsLibrary from "src/components/element/rewards/ClaimRewardsLibrary";

export async function loader({ params: { address } }: LoaderFunctionArgs) {
  if (!address) throw "";

  const rewards = await RewardService.getForUser(address);

  return json({ rewards, address });
}

export default function Index() {
  const { rewards, address } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <ClaimRewardsLibrary from={address} rewards={rewards} />
    </Container>
  );
}
