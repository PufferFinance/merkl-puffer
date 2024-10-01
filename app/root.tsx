import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./tailwind.css";
import Group from "dappkit/components/extenders/Group";
import { DAppProvider } from "dappkit/context/Dapp.context";
import Header from "src/components/layout/Header";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import styles from "./tailwind.css?url";
import Footer from "src/components/layout/Footer";

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

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: styles,
    as: "style",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <DAppProvider config={config}>
      <Group size="xl" className="bg-main-1 min-h-[100vh] via-main-1 via-[15em] from-main-3 to-main-1 p-md flex-col">
        <Header />
        <div className="grow h-full">
          <Outlet />
        </div>
        <Footer />
      </Group>
    </DAppProvider>
  );
}
