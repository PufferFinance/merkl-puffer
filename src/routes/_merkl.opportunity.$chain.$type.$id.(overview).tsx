import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { Group } from "@ariakit/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "packages/dappkit/src";
import { ChainService } from "src/api/services/chain.service";
import { OpportunityService } from "src/api/services/opportunity.service";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";
import Participate from "src/components/element/participate/Participate";
import { ErrorContent } from "src/components/layout/ErrorContent";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  //TODO:  assess where to handle these
  if (!chainId || !id || !type) throw "";

  const chain = await ChainService.get({ search: chainId });
  const opportunityId = { chainId: chain.id, type, identifier: id };

  const opportunity = await OpportunityService.get(opportunityId);
  const campaigns = await OpportunityService.getCampaigns(opportunityId);

  return json({ opportunity, campaigns });
}

export default function Index() {
  const { opportunity, campaigns } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Group>
        <Space size="md" />
        <Group className="grid grid-cols-1 gap-md md:grid-cols-[1fr,300px]">
          <CampaignLibrary campaigns={campaigns as Campaign[]} />
          <Group className="flex-col">
            <Participate opportunity={opportunity as Opportunity} />
          </Group>
        </Group>
      </Group>
    </Container>
  );
}

export function ErrorBoundary() {
  return <ErrorContent />;
}
