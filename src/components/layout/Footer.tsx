import { Button, Divider, Group, Icon, Text } from "dappkit/src";
import Container from "packages/dappkit/src/components/layout/Container";

export default function Footer() {
  return (
    <Container>
      <Divider horizontal className="border-main-4" />
      <footer className="flex flex-nowrap justify-between  items-center w-full pt-md">
        <Group>
          <Text size="xs">©2024 Angle Labs Inc. All rights reserved.</Text>
        </Group>
        <Group>
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
      </footer>
    </Container>
  );
}
