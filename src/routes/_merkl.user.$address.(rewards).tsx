import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api/index.server";
import ClaimRewardsLibrary from "src/components/element/rewards/ClaimRewardsLibrary";

export async function loader({ params: { address } }: LoaderFunctionArgs) {
  if (!address) throw "";

  const { data: rewards, ...l } = await api.v4.users({ address }).rewards.full.get({ query: {} });

  console.log(rewards);

  return json({ rewards, address });
}

export default function Index() {
  const { rewards, address } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <ClaimRewardsLibrary from={address} rewards={rewards} />
    </>
  );
}
