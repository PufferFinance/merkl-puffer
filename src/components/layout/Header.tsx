import {
  Button,
  Group,
  Icon,
  Container,
  WalletButton,
  useTheme,
  Dropdown,
} from "dappkit";
import SearchBar from "../element/functions/SearchBar";
import customerDarkLogo from "src/customer/images/customer-dark-logo.svg";
import customerLogo from "src/customer/images/customer-logo.svg";
import { Image } from "dappkit";

import { motion } from "framer-motion";
import config from "merkl.config";
import { LayerMenu } from "./LayerMenu";
import { useState } from "react";
import SCREENS from "../../../packages/dappkit/src/constants/SCREENS.json";
import { useMediaQuery } from "react-responsive";

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
      className="w-full fixed top-0 z-0 backdrop-blur"
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
              {!mdScreens && (
                <>
                  {Object.entries(config.routes)
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

                  <SearchBar />
                </>
              )}
              <Button look="base" onClick={toggleMode}>
                <Icon
                  size="sm"
                  remix={mode === "dark" ? "RiMoonClearLine" : "RiSunLine"}
                />
              </Button>
              <WalletButton />
            </Group>
          </motion.div>
        </Group>
      </Container>
    </motion.header>
  );
}
