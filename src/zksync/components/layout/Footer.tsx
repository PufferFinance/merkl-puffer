import { Group, Icon, Button, Container } from "dappkit";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import zksyncLogo from "../../../assets/images/zksync-logo.svg";
import merklFooter from "../../../assets/images/merkl-footer.svg";
import { link } from "src/constants/link";

export default function Footer() {
  return (
    <footer className="border-t-1 py-lg lg:py-lg*2 border-main-8 flex flex-nowrap justify-between items-center w-full">
      <Container>
        <Group className="justify-between">
          <Group size="xl">
            <Button to="/" look="text">
              <Image
                className="hidden md:block w-[125px] lg:w-[165px]"
                alt="zkSync logo"
                src={zksyncLogo}
              />
            </Button>
            <Group className="gap-xl lg:ml-xl*2">
              <Button look="text" external to={link.x}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiTwitterXFill" />
              </Button>
              <Button look="text" external to={link.discord}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiDiscordFill" />
              </Button>
              <Button look="text" external to={link.github}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiGithubFill" />
              </Button>
              <Button look="text" external to={link.telegram}>
                <Icon className="w-lg*2 lg:w-xl*2" remix="RiTelegram2Fill" />
              </Button>
            </Group>
          </Group>

          <Button to={link.merkl} external look="text">
            <Image
              className="w-[165px] lg:w-[215px]"
              alt="Merkl Footer logo"
              src={merklFooter}
            />
          </Button>
        </Group>
      </Container>
    </footer>
  );
}
