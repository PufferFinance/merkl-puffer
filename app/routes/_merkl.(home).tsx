import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { type Coloring, Container, createColoring } from "dappkit";
import Heading from "src/components/composite/Heading";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    coinbaseWallet(),
    walletConnect({
      customStoragePrefix: "wagmi",
      projectId: "26c912aadd2132cd869a5edc00aeea0f",
      metadata: {
        name: "Example",
        description: "Example website",
        url: "https://example.com",
        icons: [],
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const testThemes: { [name: string]: Coloring } = {
  uniswap: createColoring(["#131313", "#FC72FF", "#131313"], ["#FFFFFF", "#FC72FF", "white"]),
  "1inch": createColoring(["#131823", "#172A45", "#131823"], ["#FFFFFF", "#DDECFE", "white"]),
  kiln: createColoring(["#000000", "#FF6521", "black"], ["#FFFFFF", "#FF6521", "white"]),
  avocado: createColoring(["#0E121C", "#07A65D", "#0E121C"], ["#FFFFFF", "#07A65D", "white"]),
  pancakeswap: createColoring(["#27262C", "#1FC7D4", "#27262C"], ["#FFFFFF", "#1FC7D4", "white"]),
  optimism: createColoring(["#000000", "#FF0420", "black"], ["#FBFCFE", "#FF0420", "white"]),
};

export default function Index() {
  return (
    <Container>
      <Heading
        icons={[{ remix: "RiSparklingLine" }]}
        // navigation={{ label: "Back to opportunities", link: "/" }}
        title={"All Opportunities"}
        description={"Lorem ipsum something cool"}
        tabs={[
          { label: "Opportunities", link: "/" },
          { label: "Leaderboard", link: "/leaderboard" },
          { label: "Analytics", link: "/analytics" },
        ]}>
        <Outlet />
      </Heading>
    </Container>
  );
}
