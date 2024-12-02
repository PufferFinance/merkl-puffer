import { Group } from "@ariakit/react";
import { useOutletContext } from "@remix-run/react";
import { Space } from "packages/dappkit/src";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";

export default function Index() {
  const { opportunity, campaigns } = useOutletContext();
  console.log({ opportunity, campaigns });

  return (
    <Group>
      <Space size="md" />
      <CampaignLibrary campaigns={campaigns} />
      {/* <Group className="grid grid-cols-1 gap-md md:grid-cols-[1fr,300px]"> */}
      {/* <Group className="flex-col">
          <Participate opportunity={opportunity as Opportunity} />
        </Group> */}
      {/* </Group> */}
    </Group>
  );
}
