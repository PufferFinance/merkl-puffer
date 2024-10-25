import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Button, Group, Input, Text, Title } from "dappkit";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <Group className="flex-col">
      <Group className="flex-col self-center">
        <Title h={1}>ZKSync Ignite</Title>
        <Text>Powered by Merkl</Text>
        <Group>
          <Input look="bold" placeholder="Enter..." />
          <Button>Submit</Button>
        </Group>
      </Group>
    </Group>
  );
}
