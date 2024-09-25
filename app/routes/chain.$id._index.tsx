import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Card from "dappkit/components/extenders/Card";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Box from "dappkit/components/primitives/Box";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import List from "dappkit/components/primitives/List";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import { fetchOpportunities } from "src/api/fetch/fetchOpportunities";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import OpportunityListItem from "src/components/element/OpportunityListItem";
import Tag from "src/components/element/Tag";
import { chains, getChainId } from "src/config/chains";
import { getProtocol } from "src/config/protocols";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const chainId = getChainId(id ?? "");

  if (!chainId) throw "";

  const { res: opportunities } = await fetchOpportunities({ chainId });

  return json({ chainId, opportunities });
}

export default function Index() {
  const { chainId, opportunities } = useLoaderData<typeof loader>();
  const chain = chains[chainId];
  const opportunity = opportunities[Object.keys(opportunities)?.[0]];

  return (
    <>
      <Group size="sm" className="flex-col mt-xl">
        <Group className="w-full justify-between">
          <Box className="flex-row" content="sm" size='md'>
            <Input size="sm" placeholder="search" />
            <Select size="sm" placeholder="search" />
            <Select size="sm" placeholder="search" />
          </Box>
          <Box className="flex-row" content="xs" size='md'>
            <Input size="xs" placeholder="search" />
            <Select size="xs" placeholder="search" />
            <Select size="xs" placeholder="search" />
          </Box>
        </Group>
        <List className="flex-col" look="bold">
          <Card look="bold">
            <Group>
              <Button>
              </Button>
            </Group>
          </Card>

          {Object.values(opportunities).map(o => (
            <OpportunityListItem opportunity={o} hideTags={["chain"]} className="flex-col" />
          ))}
        </List>
      </Group>
    </>
  );
}
