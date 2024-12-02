import { Group } from "@ariakit/react";
import { json, useOutletContext } from "@remix-run/react";
import { Space } from "packages/dappkit/src";
import CampaignLibrary from "src/components/element/campaign/CampaignLibrary";
import type { OutletContextOpportunity } from "./_merkl.opportunity.$chain.$type.$id";
import { ErrorContent } from "src/components/layout/ErrorContent";

export async function loader() {
  return json({});
}

export default function Index() {
  const { campaigns } = useOutletContext<OutletContextOpportunity>();

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

export function ErrorBoundary() {
  return <ErrorContent />;
}
