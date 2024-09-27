export const actions = {
  pool: {
    label: "Liquidity",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/pool.svg?url")).default,
  },
  drop: {
    label: "Airdrop",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/drop.svg?url")).default,
  },
  borrow: {
    label: "Borrow",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/borrow.svg?url")).default,
  },
  lend: {
    label: "Lend",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/lend.svg?url")).default,
  },
  hold: {
    label: "Hold",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/hold.svg?url")).default,
  },
};

export type Action = keyof typeof actions;
