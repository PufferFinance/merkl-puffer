import { createColoring } from "dappkit";
import { createConfig } from "src/config/type";
import { http } from "viem";
import { optimism } from "viem/chains";
import { zksync } from "viem/zksync";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export default createConfig({
  appName: "Merkl",
  wagmi: {
    chains: [zksync, optimism],
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
    uniswap: {
      base: createColoring(["#131313", "#FC72FF", "#131313"], ["#FFFFFF", "#FC72FF", "white"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "#131313"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "#131313"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "#131313"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "#131313"], ["#FFFFFF", "#40B66B", "white"]),
    },
    "1inch": {
      base: createColoring(["#131823", "#172A45", "black"], ["#FFFFFF", "#FC72FF", "white"]),
      info: createColoring(["#2ABDFF", "#2ABDFF", "black"], ["#FFFFFF", "#40B66B", "white"]),
      good: createColoring(["#40B66B", "#40B66B", "black"], ["#FFFFFF", "#40B66B", "white"]),
      warn: createColoring(["#ff9600", "#ff9600", "black"], ["#FFFFFF", "#40B66B", "white"]),
      harm: createColoring(["#d22e14", "#d22e14", "black"], ["#FFFFFF", "#40B66B", "white"]),
    },
  },
});
