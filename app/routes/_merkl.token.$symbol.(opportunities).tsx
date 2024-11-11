import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { symbol }, request }: LoaderFunctionArgs) {
  const { data: opportunities, ...res } = await fetchOpportunities(request, { tokens: [symbol] });
  const { data: chains } = await api.v4.chain.get({ query: {} });

  if (!opportunities?.length || !chains) throw new Error("Unknown token");

  return json({ opportunities, chains });
}

export default function Index() {
  const { opportunities, chains } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities} chains={chains} />
    </>
  );
}
