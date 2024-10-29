import { Opportunity } from "@angleprotocol/merkl-api";
import { CampaignTable } from "./CampaignTable";
import { useMemo } from "react";
import CampaignTableRow from "./CampaignTableRow";

export type CampaignProps = {
  campaigns: Opportunity["campaigns"];
};

export default function CampaignLibrary({ campaigns }: CampaignProps) {
    const rows = useMemo(
        () =>
            campaigns?.map(c => <CampaignTableRow campaign={c} />),
        [campaigns],
      );
  return <CampaignTable
      header={"Something"}
  >
    {rows}
  </CampaignTable>;
}
