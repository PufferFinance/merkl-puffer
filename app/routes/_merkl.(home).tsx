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
