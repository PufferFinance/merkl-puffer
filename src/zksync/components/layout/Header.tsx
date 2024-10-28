import { Group, Button } from "dappkit";
import zksyncLogo from "../../../assets/images/zksync-logo.svg";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import Container from "packages/dappkit/src/components/layout/Container";

export default function Header() {
  return (
    <header className="bg-main-6 w-full">
      <Container className="py-xl">
        <Group className="justify-between">
          <Button to="/" look="text">
            <Image className="w-[165px]" alt="zkSync logo" src={zksyncLogo} />
          </Button>

          <Group>
            <Button look="base" to="/faq">
              FAQ
            </Button>
            <Button look="tint" to="/app">
              Protocol Application
            </Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
