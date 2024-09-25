import Dropdown from "dappkit/components/extenders/Dropdown";
import Group from "dappkit/components/extenders/Group";
import Button, { ButtonProps } from "dappkit/components/primitives/Button";
import Divider from "dappkit/components/primitives/Divider";
import Hash from "dappkit/components/primitives/Hash";
import Icon from "dappkit/components/primitives/Icon";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Token } from "src/api/fetch/fetchTokens";
import { Action, actions } from "src/config/actions";
import { ChainId, chains } from "src/config/chains";
import { getProtocol, getProtocolInfo, Protocol, protocols } from "src/config/protocols";

export type TagTypes = {
  chain: ChainId;
  token: Token;
  protocol: Protocol;
  action: Action;
};

export type TagProps<T extends keyof TagTypes> = ButtonProps & { type: T; value: TagTypes[T] };

export default function Tag<T extends keyof TagTypes>({ type, value, ...props }: TagProps<T>) {
  switch (type) {
    case "chain": {
      const chain = chains[value as TagTypes["chain"]];

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Chain</Text>
                  <Text size="xs">id: {value}</Text>
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} chain={value} />
                  <Title h={4}>{chain?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              <Button to={`/chain/${chain?.label}`} size="sm" look="bold">
                Open
              </Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} chain={value} />
            {chain?.label}
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
                  <Icon size={props?.size} action={value} />
                  <Title h={4}>{action?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              <Text size="xs">{action?.description}</Text>
              <Button size="sm" look="bold">
                Open
              </Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} action={value} />
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
                  <Icon size={props?.size} src={token.logoURI} />
                  <Title h={4}>{token?.name}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="sm">
                <Button size="sm" look="bold">
                  {token?.symbol} on Merkl
                </Button>
                <Button size="sm" look="bold">
                  {token?.symbol} on Etherscan
                </Button>
              </Group>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={token.logoURI} />
            {token?.symbol}
          </Button>
        </Dropdown>
      );
    }

    case "protocol": {
      const protocol = getProtocolInfo(value as string)

      if (!protocol) return <Button {...props}>{value}</Button>

      return (
        <Dropdown
          content={
            <>
              <Group size="xs" className="flex-col">
                <Group className="justify-between">
                  <Text size="xs">Protocol</Text>
                  {/* <Hash format="short" size="xs">
                    {protocol?.label}
                  </Hash> */}
                </Group>
                <Group size="sm">
                  <Icon size={props?.size} src={protocol?.asset} />
                  <Title h={4}>{protocol?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal />
              {/* <Text size="xs">{token?.description}</Text> */}
              <Group className="flex-col" size="sm">
                <Button size="sm" look="bold">
                  {protocol?.label} on Merkl
                </Button>
                <Button size="sm" look="bold">
                  {protocol?.label} on Etherscan
                </Button>
              </Group>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} src={protocol?.asset} />
            {protocol?.label}
          </Button>
        </Dropdown>
      );
    }
    default:
      return <Button {...props}>{value}</Button>;
  }
}
