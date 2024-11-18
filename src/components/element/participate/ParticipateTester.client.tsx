import { Box, Icon, Select, Title, Group, Input, Button, Hash } from "packages/dappkit/src";
import { Suspense, useMemo, useState } from "react";
import useParticipate from "src/hooks/useParticipate";
import { api as clientApi } from "src/api/index.client";
import Token from "../token/Token";
import { formatUnits } from "viem";

type Chains = Awaited<ReturnType<typeof clientApi.v4.chains.get>>["data"];

export type ParticipateTesterProps = {
  chains: Chains;
};

export default function ParticipateTester({ chains }: ParticipateTesterProps) {
  const [chainId, setChainId] = useState<number>();
  const [protocolId, setProtocolId] = useState<string>();
  const [target, setTarget] = useState<string>();
  const [tokenAddress, setTokenAddress] = useState();
  const [amount, setAmount] = useState(0.01);

  const { protocols, targets, balance, address, approve, deposit, transaction } = useParticipate(
    chainId,
    protocolId,
    target,
    tokenAddress,
    amount,
  );

  const protocolOptions = useMemo(
    () =>
      protocols?.reduce(
        (obj, protocol) =>
          Object.assign(obj, {
            [protocol.id]: (
              <>
                <Icon size="sm" src={protocol?.icon} />
                {protocol?.name}
              </>
            ),
          }),
        {},
      ),
    [protocols],
  );

  const chainOptions = useMemo(
    () =>
      chains?.reduce(
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
      ),
    [chains],
  );

  const targetOptions = useMemo(
    () =>
      (!!chainId &&
        !!protocolId &&
        targets?.[chainId]?.[protocolId]?.reduce(
          (obj, target) =>
            Object.assign(obj, {
              [target.identifier]: (
                <>
                  {/* <Icon size="sm" src={target.icon} /> */}
                  {/* {target.name} */}
                  {target?.tokens.map(tkn => (
                    <Token key={tkn.address} value token={tkn} />
                  ))}
                </>
              ),
            }),
          {},
        )) ??
      {},
    [chainId, protocolId, targets],
  );

  const balanceOptions = useMemo(
    () =>
      balance?.reduce(
        (obj, token) =>
          Object.assign(obj, {
            [token.address]: (
              <>
                <Token key={token.address} value token={token} />({formatUnits(token?.balance, token?.decimals)})
              </>
            ),
          }),
        {},
      ) ?? {},
    [balance],
  );

  return (
    <Suspense>
      <Box size={"xl"}>
        <Group className="w-full [&>*]:grow">
          <Group className="flex-col">
            <Title h={5}>Chain</Title>
            <Select state={[chainId, setChainId]} loading={!chainOptions} placeholder="Chain" options={chainOptions} />
          </Group>
          <Group className="flex-col">
            <Title h={5}>Protocol</Title>
            <Select
              state={[protocolId, setProtocolId]}
              loading={!protocolOptions}
              placeholder="Protocol"
              options={protocolOptions}
            />
          </Group>
        </Group>
        <Group className="flex-col">
          <Title h={5}>Target</Title>
          <Group className="items-center w-full">
            <Select className="flex-1" state={[target, setTarget]} loading={!targetOptions} placeholder="Target" options={targetOptions} />
            <Hash copy format="short">
              {target}
            </Hash>
          </Group>
        </Group>
        <Group className="flex-col">
          <Title h={5}>Deposit With</Title>
          <Select
            state={[tokenAddress, setTokenAddress]}
            loading={!balanceOptions}
            placeholder="Target"
            options={balanceOptions}
          />
        </Group>
        <Group>
          <Input.BigInt base={3} placeholder="0.0" />
        </Group>
        <Button onClick={approve} disabled={!transaction}>
          Approve {!!transaction ? "on" : "off"}
        </Button>
        <Button onClick={deposit} disabled={!transaction}>
          Participate
        </Button>
      </Box>
    </Suspense>
  );
}
