import type { Campaign } from "@angleprotocol/merkl-api";
import { Button, Group, Icon, Text } from "dappkit";
import moment from "moment";
import { useMemo, useState } from "react";
import { CampaignTable } from "./CampaignTable";
import CampaignTableRow from "./CampaignTableRow";

export type CampaignProps = {
  campaigns: Campaign[];
};

export default function CampaignLibrary({ campaigns }: CampaignProps) {
  const [showInactive, setShowInactive] = useState(campaigns?.every((c) => c.endTimestamp < moment().unix()));
  console.log("IS", campaigns?.every((c) => c.endTimestamp > moment().unix()), moment().unix(), campaigns.map(c => c.endTimestamp));
  
  const rows = useMemo(() => {
    const now = moment().unix();
    const shownCampaigns = campaigns.filter(c => showInactive || Number(c.endTimestamp) > now);
    const startsOpen = shownCampaigns.length < 3;

    return shownCampaigns?.map(c => <CampaignTableRow key={c.id} campaign={c} startsOpen={startsOpen} />);
  }, [campaigns, showInactive]);

  return (
    <CampaignTable
      header={
        <Group className="justify-between items-center w-full">
          <Text>Campaigns</Text>
          <Group>
            <Button onClick={() => setShowInactive(r => !r)} look="soft">
              <Icon size="sm" remix={showInactive ? "RiEyeLine" : "RiEyeOffLine"} /> {!showInactive ? "Show" : "Hide"}{" "}
              Inactive
            </Button>
          </Group>
        </Group>
      }
      footer={"Something"}>
      {rows}
    </CampaignTable>
  );
}
