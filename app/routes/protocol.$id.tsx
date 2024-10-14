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

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const {data: protocol} = await api.v4.protocol({id: id ?? ""}).get();

  if (!protocol) throw new Error("Unsupported Protocol");

  return json({ protocol });
}

export default function Index() {
  const { protocol } = useLoaderData<typeof loader>();

  return (
    <Page>
      <Heading
        icons={[{ src: protocol?.icon }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={protocol?.name}
        description={"Protocol"}
        tabs={[
          { label: "Opportunities", link: `/protocol/${protocol.name?.toLowerCase()}` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}