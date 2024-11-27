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
  const [showInactive, setShowInactive] = useState(false);

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
      {!!rows.length ? (
        rows
      ) : (
        <Group className="flex-col text-center">
          <Text>No active campaign</Text>
          <div className="w-full">
            <Button onClick={() => setShowInactive(r => !r)} look="soft" className="m-auto">
              <Icon size="sm" remix={showInactive ? "RiEyeLine" : "RiEyeOffLine"} /> {!showInactive ? "Show" : "Hide"}{" "}
              Inactive
            </Button>
          </div>
        </Group>
      )}
    </CampaignTable>
  );
}
