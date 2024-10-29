import { Opportunity, Campaign } from "@angleprotocol/merkl-api";
import { ReactNode, useMemo } from "react";
import { formatUnits } from "viem";
import moment from "moment";
import { Group, Text, Value } from "packages/dappkit/src";

export default function useCampaign(campaign: Opportunity["campaigns"][number]) {
  const amount = useMemo(() => {
    return formatUnits(BigInt(campaign.amount), campaign.rewardToken.decimals);
  }, [campaign?.amount, campaign?.rewardToken?.decimals]);

  const time = useMemo(() => {
    const timestamp = moment(Number(campaign.endTimestamp) * 1000).fromNow();

    return timestamp;
  }, [campaign.endTimestamp]);

  const profile = useMemo(() => {
    type ProfileReducer = { [C in Opportunity["type"]]?: (_campaign: Campaign<C>) => ReactNode };

    const reducer: ProfileReducer = {
      CLAMM: ({params}) => {
        console.log("PARAMS", typeof params, params);
        

        return (
          <Group>
            <Value format="0a%">{params.weightFees / 10000}</Value>
            <Value format="0a%">{params.weightToken0 / 10000}</Value>
            <Value format="0a%">{params.weightToken1 / 10000}</Value>
          </Group>
        );
      },
    };

    return reducer[campaign.type]?.(campaign) ?? <Text>NONE</Text>;
  }, [campaign]);

  return { amount, time, profile };
}
