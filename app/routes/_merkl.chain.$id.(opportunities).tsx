import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { id: chainId }, request }: LoaderFunctionArgs) {
  if (!chainId) throw new Error("Unsupported Chain");

  const { data: chains } = await api.v4.chain.get({ query: { search: chainId } });
  const chain = chains?.[0];

  if (!chain) throw "";

  const { data: opportunities, ...res } = await fetchOpportunities(request, { chainId: chain.id.toString() });

  return json({ opportunities });
}

export default function Index() {
  const { opportunities } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary exclude={["chain"]} opportunities={opportunities} />
    </>
  );
}
