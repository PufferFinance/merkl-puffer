import { Container } from "dappkit";
import { Button, Group, Icon } from "dappkit/src";
import Image from "../../../packages/dappkit/src/components/primitives/Image";
import config from "merkl.config";
import merklLogo from "src/assets/images/by-merkl.svg";
import customerLogo from "src/customer/images/customer-logo.svg";

export default function Footer() {
  return (
    <footer className="relative backdrop-blur py-lg lg:py-xl flex flex-nowrap justify-between items-center w-full">
      <Container className="relative z-10">
        <Group className="justify-between">
          <Button to="/" look="text" className="hidden md:flex">
            <Image
              className="w-[125px] lg:w-[165px]"
              alt="--CLIENT-- logo"
              src={customerLogo}
            />
          </Button>

          <Group className="gap-xl lg:ml-xl*2 items-center">
            <Button look="text" external to={config.link.x}>
              <Icon className="w-lg*2 lg:w-xl*2" remix="RiTwitterXFill" />
            </Button>
            <Button look="text" external to={config.link.telegram}>
              <Icon className="w-lg*2 lg:w-xl*2" remix="RiTelegram2Fill" />
            </Button>
          </Group>

          <Button to={config.link.merkl} external look="text">
            <Image
              className="w-[130px]"
              alt="Merkl Footer logo"
              src={merklLogo}
            />
          </Button>
        </Group>
      </Container>
    </footer>
  );
}
