import { createTable } from "dappkit";

export const [TokenTable, TokenRow, tokenColumns] = createTable({
  token: {
    name: "TOKEN",
    size: "minmax(350px,1fr)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  price: {
    name: "PRICE",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-end",
  },
});
