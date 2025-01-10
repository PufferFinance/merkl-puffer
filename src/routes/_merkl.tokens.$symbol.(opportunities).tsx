import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Group, Space, Title } from "dappkit";
import config from "merkl.config";
import { Cache } from "src/api/services/cache.service";
import { ChainService } from "src/api/services/chain.service";
import { OpportunityService } from "src/api/services/opportunity/opportunity.service";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { symbol }, request }: LoaderFunctionArgs) {
  const opportunityFilters = { tokens: symbol } as const;

  const { opportunities, count } = await OpportunityService.getManyFromRequest(request, opportunityFilters);
  const { opportunities: featuredOpportunities } = await OpportunityService.getFeatured(request, opportunityFilters);

  //TODO: embed this in client/service
  const chains = await ChainService.getAll();

  return json({ opportunities, chains, count, featuredOpportunities });
}

export const clientLoader = Cache.wrap("token/opportunities", 300);

export default function Index() {
  const { opportunities, chains, count, featuredOpportunities } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="xl" />
      <Group size="xl" className="py-xl flex-col">
        {config.opportunity.featured.enabled && (
          <>
            <Title className="!text-main-11" h={3}>
              BEST OPPORTUNITIES
            </Title>
            <OpportunityLibrary forceView={"cells"} hideFilters opportunities={featuredOpportunities} />
            <Space size="xl" />
            <Title className="!text-main-11" h={3}>
              ALL OPPORTUNITIES
            </Title>
          </>
        )}
        <OpportunityLibrary exclude={["protocol"]} opportunities={opportunities} count={count} chains={chains} />
      </Group>
    </Container>
  );
}
