import { Box, Container, Divider, Group, Input, Select, Space, Title } from "dappkit";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useEffect, useState } from "react";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";

const ENSO = "https://api.enso.finance/api";
const route = "/v1/tokens?protocolSlug=aave-v3&chainId=42161&type=defi&page=1&includeMetadata=false'";

export default function Index() {
  useEffect(() => {
    return () => {};
  }, []);

  const [protocol, setProtocol] = useState("aave-v3");
  const [tokens, setTokens] = useState([]);
  const { address } = useWalletContext();

  useEffect(() => {
    async function fetchTokens() {
      const res = await fetch(`${ENSO}/v1/tokens?protocolSlug=${protocol}&chainId=${42161}&type=defi&page=1`, {
        headers: new Headers({
          Authorization: `Bearer ${"8dbbda50-6ed5-4bda-bf54-ea2796602057"}`,
          "Content-Type": "application/json",
        }),
      }).then(a => a.json());

      const tokens = (res.data as []).map(d => ({
        address: d.address,
        symbol: (d.underlyingTokens as []).map(t => t.address).join("/"),
      }));

      setTokens(tokens);

      console.log(res);
    }

    fetchTokens();
  }, []);

  return (
    <Container>
      <Title h={2}>Enso PoC</Title>
      <Divider className="border-main-6" horizontal/>
      <Space size="lg"/>
      <Box size="xl">
        <Group size="xl" className="min-h-[100vh] via-main-1 via-[15em] from-main-3 to-main-1 p-md flex-col">
          <Group>
            <Select options={{ "aave-v3": "Aave V3" }} />
            <Select options={tokens.reduce((obj, t) => Object.assign(obj, { [t.address]: t.symbol }), {})} />
            <Input placeholder="poolAddress" look="bold" />
          </Group>
          <Input placeholder="0.0" look="bold" suffix={<Select options={{ t: "ARB" }} />} />
        </Group>
      </Box>
      <Space className="grow" size="lg"/>
    </Container>
  );
}
