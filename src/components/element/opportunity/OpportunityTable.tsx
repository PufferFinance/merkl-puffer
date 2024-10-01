import { createTable } from "dappkit/components/primitives/Table";
import Text from "dappkit/components/primitives/Text";

export const [OpportunityTable, OpportunityRow] = createTable({
  opportunity: [
    "OPPORTUNITY",
    "minmax(250px,1fr)",
    "justify-start",
  ],
  apr: [
    "APR",
    "minmax(min-content,150px)",
    "justify-center",
  ],
  tvl: [
    "TVL",
    "minmax(min-content,150px)",
    "justify-center",
  ],
  rewards: [
    "DAILY REWARDS",
    "minmax(min-content,150px)",
    "justify-center",
  ],
});
