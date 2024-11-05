import { Button, Group, Title } from "dappkit";

export default function Header() {
  return (
    <header className="flex flex-nowrap justify-center items-center w-full">
      <Group>
        <Title h={3}>ZKSync</Title>
      </Group>
      <Group>
        <Button look="base">Apply</Button>
      </Group>
    </header>
  );
}
