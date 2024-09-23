import Group from "../../components/extenders/Group";
import Button from "../../components/primitives/Button";
import Divider from "../../components/primitives/Divider";
import Image from "../../components/primitives/Image";
import Input from "../../components/primitives/Input";
import List from "../../components/primitives/List";
import Text from "../../components/primitives/Text";
import { useWalletContext } from "../../context/Wallet.context";

export default function WalletConnectors() {
  const { config, connect, connector: connected } = useWalletContext();

  return (
    <Group className="flex-col w-full ">
      <List look="bold">
        {config.connectors.map(connector => {
          return (
            <Button
              look={connected?.id === connector.id ? "hype" : undefined}
              onClick={() => connect(connector.id)}
              key={connector.id}>
              <Image className="h-8 w-8 rounded-md" alt={connector.name} src={connector.icon} fallback="WC" />
              {connector.name}
            </Button>
          );
        })}
      </List>
      <Divider horizontal className="border-main-6" />
      <Text>Spy</Text>
      <Input size="sm" placeholder="Address" />
    </Group>
  );
}
