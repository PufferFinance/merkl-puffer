import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { Group } from "@ariakit/react";
import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { Space, Text } from "packages/dappkit/src";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";
import Participate from "src/components/element/participate/Participate";
import Tag from "src/components/element/Tag";
import { getChainId } from "src/config/chains";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({ params: { id, type, chain } }: LoaderFunctionArgs) {
  const chainId = getChainId(chain ?? "");

  if (!chainId || !id || !type) throw "";

  const { data: opportunity, ...res } = await api.v4.opportunity({ chainId })({ type })({ id }).get();
  const { data: campaigns } = await api.v4.campaign.opportunity({ chainId })({ type })({ id }).get();

  if (!opportunity || !campaigns) throw "";

  return json({ opportunity, campaigns });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.error) return [{ title: "404 on Merkl" }];
  return [{ title: `${data?.name} on Merkl` }];
};

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
