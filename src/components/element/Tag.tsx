import Dropdown from "dappkit/components/extenders/Dropdown";
import Group from "dappkit/components/extenders/Group";
import Button, { ButtonProps } from "dappkit/components/primitives/Button";
import Divider from "dappkit/components/primitives/Divider";
import Icon from "dappkit/components/primitives/Icon";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { actions } from "src/config/actions";
import { ChainId, chains } from "src/config/chains";

export type TabTypes = {
  chain: ChainId;
  token: string;
  action: string;
};

export type TagProps<T extends keyof TabTypes> = ButtonProps & { type: T; value: TabTypes[T] };

export default function Tag<T extends keyof TabTypes>({ type, value, ...props }: TagProps<T>) {
  switch (type) {
    case "chain":
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
                  <Title h={4}>{chains[value]?.label}</Title>
                </Group>
              </Group>
              <Divider className="border-main-6" horizontal></Divider>
              <Button size='sm' look="bold">Open</Button>
            </>
          }>
          <Button key={value} {...props}>
            <Icon size={props?.size} chain={value} />
            {chains[value]?.label}
          </Button>
        </Dropdown>
      );
      case "action":
        const action = actions[value];

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
                <Divider className="border-main-6" horizontal></Divider>
                <Text size="xs">{action?.description}</Text>
                <Button size='sm' look="bold">Open</Button>
              </>
            }>
            <Button key={value} {...props}>
              <Icon size={props?.size} action={value} />
              {action?.label}
            </Button>
          </Dropdown>
        );
    default:
      return <Button {...props}>{value}</Button>;
  }
}
