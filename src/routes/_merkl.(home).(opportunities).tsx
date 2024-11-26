import type { Opportunity } from "@angleprotocol/merkl-api";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: opportunities } = await fetchOpportunities(request);
  const { data: chains } = await api.v4.chains.get({ query: {} });

  if (!chains || !opportunities) throw "";
  return json({ opportunities, chains });
}

export default function Index() {
  const { opportunities, chains } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary chains={chains} opportunities={opportunities as Opportunity[]} />
    </>
  );
}
