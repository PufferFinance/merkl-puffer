import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container, Space } from "dappkit";
import { Suspense } from "react";
import { api } from "src/api/index.server";
import Hero from "src/components/composite/Hero";
import ParticipateTester from "src/components/element/participate/ParticipateTester.client";

export async function loader(_args: LoaderFunctionArgs) {
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  return json({ chains });
}

export default function Index() {
  const { chains } = useLoaderData<typeof loader>();

  return (
    <>
      <Hero
        icons={[{ remix: "RiTestTubeLine" }]}
        title="Participation Tester"
        description="Try the participate service for targets without opportunity yet."
      />
      <Space size="md" />
      <Suspense>
        <ParticipateTester chains={chains} />
      </Suspense>
    </>
  );
}
