import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getStatus } from "src/config/status";

export async function loader({ params: { status: _status }, request }: LoaderFunctionArgs) {
  const status = getStatus(_status ?? "");

  if (!status) throw new Error("Unknown status");

  const { data: opportunities, ...res } = await fetchOpportunities(request, { status });
  const { data: chains } = await api.v4.chain.get({ query: {} });

  if (!opportunities || !chains) throw new Error("Unknown opportunity");

  return json({ opportunities, chains });
}

export default function Index() {
  const { opportunities, chains } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary exclude={["status"]} opportunities={opportunities} chains={chains} />
    </>
  );
}
