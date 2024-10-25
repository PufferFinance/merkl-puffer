import { Group, Title, Button } from "dappkit";

export default function Header() {
    return <header className="flex flex-nowrap justify-between items-center w-full">
    <Group>
      <Title h={3}>ZKSync</Title>
    </Group>
    <Group>
      <Button look="base">Apply</Button>
    </Group>
  </header>
}