import type { Opportunity } from "@angleprotocol/merkl-api";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: opportunities } = await fetchOpportunities(request);

  return json({ opportunities });
}

export default function Index() {
  const { opportunities } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities as Opportunity[]} />
    </>
  );
}
