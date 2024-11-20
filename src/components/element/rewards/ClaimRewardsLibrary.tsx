import { List, Box, Group, Text, Button, Value } from "dappkit";
import { ClaimRewardsChainRow, ClaimRewardsChainTable } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenRow, ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import Chain from "../chain/Chain";
import Token from "../token/Token";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";
import ClaimRewardsChainTableRow from "./ClaimRewardsChainTableRow";
import { Reward } from "@angleprotocol/merkl-api";

export type ClaimRewardsLibraryProps = {
  rewards: Reward[]
}

export default function ClaimRewardsLibrary({rewards}: ClaimRewardsLibraryProps) {

  console.log("R", rewards);
  
  return (
    <Group className="flex-row w-full [&>*]:flex-grow">
      <ClaimRewardsChainTable header={<Text>23k$ to claim across 6 chains</Text>}>
      {rewards?.map((reward, index) => <ClaimRewardsChainTableRow reward={reward}  key={reward.chain?.id ?? index}/>)}
      </ClaimRewardsChainTable>
    </Group>
  );
}
