import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Box, Button, Container, Divider, Group, Icon, Input, Select, Space, Title } from "dappkit";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useEffect, useMemo, useState } from "react";
import { api } from "src/api/index.server";
import { api as clientApi } from "src/api/index.client";
import Chain from "src/components/element/chain/Chain";
import Token from "src/components/element/token/Token";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";
import { formatUnits, parseUnits } from "viem";
import { useSendTransaction, useWriteContract } from "wagmi";
import useParticipate from "packages/dappkit/src/hooks/useParticipate";

const ENSO = "https://api.enso.finance/api";
const route = "/v1/tokens?protocolSlug=aave-v3&chainId=42161&type=defi&page=1&includeMetadata=false'";

export async function loader({ request }: LoaderFunctionArgs) {
  const chain = new URL(request.url).searchParams.get("chain");
  const protocol = new URL(request.url).searchParams.get("protocol");
  const identifier = new URL(request.url).searchParams.get("identifier");

  const { data: chains } = await api.v4.chains.get({ query: {} });

  const chainId = chains?.find(c => c.id === +(chain ?? ""))?.id;

  if (!chain || !chainId) return json({ chains, targets: [], protocols: [] });

  const { data: protocols } = await api.v4.participate.protocols.get({ query: { chainId } });

  const { data: tokens } = await api.v4.tokens.get({ query: { } });

  if (!protocol) return json({ chains, targets: [], protocols });

  const { data: targets, ...res} = await api.v4.participate.targets.get({ query: { chainId, protocolId: protocol } });

  return json({ chains, targets: targets, protocols });
}

export default function Index() {
  const { chains, protocols } = useLoaderData<typeof loader>();
  const { targets } = useParticipate();
  const [chain, setChain] = useState(1);

  const [chainId, setChainId] = useSearchParamState<string>(
    "chain",
    v => v,
    v => v,
  );

  const [protocol, setProtocol] = useSearchParamState<string>(
    "protocol",
    v => v,
    v => v,
  );

  const [identifier, setIdentifier] = useSearchParamState<string>(
    "identifier",
    v => v,
    v => v,
  );

  const [target, setTarget] = useState();

  const [depositTokenAddress, setDepositTokenAddress] = useState<string>();
  const [depositTokens, setDepositTokens] = useState<Awaited<ReturnType<typeof clientApi.v4.tokens.balances.get>>["data"]>();
  const [depositAmount, setDepositAmount] = useState<string>("0"); 
  const depositToken = useMemo(() => depositTokens?.find(t => t.address === depositTokenAddress), [depositTokenAddress, depositTokens]);

  const { address } = useWalletContext();

  useEffect(() => {
    async function getDepositTokens() {
      const target = targets?.find((t) => t?.identifier === identifier);

      console.log(target ,chainId ,address);
      
      if (!target || !chainId || !address) return;
      
      const {data: tkns} = await clientApi.v4.tokens.balances.get({query: {chainId: +chainId, userAddress: address, additionalTokenAddresses: target.tokens.map(t => t.address)}})

      setDepositTokens(tkns);
      console.log("tkns", tkns);
    }

    getDepositTokens();
    
    return () => {
      setDepositTokens(undefined);  
    };
  }, [identifier, targets, address, chainId]);

  const [transaction, setTransaction] = useState<Awaited<ReturnType<typeof clientApi.v4.participate.transaction.get>>["data"]>();

  useEffect(() => {
    async function getDepositTransaction() {
      const target = targets?.find((t) => t?.identifier === identifier);

      if (!target || !chainId || !address || !protocol || !depositTokenAddress || !depositToken) return;
      
      try {

        const {data: txn} = await clientApi.v4.participate.transaction.get({query: {chainId: +chainId, protocolId: protocol, identifier: target.identifier, userAddress: address, fromTokenAddress: depositTokenAddress, fromAmount: parseUnits(depositAmount, depositToken?.decimals).toString() }})
        
        console.log("txns", txn);
        setTransaction(txn)
      } catch (err) {
        console.log("ERROR");
      }
    }

    getDepositTransaction();
  }, [depositToken, depositAmount, target]);

  function deposit() {
    console.log("??", transaction.tx.to, transaction?.tx.data);
    
    const res = writeContract({
      address: transaction.tx.to,
      data: transaction?.tx.data
    })

    console.log(res);
    
  }


  // useEffect(() => {
  //   async function fetchTokens() {
  //     const res = await fetch(`${ENSO}/v1/tokens?protocolSlug=${protocol}&chainId=${42161}&type=defi&page=1`, {
  //       headers: new Headers({
  //         Authorization: `Bearer ${"8dbbda50-6ed5-4bda-bf54-ea2796602057"}`,
  //         "Content-Type": "application/json",
  //       }),
  //     }).then(a => a.json());

  //     const tokens = (res.data as []).map(d => ({
  //       address: d.address,
  //       symbol: (d.underlyingTokens as []).map(t => t.address).join("/"),
  //     }));

  //     setTokens(tokens);

  //     console.log(res);
  //   }

  //   fetchTokens();
  // }, [protocol, chain]);

  return (
    <Container>
      <Title h={2}>Enso PoC</Title>
      <Divider className="border-main-6" horizontal />
      <Space size="lg" />
      <Box size="xl">
        <Group size="xl" className="min-h-[100vh] via-main-1 via-[15em] from-main-3 to-main-1 p-md flex-col">
          <Group className="flex-col">
            <Group>
              <Select
                state={[chainId, setChainId]}
                options={chains?.reduce(
                  (obj, chain) =>
                    Object.assign(obj, {
                      [chain.id]: (
                        <>
                          <Icon size="sm" src={chain.icon} />
                          {chain.name}
                        </>
                      ),
                    }),
                  {},
                )}
              />
              <Select
                search
                state={[protocol, setProtocol]}
                options={protocols?.reduce(
                  (obj, p) =>
                    Object.assign(obj, {
                      [p.id]: (
                        <>
                          <Icon size="sm" src={p?.icon} />
                          {p?.name}
                        </>
                      ),
                    }),
                  {},
                )}
              />
            </Group>
            <Group>
              <Select state={[identifier, setIdentifier]} search options={targets?.reduce((obj, t) => Object.assign(obj, { [t?.identifier]: <>{t?.tokens.map(tkn => <Token key={tkn.address} value token={tkn}/>)}</> }), {})} />
            </Group>
            <Input state={[depositAmount, setDepositAmount]} header={<>max: {depositToken && formatUnits(depositToken?.balance, depositToken?.decimals)}</>} placeholder="0.0" look="bold" suffix={<Select state={[depositTokenAddress, setDepositTokenAddress]} search options={depositTokens?.reduce((obj, t) => Object.assign(obj, { [t?.address]: <>{<Token key={t.address} value token={t}/>} ({ formatUnits(t.balance, t.decimals)})</> }), {})} />} />
            <Group>
              <Button look="hype" onClick={deposit}>Deposit</Button>
            </Group>
          </Group>
        </Group>
      </Box>
      <Space className="grow" size="lg" />
    </Container>
  );
}
