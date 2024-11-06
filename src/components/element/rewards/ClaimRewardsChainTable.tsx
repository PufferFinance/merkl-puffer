import { createTable } from "dappkit";

export const [ClaimRewardsChainTable, ClaimRewardsChainRow, claimRewardsChainColumns] = createTable({
  chain: {
    name: "CHAIN",
    size: "minmax(350px,1fr)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  unclaimed: {
    name: "UNCLAIMED",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-center",
  },
  claimed: {
    name: "CLAIMED",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-end",
  },
});
