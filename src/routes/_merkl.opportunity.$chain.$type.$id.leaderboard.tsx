import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
    { rank: 5, address: "0x1234", rewards: 5, protocol: "Aave" },
  ];

  return json(leaderboard);
}

export default function Index() {
  const leaderboard = useLoaderData<typeof loader>();
  return <LeaderboardLibrary leaderboard={leaderboard} />;
}
