import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { CampaignRow } from "./CampaignTable";
import { Button, Component, Group, Hash, Icon, mergeClass, Text, Value } from "dappkit";
import useCampaign from "src/hooks/resources/useCampaign";
import { Link } from "@remix-run/react";
import { useState } from "react";

export type CampaignTableRowProps = Component<{
  campaign: Campaign;
}>;

export default function CampaignTableRow({ campaign, className, ...props }: CampaignTableRowProps) {
  const { time, profile, dailyRewards, progressBar } = useCampaign(campaign);
  const [open, setOpen] = useState(false);

  return (
    <CampaignRow
      {...props}
      className={mergeClass("cursor-pointer", className)}
      onClick={() => setOpen(o => !o)}
      dailyRewardsColumn={
        <Group className="py-xl">
          <Value value format="0.00a">
            {dailyRewards}
          </Value>{" "}
          {campaign.rewardToken.symbol}
        </Group>
      }
      timeRemainingColumn={<Group className="py-xl">{time}</Group>}
      restrictionsColumn={[]}
      profileColumn={profile}
      arrowColumn={<Icon remix={!open ? "RiArrowDownSLine" : "RiArrowUpSLine"} />}>
      {open && (
        <div className="animate-drop">
          {progressBar}
          <Group className="justify-between">
            <Group>
              <Text size="sm">created by</Text>
              <Hash size="sm" format="short">
                {campaign.creator}
              </Hash>
            </Group>
            <Group>
              <Text size="sm">id:</Text>
              <Hash size="sm" format="short">
                {campaign.campaignId}
              </Hash>
            </Group>
          </Group>
          <Group>
            <Text size="sm" className="flex gap-[1ch]">
              distributed on <Icon size="sm" src={campaign.distributionChain?.icon} /> {campaign.distributionChain?.name}
            </Text>
          </Group>
        </div>
      )}
    </CampaignRow>
  );
}
