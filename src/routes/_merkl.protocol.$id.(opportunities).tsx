import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit/src";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { id }, request }: LoaderFunctionArgs) {
  const { data: protocol } = await api.v4.protocols({ id: id ?? "" }).get();

  if (!protocol) throw new Error("Unsupported Protocol");

  const { opportunities, count } = await fetchOpportunities(request, { mainProtocolId: id });
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!opportunities || !chains) throw new Error("");

  return json({ opportunities, chains, count });
}

export default function Index() {
  const { opportunities, chains, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities} count={count} chains={chains} />
    </Container>
  );
}
