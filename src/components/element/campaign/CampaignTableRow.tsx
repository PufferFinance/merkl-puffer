import type { Campaign } from "@angleprotocol/merkl-api";
import { type Component, Group, Hash, Icon, OverrideTheme, Text, mergeClass } from "dappkit";
import { useState } from "react";
import useCampaign from "src/hooks/resources/useCampaign";
import Token from "../token/Token";
import { CampaignRow } from "./CampaignTable";

export type CampaignTableRowProps = Component<{
  campaign: Campaign;
  startsOpen?: boolean;
}>;

export default function CampaignTableRow({ campaign, startsOpen, className, ...props }: CampaignTableRowProps) {
  const { time, profile, dailyRewards, progressBar, active } = useCampaign(campaign);
  const [open, setOpen] = useState(startsOpen);

  return (
    <CampaignRow
      {...props}
      className={mergeClass("cursor-pointer", className)}
      onClick={() => setOpen(o => !o)}
      dailyRewardsColumn={
        <Group className="align-middle items-center">
          <OverrideTheme accent={"good"}>
            <Icon className={active ? "text-accent-10" : "text-main-10"} remix="RiCircleFill" size="xs" />
          </OverrideTheme>
          <Token token={campaign.rewardToken} amount={dailyRewards} />
        </Group>
      }
      timeRemainingColumn={<Group className="py-xl"><Text>{time}</Text></Group>}
      restrictionsColumn={[]}
      profileColumn={profile}
      arrowColumn={<Icon remix={!open ? "RiArrowDownSLine" : "RiArrowUpSLine"} />}>
      {open && (
        <div className="animate-drop">
          {progressBar}
          <Group className="justify-between">
            <Group>
              <Text size="sm">created by</Text>
            </Group>
            <Group>
              <Text size="sm">id:</Text>
              <Hash size="sm" format="short" copy>
                {campaign.campaignId}
              </Hash>
            </Group>
          </Group>
          <Group>
            <Text size="sm" className="flex gap-[1ch]">
              distributed on
              <Icon size="sm" src={campaign.distributionChain?.icon} /> {campaign.distributionChain?.name}
            </Text>
          </Group>
        </div>
      )}
    </CampaignRow>
  );
}
