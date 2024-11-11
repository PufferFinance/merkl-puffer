import { List, Box, Group, Text, Button, Value } from "dappkit";
import { ClaimRewardsChainRow, ClaimRewardsChainTable } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenRow, ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import Chain from "../chain/Chain";
import Token from "../token/Token";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";
import ClaimRewardsChainTableRow from "./ClaimRewardsChainTableRow";

export default function ClaimRewardsLibrary() {
  return (
    <Group className="flex-row w-full [&>*]:flex-grow">
      <ClaimRewardsChainTable header={<Text>23k$ to claim across 6 chains</Text>}>
        <ClaimRewardsChainTableRow/>
        <ClaimRewardsChainTableRow/>
        <ClaimRewardsChainTableRow/>
        <ClaimRewardsChainTableRow/>
      </ClaimRewardsChainTable>
    </Group>
  );
}
