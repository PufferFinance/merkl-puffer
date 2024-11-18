import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Box, Button, Container, Divider, Group, Icon, Input, Select, Space, Title } from "dappkit";
import { useWalletContext } from "dappkit/src/hooks/Wallet.context";
import { Suspense, useEffect, useMemo, useState } from "react";
import { api } from "src/api/index.server";
import { api as clientApi } from "src/api/index.client";
import Chain from "src/components/element/chain/Chain";
import Token from "src/components/element/token/Token";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";
import { formatUnits, parseUnits } from "viem";
import { useSendTransaction, useWriteContract } from "wagmi";
import useParticipate from "src/hooks/useParticipate";
import ParticipateTester from "src/components/element/participate/ParticipateTester.client";
import Heading from "src/components/composite/Heading";

const ENSO = "https://api.enso.finance/api";
const route = "/v1/tokens?protocolSlug=aave-v3&chainId=42161&type=defi&page=1&includeMetadata=false'";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: chains } = await api.v4.chains.get({ query: {} });

  return json({ chains });
}

export default function Index() {
  const {chains} = useLoaderData<typeof loader>();

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
