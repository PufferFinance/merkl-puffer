import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { api } from "src/api/index.server";
import { fetchOpportunities } from "src/api/opportunity/opportunity";
import OpportunityLibrary from "src/components/element/opportunity/OpportunityLibrary";

export async function loader({ params: { id: chainId }, request }: LoaderFunctionArgs) {
  if (!chainId) throw new Error("Unsupported Chain");

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: chainId },
  });
  const chain = chains?.[0];

  if (!chain) throw "";

  const { opportunities, count } = await fetchOpportunities(request, {
    chainId: chain.id.toString(),
  });

  return json({ opportunities, count });
}

export default function Index() {
  const { opportunities, count } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Space size="md" />
      <OpportunityLibrary exclude={["chain"]} count={count} opportunities={opportunities} />
    </Container>
  );
}
