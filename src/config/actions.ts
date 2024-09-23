export const actions = {
  pool: {
    label: "Liquidity",
    description: "Earn rewards by depositiong liquidity in this pool.",
    asset: (await import("../assets/actions/pool.svg?url")).default,
  },
};

export type Action = keyof typeof actions;