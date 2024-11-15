import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { Group } from "@ariakit/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Space } from "packages/dappkit/src";
import { api } from "src/api/index.server";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";
import Participate from "src/components/element/participate/Participate";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.get({ query: { search: id } });
  const chain = chains?.[0];

  if (!chain) throw "DSS";

  const { data: opportunity, ...res } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();

  if (!opportunity) throw "No Opportunity"
  
  const { data: campaigns } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).campaigns.get();

  if (!opportunity || !campaigns) throw "DAZZ";

  return json({ opportunity, campaigns });
}

export default function Index() {
  const { opportunity, campaigns } = useLoaderData<typeof loader>();
  const { chain, id } = useParams();

  const { tags, description, link } = useOpportunity(opportunity as Opportunity);

  return (
    <Group>
      <Space size="md" />
      <Group className="grid grid-cols-1 gap-md md:grid-cols-[1fr,300px]">
        <CampaignLibrary campaigns={campaigns as Campaign[]} />
        <Group className="flex-col">
          <Participate opportunity={opportunity as Opportunity} />
        </Group>
      </Group>
    </Group>
  );
}
