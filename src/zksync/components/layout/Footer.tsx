import {Group, Divider, Icon, Text, Button, Page} from "dappkit";

export default function Footer() {
  return (
    <Page>
      <Divider horizontal className="border-main-4" />
      <footer className="flex flex-nowrap justify-between  items-center w-full pt-md">
        <Group>
          <Text size="xs">ZKSync</Text>
          <Button size="xs">
            <Icon size="xs" remix="Ri4kFill" /> Discord
          </Button>
          <Button size="xs">
            <Icon size="xs" remix="Ri4kFill" /> X / Twitter
          </Button>
          <Button size="xs">
            <Icon size="xs" remix="Ri4kFill" /> Github
          </Button>
        </Group>
        <Group>
          <Text size="xs">Powered by Merkl</Text>
        </Group>
      </footer>
    </Page>
  );
}
