import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Space from "dappkit/components/primitives/Space";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getStatus } from "src/config/status";

export async function loader({ params: { symbol }, request }: LoaderFunctionArgs) {
  const { data: opportunities, ...res} = await fetchOpportunities(request, {tokens: [symbol]})

  if (!opportunities?.length) throw new Error("Unknown token");
  
  return json({ opportunities });
}

export default function Index() {
  const {  opportunities } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities} />
    </>
  );
}