import type { Themes, sizeScale } from "dappkit";
import { createConfig as createWagmiConfig } from "wagmi";

export type MerklConfig<T extends Themes> = {
  themes: T;
  sizing: {
    spacing: { [Size in (typeof sizeScale)[number]]: number };
    radius: { [Size in (typeof sizeScale)[number]]: number };
  };
  defaultTheme: keyof T;
  wagmi: Parameters<typeof createWagmiConfig>["0"];
  appName: string;
  routes: {
    [key: string]: string;
  };
  socials: {
    [key: string]: string;
  };
  links: {
    [key: string]: string;
  };
};

export function createConfig<T extends Themes>({
  wagmi,
  ...config
}: MerklConfig<T>) {
  const wagmiConfig = createWagmiConfig(wagmi);

  return { wagmi: wagmiConfig, ...config };
}
