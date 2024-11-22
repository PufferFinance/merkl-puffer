import type { Opportunity } from "@angleprotocol/merkl-api";
import { Button, Dropdown, Icons } from "dappkit";
import useOpportunity from "src/hooks/resources/useOpportunity";

export type OpportuntiyButtonProps = {
  opportunity: Opportunity;
};

export default function OpportuntiyButton({ opportunity }: OpportuntiyButtonProps) {
  const { icons } = useOpportunity(opportunity);

  return (
    <Dropdown>
      <Button look="soft">
        <Icons size="sm">{icons}</Icons>
        {opportunity.name}
      </Button>
    </Dropdown>
  );
}
