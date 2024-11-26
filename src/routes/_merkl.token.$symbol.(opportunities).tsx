import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { symbol }, request }: LoaderFunctionArgs) {
  const { opportunities, count } = await fetchOpportunities(request, { tokens: symbol });
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!opportunities?.length || !chains) throw new Error("Unknown token");

  return json({ opportunities, chains, count });
}

export default function Index() {
  const { opportunities, chains, count } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities} count={count} chains={chains} />
    </>
  );
}
