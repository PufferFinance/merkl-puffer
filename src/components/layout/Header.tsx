import WalletButton from "dappkit/components/dapp/WalletButton";
import Group from "dappkit/components/extenders/Group";
import Icon from "dappkit/components/primitives/Icon";
import Title from "dappkit/components/primitives/Title";
import { useTheme } from "dappkit/context/Theme.context";
import { Button } from "dappkit/index";
import SearchBar from "../element/functions/SearchBar";

export default function Header() {
  const { mode, toggleMode } = useTheme();

  return (
    <header className="flex flex-nowrap justify-center items-center w-full">
      <Group>
        <Title h={3}>Merkl (Lite)</Title>
      </Group>
      <Group className="grow flex justify-center"></Group>
      <Group>
        <Button size="md" onClick={toggleMode}>
          <Icon size="sm" remix={mode === "dark" ? "RiMoonClearFill" : "RiSunFill"} />
        </Button>
        <SearchBar />
        <WalletButton look="hype">Connect</WalletButton>
      </Group>
    </header>
  );
}
