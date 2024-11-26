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

import { motion } from "framer-motion";
import config from "merkl.config";

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
            <Button to="/" look="soft">
              <Image
                className="w-[160px] md:w-[200px]"
                alt="--CLIENT-- logo"
                src={customerLogo}
              />
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Group className="gap-xl items-center">
              {Object.entries(config.routes).map(([key, value]) => {
                return (
                  <Button look="soft" size="lg" key={`${key}-link`} to={value}>
                    {key}
                  </Button>
                );
              })}
              <Button look="base" onClick={toggleMode}>
                <Icon
                  size="sm"
                  remix={mode === "dark" ? "RiMoonClearLine" : "RiSunLine"}
                />
              </Button>
              <SearchBar />
              <WalletButton />
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
