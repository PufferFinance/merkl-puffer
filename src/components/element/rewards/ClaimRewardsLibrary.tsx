import { Box, List } from "dappkit";
import { ClaimRewardsChainRow, ClaimRewardsChainTable } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenRow, ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";

export default function ClaimRewardsLibrary() {
  return (
    <List flex="row" className="w-full flex-grow">
      <ClaimRewardsChainTable>
        <ClaimRewardsChainRow chainColumn={"ETH"} unclaimedColumn={"3m"} claimedColumn={"7m"} />
        <ClaimRewardsChainRow chainColumn={"ETH"} unclaimedColumn={"3m"} claimedColumn={"7m"} />
        <ClaimRewardsChainRow chainColumn={"ETH"} unclaimedColumn={"3m"} claimedColumn={"7m"} />
        <ClaimRewardsChainRow chainColumn={"ETH"} unclaimedColumn={"3m"} claimedColumn={"7m"} />
      </ClaimRewardsChainTable>
      <ClaimRewardsTokenTable>
        <ClaimRewardsTokenRow tokenColumn={"ARB"} amountColumn={"3m"} claimColumn={"claim"} />
        <ClaimRewardsTokenRow tokenColumn={"ARB"} amountColumn={"3m"} claimColumn={"claim"} />
        <ClaimRewardsTokenRow tokenColumn={"ARB"} amountColumn={"3m"} claimColumn={"claim"} />
        <ClaimRewardsTokenRow tokenColumn={"ARB"} amountColumn={"3m"} claimColumn={"claim"} />
        <ClaimRewardsTokenRow tokenColumn={"ARB"} amountColumn={"3m"} claimColumn={"claim"} />
      </ClaimRewardsTokenTable>
    </List>
  );
}
