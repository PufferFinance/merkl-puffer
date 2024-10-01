import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import Card from "dappkit/components/extenders/Card";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Box from "dappkit/components/primitives/Box";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import List from "dappkit/components/primitives/List";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import { type ReactNode, useMemo } from "react";
import { fetchOpportunities } from "src/api/fetch/fetchOpportunities";
import { fetchTokens } from "src/api/fetch/fetchTokens";
import { tagOpportunities } from "src/api/utils/opportunity";
import OpportunityListItem from "src/components/element/OpportunityListItem";
import { type ChainId, chains, getChainId } from "src/config/chains";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const { res: opportunities } = await fetchOpportunities({});
  const { res: tokens } = await fetchTokens({});

  return json({ opportunities: tagOpportunities(opportunities ?? {}, tokens ?? {}) });
}

export default function Index() {
  const { opportunities } = useLoaderData<typeof loader>();

  return (
    <>
      <Group size="sm" className="flex-col mt-xl">
        <Group className="w-full justify-between">
          <Box className="flex-row" content="sm" size="md">
            <Input size="sm" placeholder="search" />
            <Select size="sm" placeholder="search" />
            <Select size="sm" placeholder="search" />
          </Box>
          <Box className="flex-row" content="xs" size="md">
            <Input size="xs" placeholder="search" />
            <Select size="xs" placeholder="search" />
            <Select size="xs" placeholder="search" />
          </Box>
        </Group>
        <List className="flex-col" look="bold">
          <Card look="bold">
            <Group>
              <Button></Button>
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
