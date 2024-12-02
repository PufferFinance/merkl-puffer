import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Group, Text } from "packages/dappkit/src";
import Tooltip from "packages/dappkit/src/components/primitives/Tooltip";
import { api } from "src/api/index.server";
import { CampaignService } from "src/api/services/campaign.service";
import LeaderboardLibrary from "src/components/element/leaderboard/LeaderboardLibrary";

export type DummyLeaderboard = {
  rank: number;
  address: string;
  rewards: number;
  protocol: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const leaderboard: DummyLeaderboard[] = [
    { rank: 1, address: "0x1234", rewards: 100, protocol: "Aave" },
    { rank: 2, address: "0x5678", rewards: 50, protocol: "Compound" },
    { rank: 3, address: "0x9abc", rewards: 25, protocol: "Aave" },
    { rank: 4, address: "0xdef0", rewards: 10, protocol: "Compound" },
    { rank: 5, address: "0x1235", rewards: 5, protocol: "Aave" },
  ];

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: params.chain },
  });

  const chain = chains?.[0];
  if (!chain) throw "DSS";

  const campaigns = await CampaignService.getByParams({
    chainId: chain.id,
    type: params.type as Parameters<
      typeof api.v4.campaigns.index.get
    >[0]["query"]["type"],
    identifier: params.id,
  });

  console.log({ campaigns });

  const campaignIdentifiers = campaigns?.map(
    (campaign) => campaign?.identifier
  );

  if (!campaignIdentifiers) throw "DSS";

  // const rewards = await RewardService.getByCampaignsId();

  const { data: rewards } = await api.v4.rewards.breakdown.get({
    query: {
      campaignIdentifiers: [
        "0x32f1cc3a5a775f60eaaa9796a92bc356016ec574b6b470d141477261994c09ae",
      ],
      chainId: 100,
    },
  });

  return json({ leaderboard, rewards });
}

export default function Index() {
  const { leaderboard, rewards } = useLoaderData<typeof loader>();

  return (
    <>
      <Group size="lg">
        <Group className="flex-col border-2 flex-1">
          <Tooltip helper={null}>
            <Text>Total rewarded users</Text>
          </Tooltip>
          {/* Probably a count from api */}
          <Text size={"xl"}>{rewards?.length}</Text>
        </Group>
        <Group className="flex-col border-2 flex-1">
          <Tooltip helper={null}>
            <Text>Total reward distributed</Text>
          </Tooltip>
          <Text size={"xl"}>400k</Text>
        </Group>
      </Group>

      <LeaderboardLibrary leaderboard={leaderboard} />
    </>
  );
}
