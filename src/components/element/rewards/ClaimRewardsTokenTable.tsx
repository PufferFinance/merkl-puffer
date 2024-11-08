import { createTable } from "dappkit";

export const [ClaimRewardsTokenTable, ClaimRewardsTokenRow, claimRewardsTokenColumns] = createTable({
  token: {
    name: "TOKEN",
    size: "minmax(100px,200px)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  amount: {
    name: "AMOUNT",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,200px)",
    className: "justify-center",
  },
  claim: {
    name: "",
    size: "minmax(150px,1fr)",
    compactSize: "minmax(min-content,1fr)",
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
