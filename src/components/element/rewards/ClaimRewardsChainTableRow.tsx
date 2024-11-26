import type { Reward } from "@angleprotocol/merkl-api";
import { Icon, Space, Text, Value } from "dappkit";
import TransactionButton from "packages/dappkit/src/components/dapp/TransactionButton";
import Collapsible from "packages/dappkit/src/components/primitives/Collapsible";
import EventBlocker from "packages/dappkit/src/components/primitives/EventBlocker";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { type PropsWithChildren, useMemo, useState } from "react";
import { encodeFunctionData, formatUnits, parseAbi } from "viem";
import Chain from "../chain/Chain";
import { ClaimRewardsChainRow } from "./ClaimRewardsChainTable";
import { ClaimRewardsTokenTable } from "./ClaimRewardsTokenTable";
import ClaimRewardsTokenTableRow from "./ClaimRewardsTokenTableRow";

export type ClaimRewardsChainTableRowProps = PropsWithChildren & {
  from: string;
  reward: Reward;
};

export default function ClaimRewardsChainTableRow({ from, reward, ...props }: ClaimRewardsChainTableRowProps) {
  const [open, setOpen] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set<string>());

  const { address: user } = useWalletContext();
  const isUserRewards = useMemo(() => user === from, [user, from]);
  const isAbleToClaim = useMemo(
    () => isUserRewards && !reward.rewards.every(({ amount, claimed }) => amount === claimed),
    [isUserRewards, reward],
  );

  const claimTransaction = useMemo(() => {
    const abi = parseAbi(["function claim(address[],address[],uint256[],bytes32[][]) view returns (uint256)"]);

    const tokenAddresses = reward.rewards.map(({ token }) => token.address as `0x${string}`);
    const accumulatedRewards = reward.rewards.map(({ amount }) => amount);
    const proofs = reward.rewards.map(({ proofs }) => proofs as `0x${string}`[]);

    if (!reward || !user || !isUserRewards) return;
    return {
      to: reward.distributor,
      data: encodeFunctionData({
        abi,
        functionName: "claim",
        args: [tokenAddresses.map(() => user as `0x${string}`), tokenAddresses, accumulatedRewards, proofs],
      }),
    };
  }, [user, reward, isUserRewards]);

  const unclaimed = useMemo(() => {
    return reward.rewards.reduce(
      (sum, { amount, claimed, token: { decimals, price } }) =>
        sum + Number.parseFloat(formatUnits(amount - claimed, decimals)) * price,
      0,
    );
  }, [reward]);

  const claimed = useMemo(() => {
    return reward.rewards.reduce(
      (sum, { claimed, token: { decimals, price } }) => sum + Number.parseFloat(formatUnits(claimed, decimals)) * price,
      0,
    );
  }, [reward]);

  const renderTokenRewards = useMemo(
    () =>
      reward.rewards
        .sort((a, b) => Number(b.amount - b.claimed - (a.amount - a.claimed)))
        .map(_reward => (
          <ClaimRewardsTokenTableRow
            checkedState={[
              selectedTokens.has(_reward.token.address),
              checked => {
                setSelectedTokens(t => {
                  if (checked) t.add(_reward.token.address);
                  else t.delete(_reward.token.address);

                  return new Set(t);
                });
              },
            ]}
            key={_reward.token.address}
            reward={_reward}
          />
        )),
    [reward, selectedTokens],
  );

  return (
    <ClaimRewardsChainRow
      {...props}
      onClick={() => setOpen(o => !o)}
      chainColumn={
        <>
          <Chain chain={reward.chain} />
          <Icon
            data-state={!open ? "closed" : "opened"}
            className="transition duration-150 ease-out data-[state=opened]:rotate-180"
            remix={"RiArrowDropDownLine"}
          />
          <EventBlocker>
            {isAbleToClaim && (
              <TransactionButton disabled={!claimTransaction} className="ml-xl" look="hype" tx={claimTransaction}>
                Claim
              </TransactionButton>
            )}
          </EventBlocker>
        </>
      }
      unclaimedColumn={
        <Value size="lg" format="$0,0">
          {unclaimed}
        </Value>
      }
      claimedColumn={
        <Value size="lg" format="$0,0">
          {claimed}
        </Value>
      }>
      <Collapsible state={[open, setOpen]}>
        <Space size="md" />
        <ClaimRewardsTokenTable
          tokenHeader={
            <Text size="xs" className="pl-md">
              TOKEN
            </Text>
          }
          size="sm"
          look="soft">
          {renderTokenRewards}
        </ClaimRewardsTokenTable>
      </Collapsible>
    </ClaimRewardsChainRow>
  );
}
