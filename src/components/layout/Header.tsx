import WalletButton from "dappkit/components/dapp/WalletButton";
import Group from "dappkit/components/extenders/Group";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import Title from "dappkit/components/primitives/Title";
import { useTheme } from "dappkit/context/Theme.context";
import { Button } from "dappkit/index";

export default function Header() {
  const { mode, toggleMode } = useTheme();

  return (
    <header className="flex flex-nowrap justify-center items-center w-full">
      <Group>
        <Title h={3}>Merkl</Title>
      </Group>
      <Group className="grow flex justify-center">
        <Input look="base" placeholder="Search Merkl" />
      </Group>
      <Group>
        <Button size="md" onClick={toggleMode}>
          <Icon size="sm" remix={mode === "dark" ? "RiMoonClearFill" : "RiSunFill"} />
        </Button>
        <WalletButton look="hype">Connect</WalletButton>
      </Group>
    </header>
  );
}
