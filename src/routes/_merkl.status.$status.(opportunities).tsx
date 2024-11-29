import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getStatus } from "src/config/status";

export async function loader({ params: { status: _status }, request }: LoaderFunctionArgs) {
  const status = getStatus(_status ?? "");

  if (!status) throw new Error("Unknown status");

  const { opportunities, count } = await fetchOpportunities(request, { status });
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!opportunities || !chains) throw new Error("Unknown opportunity");

  return json({ opportunities, chains, count });
}

export default function Index() {
  const { opportunities, chains, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary exclude={["status"]} count={count} opportunities={opportunities} chains={chains} />
    </Container>
  );
}
