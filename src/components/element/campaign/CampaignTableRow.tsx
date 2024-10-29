import type { Opportunity } from "@angleprotocol/merkl-api";
import { CampaignRow } from "./CampaignTable";
import { Button, Group, Value } from "dappkit";
import useCampaign from "src/hooks/resources/useCampaign";

export type CampaignTableRowProps = {
  campaign: Opportunity["campaigns"][number];
};

export default function CampaignTableRow({ campaign }: CampaignTableRowProps) {
  const { amount, time, profile} = useCampaign(campaign);

  return (
    <CampaignRow
      dailyRewardsColumn={
        <Group className="py-xl">
          <Value value format="0a">
            {amount}
          </Value>{" "}
          {campaign.rewardToken.symbol}
        </Group>
      }
      timeRemainingColumn={<Group className="py-xl">{time}</Group>}
      restrictionsColumn={[]}
      profileColumn={profile}
    />
  );
}
