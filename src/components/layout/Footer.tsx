import { Container, useTheme } from "dappkit";
import { Button, Group, Text } from "dappkit/src";
import Image from "../../../packages/dappkit/src/components/primitives/Image";
import config from "merkl.config";
import merklDarkLogo from "src/assets/images/by-merkl-dark.svg";
import merklLogo from "src/assets/images/by-merkl.svg";
import customerDarkLogo from "src/customer/images/customer-dark-logo.svg";
import customerLogo from "src/customer/images/customer-logo.svg";
import Socials from "../element/Socials";

export default function Footer() {
  const { mode } = useTheme();

  return (
    <footer className="relative backdrop-blur py-lg lg:py-xl flex flex-nowrap justify-between items-center w-full">
      <Container className="relative z-10">
        <Group className="justify-between gap-xl*2">
          <Group className="gap-xl*2 lg:ml-xl*2 items-center">
            <Button to="/" look="soft" className="hidden md:flex">
              <Image
                className="w-[125px] lg:w-[165px]"
                alt="--CLIENT-- logo"
                src={mode !== "dark" ? customerDarkLogo : customerLogo}
              />
            </Button>
            <Socials />
          </Group>
          <Group className="items-center gap-xl*2">
            <Group className="items-center">
              <Text size="sm" className="text-main-11">
                ©{new Date().getFullYear()} Merkl. All rights reserved.
              </Text>

              <Button
                look="soft"
                className="capitalize"
                size="sm"
                to={config.routes.terms.route}
              >
                Terms
              </Button>
              <Button
                look="soft"
                className="capitalize"
                size="sm"
                to={config.routes.privacy.route}
              >
                Privacy
              </Button>
            </Group>

            <Button to={config.links.merkl} external look="soft">
              <Image
                className="w-[130px]"
                alt="Merkl Footer logo"
                src={mode !== "dark" ? merklDarkLogo : merklLogo}
              />
            </Button>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
