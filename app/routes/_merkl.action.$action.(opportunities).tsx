import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getAction } from "src/config/actions";

export async function loader({ params: { action: _action }, request }: LoaderFunctionArgs) {
  const action = getAction(_action ?? "");

  if (!action) throw new Error("Unknown action");

  const { data: opportunities, ...res } = await fetchOpportunities(request, { action });
  const { data: chains } = await api.v4.chain.get({ query: {} });

  if (!opportunities || !chains) throw new Error("Unknown opportunity");

  return json({ opportunities, chains });
}

export default function Index() {
  const { opportunities, chains } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary exclude={["action"]} opportunities={opportunities.filter(o => o)} chains={chains} />
    </>
  );
}
