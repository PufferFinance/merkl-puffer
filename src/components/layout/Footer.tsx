import { Container } from "dappkit";
import { Button, Group } from "dappkit/src";
import Image from "../../../packages/dappkit/src/components/primitives/Image";
import config from "merkl.config";
import merklLogo from "src/assets/images/by-merkl.svg";
import customerLogo from "src/customer/images/customer-logo.svg";
import Socials from "../element/Socials";

export default function Footer() {
  return (
    <footer className="relative backdrop-blur py-lg lg:py-xl flex flex-nowrap justify-between items-center w-full">
      <Container className="relative z-10">
        <Group className="justify-between gap-xl*2">
          <Group className="gap-xl*2 lg:ml-xl*2 items-center">
            <Button to="/" look="soft" className="hidden md:flex">
              <Image
                className="w-[125px] lg:w-[165px]"
                alt="--CLIENT-- logo"
                src={customerLogo}
              />
            </Button>
            <Socials />
          </Group>
          <Group className="items-center gap-xl*2">
            <Group className="items-center gap-xl">
              {Object.entries(config.routes).map(([key, value]) => {
                return (
                  <Button look="soft" size="lg" key={`${key}-link`} to={value}>
                    {key}
                  </Button>
                );
              })}
            </Group>
            <Button to={config.links.merkl} external look="soft">
              <Image
                className="w-[130px]"
                alt="Merkl Footer logo"
                src={merklLogo}
              />
            </Button>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
