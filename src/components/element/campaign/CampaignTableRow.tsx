import type { Campaign } from "@angleprotocol/merkl-api";
import { type Component, Group, Icon, OverrideTheme, Text, Value, mergeClass } from "dappkit";
import { useCallback, useMemo, useState } from "react";
import useCampaign from "src/hooks/resources/useCampaign";
import Token from "../token/Token";
import { CampaignRow } from "./CampaignTable";
import { formatUnits, parseUnits } from "viem";
import moment from "moment";
import RestrictionsCollumn from "./tableCollumns/RestrictionsCollumn";
import Tooltip from "packages/dappkit/src/components/primitives/Tooltip";

export type CampaignTableRowProps = Component<{
  campaign: Campaign;
  startsOpen?: boolean;
}>;

export default function CampaignTableRow({ campaign, startsOpen, className, ...props }: CampaignTableRowProps) {
  const { time, profile, dailyRewards, active } = useCampaign(campaign);
  const [isOpen, setIsOpen] = useState(startsOpen);

  const toggleIsOpen = useCallback(() => setIsOpen(o => !o), []);

  const campaignAmount = useMemo(
    () => formatUnits(parseUnits(campaign.amount, 0), campaign.rewardToken.decimals),
    [campaign],
  );

  return (
    <CampaignRow
      {...props}
      className={mergeClass("cursor-pointer", className)}
      onClick={toggleIsOpen}
      dailyRewardsColumn={
        <Group className="align-middle items-center">
          <OverrideTheme accent={"good"}>
            <Icon className={active ? "text-accent-10" : "text-main-10"} remix="RiCircleFill" size="xs" />
          </OverrideTheme>
          <Token token={campaign.rewardToken} amount={dailyRewards} />
        </Group>
      }
      timeRemainingColumn={<Text className="py-xl">{time}</Text>}
      restrictionsColumn={<RestrictionsCollumn campaign={campaign} />}
      profileColumn={profile}
      chainColumn={
        <Text className="flex">
          <Icon src={campaign.chain.icon} size={"sm"} />
          {campaign.chain.name}
        </Text>
      }
      arrowColumn={<Icon remix={!isOpen ? "RiArrowDownSLine" : "RiArrowUpSLine"} />}>
      {isOpen && (
        <div className="animate-drop">
          <div className="flex justify-between gap-3">
            <Group className="justify-between flex-col size-full">
              <Text size="md">Campaign information</Text>
              <div className="flex justify-between">
                <Text size="sm">Total</Text>
                <Value className="text-right" look={campaignAmount === "0" ? "soft" : "base"} format="$0,0.#">
                  {campaignAmount}
                </Value>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Dates</Text>
                <span className="flex">
                  <Text size="sm">
                    {moment.unix(Number(campaign.startTimestamp)).format("DD MMMM YYYY")}-
                    {moment.unix(Number(campaign.endTimestamp)).format("DD MMMM YYYY")}
                  </Text>
                </span>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Last snapshot</Text>
                {/* <Time timestamp={BigInt(campaign.) * BigInt(1000)} /> */}
              </div>
              <div className="flex justify-between">
                <Text size="sm">Campaign creator</Text>
                <Text size="sm">{campaign.creatorAddress}</Text>
              </div>
            </Group>
            <Group className="justify-between flex-col size-full">
              <Text size={"md"}>Conditions</Text>
              <span className="flex justify-between">
                <Text size="sm">Blacklisted for</Text>
                <Tooltip
                  helper={
                    <div>
                      {campaign.params.blacklist.length > 0
                        ? campaign.params.blacklist.map((blacklist: string) => blacklist)
                        : "No address"}
                    </div>
                  }>
                  <Text size="sm">{campaign.params.blacklist.length} address</Text>
                </Tooltip>
              </span>
              <span className="flex justify-between">
                <Text size="sm">Whitelisted for</Text>
                <Tooltip
                  helper={
                    <div>
                      {campaign.params.whitelist.length > 0
                        ? campaign.params.whitelist.map((blacklist: string) => blacklist)
                        : "No address"}
                    </div>
                  }>
                  <Text size="sm">{campaign.params.whitelist.length} address</Text>
                </Tooltip>
              </span>
            </Group>
          </div>
        </div>
      )}
    </CampaignRow>
  );
}
