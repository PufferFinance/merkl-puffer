import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Space from "dappkit/components/primitives/Space";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";
import { getChainId } from "src/config/chains";

export async function loader({ params: { id }, request }: LoaderFunctionArgs) {
  const chainId = getChainId(id ?? "");

  if (!chainId) throw new Error("Unsupported Chain");

  const { data: opportunities, ...res } = await fetchOpportunities(request, { chainId: chainId?.toString() });

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
