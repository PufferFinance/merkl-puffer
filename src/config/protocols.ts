export const protocols = {
  uniswap: {
    label: "Uniswap",
    short: "uni",
    asset: (await import("../assets/protocols/uniswap.svg?url")).default,
  },
  uniswapv2: {
    extends: "uniswap",
    label: "Uniswap V2",
    short: "univ2",
    asset: (await import("../assets/protocols/uniswap.svg?url")).default,
  },
  uniswapv3: {
    extends: "uniswap",
    label: "Uniswap V3",
    short: "univ3",
    asset: (await import("../assets/protocols/uniswap.svg?url")).default,
  },
};

export type Protocol = keyof typeof protocols;

export function getProtocol(labelOrShort: string) {
  for (const [protocol, { label, short }] of Object.entries(protocols)) {
    if (
      label?.replace(" ", "")?.toLowerCase() === labelOrShort?.replace(" ", "")?.toLowerCase() ||
      short?.replace(" ", "")?.toLocaleLowerCase() === labelOrShort?.replace(" ", "")?.toLowerCase()
    )
      return protocol;
  }
}
