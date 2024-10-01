import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Icon from "dappkit/components/primitives/Icon";
import Title from "dappkit/components/primitives/Title";
import { type ReactNode, useMemo } from "react";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import { type ChainId, chains, getChainId } from "src/config/chains";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  return json({});
}

export default function Index() {
  return (
    <Page>
      <Heading
        icons={[{src: "/merkl.png"}]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={"Merkl"}
        description={"Get airdrops, earn points, provide liquidity, and more with Merkl, the leading Reward Hub to maximize your earning potential"}
        tabs={[
          { label: "Opportunities", link: `/opportunities` },
          { label: "Status", link: `/opportunities/status` },
          { label: "Analytics", link: `/analytics` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
