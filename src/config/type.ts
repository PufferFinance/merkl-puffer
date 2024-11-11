import type { Themes } from "dappkit";
import { createConfig as createWagmiConfig } from "wagmi";

export type MerklConfig<T extends Themes> = {
  themes: T;
  defaultTheme: keyof T;
  wagmi: Parameters<typeof createWagmiConfig>["0"];
  appName: string;
};

export function createConfig<T extends Themes>({ wagmi, ...config }: MerklConfig<T>) {
  const wagmiConfig = createWagmiConfig(wagmi);

  return { wagmi: wagmiConfig, ...config };
}
