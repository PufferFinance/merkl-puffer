import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getAction } from "src/config/actions";

export async function loader({
  params: { action: _action },
  request,
}: LoaderFunctionArgs) {
  const action = getAction(_action ?? "");

  if (!action) throw new Error("Unknown action");

  const { opportunities, count } = await fetchOpportunities(request, {
    action,
  });
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!opportunities || !chains) throw new Error("Unknown opportunity");

  return json({ opportunities, chains, count });
}

export default function Index() {
  const { opportunities, chains, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary
        exclude={["action"]}
        count={count}
        opportunities={opportunities.filter((o) => o)}
        chains={chains}
      />
    </Container>
  );
}
