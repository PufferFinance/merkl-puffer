import { Group, Button } from "dappkit";
import zksyncLogo from "../../../assets/images/zksync-logo.svg";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import Container from "packages/dappkit/src/components/layout/Container";

export default function Header() {
  return (
    <header className="w-full">
      <Container className="py-xl">
        <Group className="justify-between">
          <Button to="/" look="text">
            <Image className="w-[165px]" alt="zkSync logo" src={zksyncLogo} />
          </Button>

          <Group className="gap-xl*2">
            <Button look="text" to="/faq" className="text-accent-9">
              FAQ
            </Button>
            <Button look="primary" to="/app" size="xl">
              You're a protocol?
            </Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
