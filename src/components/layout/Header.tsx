import { Button, Group, Icon, Title, WalletButton, useTheme } from "dappkit";
import SearchBar from "../element/functions/SearchBar";

export default function Header() {
  const { mode, toggleMode } = useTheme();

  return (
    <header className="flex flex-nowrap justify-between items-center w-full">
      <Group>
        <Title h={3}>Merkl (Lite)</Title>
      </Group>
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
