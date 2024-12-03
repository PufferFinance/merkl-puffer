import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Container, Group, Space, Text } from "packages/dappkit/src";
import Tooltip from "packages/dappkit/src/components/primitives/Tooltip";
import LeaderboardLibrary from "src/components/element/leaderboard/LeaderboardLibrary";
// import { ChainService } from "src/api/services/chain.service";
// import { OpportunityService } from "src/api/services/opportunity.service";
// import { RewardService } from "src/api/services/reward.service";

export type DummyLeaderboard = {
  rank: number;
  address: string;
  rewards: number;
  protocol: string;
};

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  const leaderboard: DummyLeaderboard[] = [
    { rank: 1, address: "0x1234", rewards: 100, protocol: "Aave" },
    { rank: 2, address: "0x5678", rewards: 50, protocol: "Compound" },
    { rank: 3, address: "0x9abc", rewards: 25, protocol: "Aave" },
    { rank: 4, address: "0xdef0", rewards: 10, protocol: "Compound" },
    { rank: 5, address: "0x1235", rewards: 5, protocol: "Aave" },
  ];

  // ----------- Need to implement this part @Hugo ------------
  // if (!chainId || !id || !type) throw "";
  // const chain = await ChainService.get({ search: chainId });

  // const opportunity = await OpportunityService.getCampaignsByParams({
  //   chainId: chain.id,
  //   type: type,
  //   identifier: id,
  // });

  // const campaignIdentifiers = opportunity?.campaigns?.map((c) => c.identifier);
  // if (!campaignIdentifiers) throw new Error("No campaign identifiers found");

  // console.log({ campaignIdentifiers, chain: chain.id });

  // const rewards = await RewardService.getByParams({
  //   campaignIdentifiers,
  //   chainId: chain.id,
  // });
  // ----------- Need to implement this part @Hugo ------------

  return json({ leaderboard });
}

export default function Index() {
  const { leaderboard } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="lg" />
      <Group size="lg">
        <Group className="flex-col border-2 flex-1">
          <Tooltip helper={null}>
            <Text>Total rewarded users</Text>
          </Tooltip>
          {/* Probably a count from api */}
          <Text size={"xl"}>{leaderboard?.length}</Text>
        </Group>
        <Group className="flex-col border-2 flex-1">
          <Tooltip helper={null}>
            <Text>Total reward distributed</Text>
          </Tooltip>
          <Text size={"xl"}>400k</Text>
        </Group>
      </Group>
      <Space size="lg" />
      <LeaderboardLibrary leaderboard={leaderboard} />
    </Container>
  );
}
