import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import Card from "dappkit/components/extenders/Card";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Box from "dappkit/components/primitives/Box";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import List from "dappkit/components/primitives/List";
import Space from "dappkit/components/primitives/Space";
import { createTable } from "dappkit/components/primitives/Table";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import { type ReactNode, useMemo } from "react";
import { fetchOpportunities } from "src/api/fetch/fetchOpportunities";
import { fetchTokens } from "src/api/fetch/fetchTokens";
import { tagOpportunities } from "src/api/utils/opportunity";
import OpportunityListItem from "src/components/element/OpportunityListItem";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { type ChainId, chains, getChainId } from "src/config/chains";

const [OpportunityTable, OpportunityRow] = createTable({
  opportunity: ["Opportunity", "1fr"],
  apr: ["APR", "minmax(100px,150px)"],
  tvl: ["TVL", "minmax(100px,150px)"],
  rewards: ["Daily Rewards", "minmax(100px,150px)"],
});

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const chainId = getChainId(id ?? "");

  if (!chainId) throw "";

  const { res: opportunities } = await fetchOpportunities({ chainId });
  const { res: tokens } = await fetchTokens({});

  return json({ chainId, opportunities: tagOpportunities(opportunities ?? {}, tokens ?? {}) });
}

export default function Index() {
  const { chainId, opportunities } = useLoaderData<typeof loader>();
  const chain = chains[chainId];
  const opportunity = opportunities[Object.keys(opportunities)?.[0]];

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={Object.values(opportunities)} />

      {/* <Group size="sm" className="flex-col mt-xl">
        <List className="flex-col" look="bold">
          <Box look="base" className="w-full flex-row justify-between">
            <Group content="sm" size="md">
              <Input size="sm" placeholder="search" />
              <Select size="sm" placeholder="search" />
              <Select size="sm" placeholder="search" />
            </Group>
            <Group content="xs" size="xs">
              <Button size="sm" look="soft">
                d
              </Button>
            </Group>
          </Box>
          <Card look="bold">
            <Group>
              <Button></Button>
            </Group>
          </Card>

          {Object.values(opportunities).map(o => (
            <OpportunityListItem opportunity={o} hideTags={["chain"]} className="flex-col" />
          ))}
        </List>
      </Group> */}
    </>
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
            {/* {chain.label} */}
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
        <Text h={3}>Select another chain</Text>
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
