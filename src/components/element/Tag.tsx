import type { Token } from "@merkl/api";
import type { Chain } from "@merkl/api";
import { useSearchParams } from "@remix-run/react";
import { Button, Divider, Dropdown, Group, Hash, Icon, PrimitiveTag, Text } from "dappkit";
import type { Component, PrimitiveTagProps } from "dappkit";
import EventBlocker from "packages/dappkit/src/components/primitives/EventBlocker";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import type { Opportunity } from "src/api/services/opportunity/opportunity.model";
import { actions } from "src/config/actions";
import { statuses } from "src/config/status";

export type TagTypes = {
  chain: Opportunity["chain"];
  token: Token;
  tokenChain: Token & { chain?: Chain };
  protocol: Opportunity["protocol"] | undefined;
  action: Opportunity["action"];
  status: Opportunity["status"];
};

export type TagType<T extends keyof TagTypes = keyof TagTypes> = {
  type: T;
  value: TagTypes[T];
};
export type TagProps<T extends keyof TagTypes> = {
  type: T;
  value: TagTypes[T];
  filter?: boolean;
  size?: PrimitiveTagProps["size"];
};

export default function Tag<T extends keyof TagTypes>({ type, filter, value, ...props }: Component<TagProps<T>>) {
  const { chains } = useWalletContext();
  const [_searchParams, setSearchParams] = useSearchParams();

  switch (type) {
    case "status": {
      const status = statuses[value as TagTypes["status"]] ?? statuses.LIVE;
      return (
        <EventBlocker>
          <PrimitiveTag
            className={!filter && "pointer-events-none"}
            onClick={() =>
              setSearchParams(s => {
                s.set("status", value as TagTypes["status"]);
                return s;
              })
            }
            look="soft"
            {...props}>
            <Icon size={props?.size} {...status.icon} />
            {status?.label}
          </PrimitiveTag>
        </EventBlocker>
      );
    }
    case "chain": {
      const chain = value as TagTypes["chain"];
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group className="w-full justify-between items-center" size="xl">
                <Group size="sm">
                  <Icon src={chain?.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {chain?.name}
                  </Text>
                </Group>
                <Text size="xs">
                  Chain ID:{" "}
                  <Hash size="xs" format="full" copy>
                    {chain?.id?.toString()}
                  </Hash>
                </Text>
              </Group>

              <Divider look="soft" horizontal />
              <Group className="flex-col">
                <Button to={`/chains/${chain?.name}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" /> Check opportunities on {chain.name}
                </Button>
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={chain?.icon} />
            {chain?.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "action": {
      const action = actions[value as TagTypes["action"]];
      if (!action) return <Button {...props}>{value}</Button>;
      return (
        <EventBlocker>
          <PrimitiveTag
            className={!filter && "pointer-events-none"}
            onClick={() =>
              setSearchParams(s => {
                s.set("action", value as TagTypes["action"]);
                return s;
              })
            }
            look="tint"
            key={value}
            {...props}>
            <Icon size={props?.size} {...action.icon} />
            {action?.label}
          </PrimitiveTag>
        </EventBlocker>
      );
    }
    case "token": {
      const token = value as TagTypes["token"];
      if (!token) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group className="w-full justify-between items-center" size="xl">
                <Group size="sm">
                  <Icon size={props?.size} src={token.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {token?.name}
                  </Text>
                </Group>
                <Text size="xs">
                  <Hash copy format="short" size="xs">
                    {token.address}
                  </Hash>
                </Text>
              </Group>
              <Divider look="soft" horizontal />
              <Group className="flex-col" size="md">
                <Button to={`/tokens/${token?.symbol}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  Check opportunities with {token?.symbol}
                </Button>
                {chains
                  .find(c => c.id === token.chainId)
                  ?.explorers?.map(explorer => {
                    return (
                      <Button
                        key={`${explorer.url}`}
                        to={`${explorer.url}/token/${token.address}`}
                        external
                        size="xs"
                        look="soft">
                        <Icon remix="RiArrowRightLine" />
                        Visit explorer
                      </Button>
                    );
                  })}
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={token.icon} />
            {token?.symbol}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "tokenChain": {
      const token = value as TagTypes["tokenChain"];
      if (!token) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="xs" className="flex-col">
                <Group className="justify-between" size="xl">
                  <Text size="xs">Token</Text>
                  <Hash format="short" size="xs" copy>
                    {token.address}
                  </Hash>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={token.icon} />
                  <Text size="sm" className="text-main-12" bold>
                    {token?.name}
                  </Text>
                </Group>
              </Group>
              <Divider look="soft" horizontal />
              <Group className="flex-col" size="md">
                <Button to={`/chains/${token.chain?.name}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" /> Check opportunities on {token.chain?.name}
                </Button>
                {chains
                  .find(c => c.id === token.chainId)
                  ?.explorers?.map(explorer => {
                    return (
                      <Button
                        key={`${explorer.url}`}
                        to={`${explorer.url}/token/${token.address}`}
                        external
                        size="xs"
                        look="soft">
                        <Icon remix="RiArrowRightLine" />
                        Visit explorer
                      </Button>
                    );
                  })}
              </Group>
            </Group>
          }>
          <PrimitiveTag look="base" key={value} {...props}>
            <Icon size={props?.size} src={token.chain.icon} />
            {token.chain.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    case "protocol": {
      const protocol = value as TagTypes["protocol"];

      if (!protocol) return <Button {...props}>{value}</Button>;
      return (
        <Dropdown
          size="lg"
          padding="xs"
          content={
            <Group className="flex-col">
              <Group size="sm">
                <Icon size={props?.size} src={protocol?.icon} />
                <Text size="sm" className="text-main-12" bold>
                  {value?.name}
                </Text>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="md">
                <Button to={`/protocols/${protocol?.id}`} size="xs" look="soft">
                  <Icon remix="RiArrowRightLine" />
                  Check opportunities on {protocol?.name}
                </Button>
                {protocol.url && (
                  <Button external to={protocol.url} size="xs" look="soft">
                    <Icon remix="RiArrowRightLine" />
                    Visit {protocol?.name}
                  </Button>
                )}
              </Group>
            </Group>
          }>
          <PrimitiveTag look="bold" key={value} {...props}>
            <Icon src={protocol?.icon} />
            {value?.name}
          </PrimitiveTag>
        </Dropdown>
      );
    }
    default:
      return <PrimitiveTag {...props}>{value}</PrimitiveTag>;
  }
}
