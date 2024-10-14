import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Icon from "dappkit/components/primitives/Icon";
import Title from "dappkit/components/primitives/Title";
import { type ReactNode, useMemo } from "react";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import { type ChainId, chains, getChainId } from "src/config/chains";
import { getStatus, Status, statuses } from "src/config/status";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const {data: tokens, ...res} = await api.v4.token.get({query: {symbol}});

  if (!tokens?.length) throw new Error("Unknown token");

  return json({ tokens });
}

export default function Index() {
  const { tokens } = useLoaderData<typeof loader>();
  const token  = tokens?.[0]

  return (
    <Page>
      <Heading
        icons={[token?.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={token.name}
        description={"Token"}
        tabs={[
          { label: "Opportunities", link: `/token/${token.symbol?.toLowerCase()}` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
