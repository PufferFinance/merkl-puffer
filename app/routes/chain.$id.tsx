import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Icon from "dappkit/components/primitives/Icon";
import { fetchOpportunities } from "src/api/fetch/fetchOpportunities";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import { chains, getChainId } from "src/config/chains";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const chainId = getChainId(id ?? "");

  if (!chainId) throw "";

  return json({ chainId });
}

export default function Index() {
  const { chainId } = useLoaderData<typeof loader>();
  const chain = chains[chainId];

  return (
    <Page>
      <Heading
        icons={[{ chain: chainId }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={chain.label}
        description={"A new era for ethereum apps"}
        tabs={[
          { label: "Opportunities", link: `/chain/${chain.label?.toLowerCase()}` },
          { label: "Leaderboard", link: `/chain/${chain.label?.toLowerCase()}/leaderboard` },
          { label: "Analytics", link: `/chain/${chain.label?.toLowerCase()}/analytics` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
