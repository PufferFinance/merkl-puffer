import { Button } from "packages/dappkit/src";
import { encodeFunctionData, parseAbi } from "viem";

export type ClaimRewardsButtonProps = {
  receivers: string[];
  tokens: string[];
  amounts: string[];
  proofs: string[];
};

export default function ClaimRewardsButton({receivers, tokens, amounts, proofs}: ClaimRewardsButtonProps) {
  const abi = parseAbi(["function claim(address[],address[],uint256[],bytes32[][]) view returns (uint256)"]);
    const data = encodeFunctionData({
        abi: abi,
        functionName: 'claim',
        args: []
      })
  function claim() {}

  return <Button look="hype">Claim</Button>;
}
