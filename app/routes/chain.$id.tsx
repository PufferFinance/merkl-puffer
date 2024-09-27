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
  const chainId = getChainId(id ?? "");

  if (!chainId) throw new Error("Unsupported Chain");

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

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const networks = useMemo(() => {
    const a = Object.keys(chains);
    return Object.entries(chains).reduce(
      (supported, [chainId, chain]) => {
        supported[chainId] = (
          <Group>
            <Icon size="sm" chain={chainId} />
            {chain.label}
          </Group>
        );
        return supported;
      },
      {} as { [C in ChainId]?: ReactNode },
    );
  }, []);

  return (
    <>
      <Group className="mx-auto my-auto flex-col p-xl*2 [&>*]:text-center max-w-fit justify-center">
        <Title h={3}>{error?.message ?? "Error"}</Title>
        {/* <Text h={3}>We don't support this chain</Text> */}
        <div>
          <Select
            state={[undefined, c => navigate(`/chain/${chains?.[c]?.label}`)]}
            placeholder="Supported Chains"
            options={networks}
          />
        </div>
      </Group>
    </>
  );
}
