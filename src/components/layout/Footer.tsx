import WalletButton from "dappkit/components/dapp/WalletButton";
import Group from "dappkit/components/extenders/Group";
import Divider from "dappkit/components/primitives/Divider";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import Title from "dappkit/components/primitives/Title";
import { useTheme } from "dappkit/context/Theme.context";
import { Button } from "dappkit/index";
import Page from "../composite/layout/Page";
import Text from "dappkit/components/primitives/Text";

export default function Footer() {
  return (
    <Page>
      <Divider horizontal className="border-main-4" />
      <footer className="flex flex-nowrap justify-between  items-center w-full pt-md">
        <Group>
          <Text size="xs">©2024 Angle Labs Inc. All rights reserved.</Text>
        </Group>
        <Group>
          <Button size="xs"><Icon size="xs" remix="Ri4kFill"/> Discord</Button>
          <Button size="xs"><Icon size="xs" remix="Ri4kFill"/> X / Twitter</Button>
          <Button size="xs"><Icon size="xs" remix="Ri4kFill"/> Github</Button>
        </Group>
      </footer>
    </Page>
  );
}
