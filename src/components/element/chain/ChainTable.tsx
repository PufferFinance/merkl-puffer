import { createTable } from "dappkit";

export const [ChainTable, ChainRow, chainColumns] = createTable({
  chain: {
    name: "CHAIN",
    size: "minmax(350px,1fr)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
});
