import { createTable } from "dappkit";

export const [ClaimRewardsChainTable, ClaimRewardsChainRow, claimRewardsChainColumns] = createTable({
  chain: {
    name: "CHAIN",
    size: "minmax(180px,1fr)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  unclaimed: {
    name: "UNCLAIMED",
    size: "minmax(100px,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-end",
  },
  claimed: {
    name: "CLAIMED",
    size: "minmax(100px,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-end",
  },
});
