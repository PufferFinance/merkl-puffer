import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Space } from "dappkit/src";
import { api } from "src/api";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { id }, request }: LoaderFunctionArgs) {
  const { data: protocol } = await api.v4.protocol({ id: id ?? "" }).get();

  if (!protocol) throw new Error("Unsupported Protocol");

  const { data: opportunities, ...res } = await fetchOpportunities(request, { mainProtocolType: protocol.type });

  return json({ opportunities });
}

export default function Index() {
  const { opportunities } = useLoaderData<typeof loader>();

  return (
    <>
      <Space size="md" />
      <OpportunityLibrary opportunities={opportunities} />
    </>
  );
}
