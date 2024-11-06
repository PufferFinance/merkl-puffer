import type { Opportunity } from "@angleprotocol/merkl-api";
import type { Themes } from "dappkit";
import { http, createConfig as createWagmiConfig } from "wagmi";

export function getCampaignType(labelOrShort: string): Opportunity["type"] | undefined {
  //TODO
}

export type MerklConfig<T extends Themes> = {
  themes: T;
  defaultTheme: keyof T;
  wagmi: Parameters<typeof createWagmiConfig>["0"],
  appName: string,
};

export function createConfig<T extends Themes>({wagmi, ...config}: MerklConfig<T>) {
  const wagmiConfig = createWagmiConfig(wagmi)

  return { wagmi: wagmiConfig, ...config };
}
