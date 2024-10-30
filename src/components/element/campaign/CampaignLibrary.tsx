import { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { CampaignTable } from "./CampaignTable";
import { useMemo } from "react";
import CampaignTableRow from "./CampaignTableRow";

export type CampaignProps = {
  campaigns: Campaign[];
};

export default function CampaignLibrary({ campaigns }: CampaignProps) {
  const rows = useMemo(() => campaigns?.map(c => <CampaignTableRow key={c.campaignId} campaign={c} />), [campaigns]);

  return (
    <CampaignTable header={"Campaigns"} footer={"Something"}>
      {rows}
    </CampaignTable>
  );
}
