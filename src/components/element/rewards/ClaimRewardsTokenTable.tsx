import { createTable } from "dappkit";

export const [ClaimRewardsTokenTable, ClaimRewardsTokenRow, claimRewardsTokenColumns] = createTable({
  token: {
    name: "TOKEN",
    size: "minmax(100px,1fr)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  pending: {
    name: "PENDING",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,200px)",
    className: "justify-end",
  },
  amount: {
    name: "UNCLAIMED",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,200px)",
    className: "justify-end",
  },
  claimed: {
    name: "CLAIMED",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,200px)",
    className: "justify-end",
  },
});

export type Rewards = {
  [chain: number]: {
    claimed: number;
    unclaimed: number;
    tokens: {
      [address: string]: {
        symbol: string;
        amount: number;
        price: number;
      };
    };
  };
};
