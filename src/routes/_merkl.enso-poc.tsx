import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { Suspense } from "react";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";
import ParticipateTester from "src/components/element/participate/ParticipateTester.client";

const ENSO = "https://api.enso.finance/api";
const route = "/v1/tokens?protocolSlug=aave-v3&chainId=42161&type=defi&page=1&includeMetadata=false'";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  return json({ chains });
}

export default function Index() {
  const { chains } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Heading
        icons={[{ remix: "RiTestTubeLine" }]}
        title="Participation Tester"
        description="Try the participate service for targets without opportunity yet."
      />
      <Space size="md" />
      <Suspense>
        <ParticipateTester chains={chains} />
      </Suspense>
    </Container>
  );
}
