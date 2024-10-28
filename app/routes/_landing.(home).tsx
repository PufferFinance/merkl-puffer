import type { MetaFunction } from "@remix-run/node";
import { Button, Group, Icon, Input, Text, Title } from "dappkit";
import { EXT } from "src/constants/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <section className="hero my-xl*4">
        <Group className="relative mb-xl*2 justify-end">
          <Title h={1}>ZKSync Ignite</Title>
          <Text className="absolute right-0 -bottom-5">Powered by Merkl</Text>
        </Group>
        <Group className="my-md*4">
          <Input look="bold" placeholder="Enter your email for updates" />
          <Button>Subscribe</Button>
        </Group>
        <Group className="justify-end">
          <Title h={5}>Follow us on</Title>
          <Button look="base" external to={EXT.x}>
            <Icon className="w-lg*2 lg:w-xl*2" remix="RiTwitterXFill" />
          </Button>
          <Button look="base" external to={EXT.telegram}>
            <Icon className="w-lg*2 lg:w-xl*2" remix="RiTelegram2Fill" />
          </Button>
        </Group>
      </section>
    </>
  );
}
