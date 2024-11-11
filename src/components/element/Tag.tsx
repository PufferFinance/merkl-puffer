import type { Opportunity, Token } from "@angleprotocol/merkl-api";
import { Button, Divider, Dropdown, Group, Hash, Icon, Text, Title } from "dappkit";
import type { ButtonProps } from "dappkit";
import { type Action, actions } from "src/config/actions";
import { chains } from "src/config/chains";
import type { Protocol } from "src/config/protocols";
import { statuses } from "src/config/status";

export type TagTypes = {
  chain: Opportunity["chain"];
  token: Token;
  tokenChain: Token;
  protocol: Protocol;
  action: Action;
  status: Opportunity["status"];
};

export type TagType<T extends keyof TagTypes = keyof TagTypes> = { type: T; value: TagTypes[T] };
export type TagProps<T extends keyof TagTypes> = ButtonProps & { type: T; value: TagTypes[T] };

export default function Tag<T extends keyof TagTypes>({ type, value, ...props }: TagProps<T>) {
  switch (type) {
    case "status": {
      const status = statuses[value as TagTypes["status"]] ?? statuses["LIVE"];

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Status</Text>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} {...status.icon} />
                  <Title h={4}>{status?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              <Text size="xs">{status?.description}</Text>
              <Button to={`/status/${status?.label}`} size="sm" look="bold">
                Open
              </Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} {...status.icon} />
            {status?.label}
          </Button>
        </Dropdown>
      );
    }
    case "chain": {
      const chain = value as TagTypes["chain"];

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Chain</Text>
                  <Text size="xs">id: {chain?.id}</Text>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={chain?.icon} />
                  <Title h={4}>{chain?.name}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              <Button to={`/chain/${chain?.name}`} size="sm" look="bold">
                Open
              </Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={chain?.icon} />
            {chain?.name}
          </Button>
        </Dropdown>
      );
    }
    case "action": {
      const action = actions[value as TagTypes["action"]];

      if (!action) return <Button {...props}>{value}</Button>;

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Action</Text>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} {...action.icon} />
                  <Title h={4}>{action?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              <Text size="xs">{action?.description}</Text>
              <Button to={`/action/${action?.label}`} size="sm" look="bold">
                Open
              </Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} {...action.icon} />
            {action?.label}
          </Button>
        </Dropdown>
      );
    }

    case "token": {
      const token = value as TagTypes["token"];

      if (!token) return <Button {...props}>{value}</Button>;

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Token</Text>
                  <Hash format="short" size="xs">
                    {token.address}
                  </Hash>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={token.icon} />
                  <Title h={4}>{token?.name}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="sm">
                <Button to={`/token/${token?.symbol}`} size="sm" look="bold">
                  {token?.symbol} on Merkl
                </Button>
                <Button size="sm" look="bold">
                  {token?.symbol} on Etherscan
                </Button>
              </Group>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={token.icon} />
            {token?.symbol}
          </Button>
        </Dropdown>
      );
    }

    case "tokenChain": {
      const token = value as TagTypes["tokenChain"];

      if (!token) return <Button {...props}>{value}</Button>;

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Token</Text>
                  <Hash format="short" size="xs">
                    {token.address}
                  </Hash>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={token.logoURI} />
                  <Title h={4}>{token?.name}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="sm">
                <Button to={`/token/${token?.symbol}`} size="sm" look="bold">
                  {token?.symbol} on Merkl
                </Button>
                <Button size="sm" look="bold">
                  {token?.symbol} on Etherscan
                </Button>
              </Group>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={token.chain.icon} />
            {chains[token.chainId]?.label}
          </Button>
        </Dropdown>
      );
    }

    case "protocol": {
      const protocol = value;

      if (!protocol) return <Button {...props}>{value}</Button>;

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Protocol</Text>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={protocol?.icon} />
                  <Title h={4}>{value?.name}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="sm">
                <Button to={`/protocol/${protocol?.name}`} size="sm" look="bold">
                  {protocol?.name} on Merkl
                </Button>
                <Button size="sm" look="bold">
                  {protocol?.name}
                </Button>
              </Group>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={protocol?.icon} />
            {value?.name}
          </Button>
        </Dropdown>
      );
    }
    default:
      return <Button {...props}>{value}</Button>;
  }
}
