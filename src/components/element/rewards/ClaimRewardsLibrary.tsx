import type { Reward } from "@angleprotocol/merkl-api";
import { Group } from "dappkit";
import { ClaimRewardsChainTable } from "./ClaimRewardsChainTable";
import ClaimRewardsChainTableRow from "./ClaimRewardsChainTableRow";

export type ClaimRewardsLibraryProps = {
  rewards: Reward[];
};

export default function ClaimRewardsLibrary({ rewards }: ClaimRewardsLibraryProps) {
  console.log("R", rewards);

  return (
    <Group className="flex-row w-full [&>*]:flex-grow">
      <ClaimRewardsChainTable>
        {rewards?.map((reward, index) => (
          <ClaimRewardsChainTableRow reward={reward} key={reward.chain?.id ?? index} />
        ))}
      </ClaimRewardsChainTable>
    </Group>
  );
}
