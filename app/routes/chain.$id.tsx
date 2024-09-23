import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Icon from "dappkit/components/primitives/Icon";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import { chains } from "src/config/chains";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const chain = Object.entries(chains).find(([chainId, { label, short }]) =>
    [chainId, label, short].map(v => v?.toLowerCase?.() ?? v).some(v => v === (id?.toLowerCase?.() ?? id)),
  );

  return json({ id: Number.parseInt(chain?.[0] ?? "0"), ...chain?.[1] });
}

export default function Index() {
  const chain = useLoaderData<typeof loader>();

  return (
    <Page>
      <Heading
        icons={[{ chain: chain.id }]}
        title={chain.label}
        description={"Chain on Merkl."}
        tabs={[
          { label: "Overview", link: `/chain/${chain}` },
          { label: "Leaderboard", link: `/chain/${chain}/leaderboard` },
          { label: "Analytics", link: `/chain/${chain}/analytics` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
