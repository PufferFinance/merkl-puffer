import type { Opportunity } from "@angleprotocol/merkl-api";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ request }: LoaderFunctionArgs) {
  const { opportunities, count } = await fetchOpportunities(request);
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!chains || !opportunities) throw "";
  return json({ opportunities, chains, count });
}

export default function Index() {
  const { opportunities, chains, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary chains={chains} count={count} opportunities={opportunities as Opportunity[]} />
    </Container>
  );
}
