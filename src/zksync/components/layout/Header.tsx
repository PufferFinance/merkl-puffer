import { Group, Button, Text, Container } from "dappkit";
import zksyncLogoMob from "../../../assets/images/zksync-logo-mob.svg";
import zksyncLogo from "../../../assets/images/zksync-logo.svg";
import Image from "../../../../packages/dappkit/src/components/primitives/Image";
import SCREENS from "../../../../packages/dappkit/src/constants/SCREENS.json";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const isScreenSmall = useMediaQuery({ maxWidth: SCREENS.lg });

  return (
    <header className="w-full">
      <Container className="py-xl">
        <Group className="justify-between">
          <Button to="/" look="text">
            {isScreenSmall ? (
              <Image
                className="w-[50px]"
                alt="zkSync logo"
                src={zksyncLogoMob}
              />
            ) : (
              <Image className="w-[165px]" alt="zkSync logo" src={zksyncLogo} />
            )}
          </Button>

          <Group className="gap-xl*2">
            <Button look="text" to="/faq" className="text-accent-9">
              <Text size={5} className="!text-accent-11">
                FAQ
              </Text>
            </Button>
            <Button
              className="!p-lg !rounded-full transition-all duration-300 bg-accent-11 text-accent-1 hover:bg-accent-12 hover:text-main-1 active:bg-main-3 focus-visible:border-main-9"
              to="/app"
            >
              You're a protocol?
            </Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
