import {
  Button,
  Group,
  Icon,
  Container,
  WalletButton,
  useTheme,
} from "dappkit";
import SearchBar from "../element/functions/SearchBar";
import customerLogo from "src/customer/images/customer-logo.svg";
import Image from "../../../packages/dappkit/src/components/primitives/Image";
import config from "merkl.config";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
  },
};

export default function Header() {
  const { mode, toggleMode } = useTheme();

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="w-full fixed top-0 z-20 backdrop-blur"
    >
      <Container className="py-xl">
        <Group className="justify-between items-center">
          <motion.div variants={item}>
            <Button to="/" look="text">
              <Image
                className="w-[160px] md:w-[200px]"
                alt="--CLIENT-- logo"
                src={customerLogo}
              />
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Group className="gap-xl">
              <Group className="md:justify-end items-center gap-xl">
                <Group>
                  <Button
                    className="dim !rounded-full !p-md !text-main-12 hover:bg-transparent bg-transparent"
                    external
                    to={config.link.x}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTwitterXFill"
                    />
                  </Button>
                  <Button
                    className="dim !rounded-full !p-md !text-main-12 hover:bg-transparent bg-transparent"
                    external
                    to={config.link.telegram}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTelegram2Fill"
                    />
                  </Button>
                </Group>
              </Group>

              <Button size="md" onClick={toggleMode}>
                <Icon
                  size="sm"
                  remix={mode === "dark" ? "RiMoonClearFill" : "RiSunFill"}
                />
              </Button>
              <SearchBar />
              <WalletButton look="hype">Connect</WalletButton>
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
