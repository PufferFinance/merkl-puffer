import { Group, Text } from "dappkit";
import { ClaimRewardsChainTable } from "./ClaimRewardsChainTable";
import ClaimRewardsChainTableRow from "./ClaimRewardsChainTableRow";

export default function ClaimRewardsLibrary() {
  return (
    <Group className="flex-row w-full [&>*]:flex-grow">
      <ClaimRewardsChainTable header={<Text>23k$ to claim across 6 chains</Text>}>
        <ClaimRewardsChainTableRow />
        <ClaimRewardsChainTableRow />
        <ClaimRewardsChainTableRow />
        <ClaimRewardsChainTableRow />
      </ClaimRewardsChainTable>
    </Group>
  );
}
