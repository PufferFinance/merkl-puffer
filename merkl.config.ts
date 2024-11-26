import { createColoring } from "dappkit";
import { createConfig } from "src/config/type";
import { http } from "viem";
import { mainnet, optimism, rootstock, bsc, gnosis, thunderCore, fuse, polygon, manta, xLayer, fantom, fraxtal, filecoin, zksync, worldchain, astar, polygonZkEvm, coreDao, moonbeam, sei, astarZkEVM, mantle, base, immutableZkEvm, mode, arbitrum, avalanche, linea, bob, blast, taiko, scroll } from "viem/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export default createConfig({
  appName: "Merkl",
  wagmi: {
    chains: [mainnet, optimism, rootstock, bsc, gnosis, thunderCore, fuse, polygon, manta, xLayer, fantom, fraxtal, filecoin, zksync, worldchain, astar, polygonZkEvm, coreDao, moonbeam, sei, astarZkEVM, mantle, base, immutableZkEvm, mode, arbitrum, avalanche, linea, bob, blast, taiko, scroll],
    connectors: [
      coinbaseWallet(),
      walletConnect({
        customStoragePrefix: "wagmi",
        projectId: "26c912aadd2132cd869a5edc00aeea0f",
        metadata: {
          name: "Merkl Lite",
          description: "Merkl Lite",
          url: "https://app.merkl.xyz.com",
          icons: [],
        },
      }),
    ],
    transports: {
      [zksync.id]: http(),
      [optimism.id]: http(),
    },
  },
  defaultTheme: "merkl",
  themes: {
    merkl: {
      base: createColoring(["#1F2333", "#B8AAFD", "#131620"], ["#FCF8F5", "#B8AAFD", "white"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131620"], ["#FFFFFF", "#40B66B", "white"]),
    },
  },
  sizing: {
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 },
    radius: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 },
  }
});




