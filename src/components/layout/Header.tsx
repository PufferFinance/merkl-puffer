import {
  Button,
  Container,
  Dropdown,
  Group,
  Icon,
  WalletButton,
  useTheme,
} from "dappkit";
import { Image } from "dappkit";
import customerDarkLogo from "src/customer/assets/images/customer-dark-logo.svg";
import customerLogo from "src/customer/assets/images/customer-logo.svg";
import SearchBar from "../element/functions/SearchBar";

import { motion } from "framer-motion";
import config from "merkl.config";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SCREENS from "../../../packages/dappkit/src/constants/SCREENS.json";
import { LayerMenu } from "./LayerMenu";

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
  const [open, setOpen] = useState<boolean>(false);
  const mdScreens = useMediaQuery({ maxWidth: SCREENS.lg });

  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="visible"
      className="w-full sticky left-0 top-0 z-0 backdrop-blur"
    >
      <Container className="py-xl">
        <Group className="justify-between items-center">
          <motion.div variants={item}>
            {mdScreens ? (
              <Dropdown
                open={open}
                content={<LayerMenu nav={config.routes} setOpen={setOpen} />}
                className="flex gap-sm md:gap-lg items-center"
              >
                <Image
                  className="w-[140px] md:w-[200px]"
                  alt={`${config.appName} logo`}
                  src={mode !== "dark" ? customerDarkLogo : customerLogo}
                />
                <Icon
                  size="lg"
                  className="text-main-12"
                  remix="RiArrowDownSLine"
                />
              </Dropdown>
            ) : (
              <Button to={config.routes.homepage.route} look="soft">
                <Image
                  className="w-[200px]"
                  alt={`${config.appName} logo`}
                  src={mode !== "dark" ? customerDarkLogo : customerLogo}
                />
              </Button>
            )}
          </motion.div>

          <motion.div variants={item}>
            <Group className="gap-xl items-center">
              {!mdScreens &&
                Object.entries(config.routes)
                  .filter(
                    ([key]) => !["homepage", "privacy", "terms"].includes(key)
                  )
                  .map(([key, { route }]) => {
                    return (
                      <Button
                        look="soft"
                        size="lg"
                        key={`${key}-link`}
                        to={route}
                      >
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
              {!mdScreens && <SearchBar />}
              <WalletButton />
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
