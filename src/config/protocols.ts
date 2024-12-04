export const protocols: {
  [protocol: string]: { extends?: string; tags?: string[]; label: string; short: string; asset?: string };
} = {
  uniswap: {
    label: "Uniswap",
    short: "uni",
    tags: ["DEX"],
    asset: (await import("../assets/protocols/uniswap.svg?url")).default,
  },
  uniswapv2: {
    extends: "uniswap",
    label: "Uniswap V2",
    short: "univ2",
  },
  uniswapv3: {
    extends: "uniswap",
    label: "Uniswap V3",
    short: "univ3",
  },
} as const;

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

export function getProtocolInfo(labelOrShort: string): (typeof protocols)[Protocol] | undefined {
  const protocol = getProtocol(labelOrShort);

  if (!protocol) return;

  if (protocols[protocol]?.extends)
    return Object.assign({}, protocols[protocols[protocol]?.extends], protocols[protocol]);
  return protocols[protocol];
}
