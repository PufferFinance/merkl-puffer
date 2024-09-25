import Group from "dappkit/components/extenders/Group";
import Box, { BoxProps } from "dappkit/components/primitives/Box";
import Title from "dappkit/components/primitives/Title";
import { FetchedOpportunity } from "src/api/fetch/fetchOpportunity";
import Tag, { TagTypes } from "./Tag";
import { getProtocol } from "src/config/protocols";
import { Button } from "dappkit/index";
import { chains } from "src/config/chains";
import Card from "dappkit/components/extenders/Card";
import { mergeClass } from "dappkit/utils/css";

export type OpportunityListItemProps = { hideTags?: (keyof TagTypes)[]; opportunity: FetchedOpportunity } & BoxProps;

export default function OpportunityListItem({ hideTags, opportunity, className, ...props }: OpportunityListItemProps) {
  return (
    <Card
      to={`/opportunity/${chains[opportunity.chainId].label?.toLowerCase()}/${opportunity.id?.split("_")?.[1]}`}
      size="lg"
      content="sm"
      className={mergeClass("grid grid-cols-[1fr,100px,100px,100px]", className)}
      {...props}>
      <Group className="flex-col w-full">
        <Title h={3}>{opportunity.name}</Title>
        <Group>
          {[
            { type: "chain", value: opportunity.chainId },
            { type: "action", value: opportunity.action },
            { type: "protocol", value: getProtocol(opportunity?.platform) ?? opportunity?.platform },
          ]
            .filter(({ type }) => !hideTags || !hideTags.includes(type))
            .map(tag => (
              <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
            ))}
        </Group>
      </Group>
      <Group className="flex-col w-full">
        <Title h={3}>TVL</Title>
        <Group>1</Group>
      </Group>
      <Group className="flex-col w-full">
        <Title h={3}>APR</Title>
        <Group>2</Group>
      </Group>
      <Group className="flex-col w-full">
        <Title h={3}>APR</Title>
        <Group>3</Group>
      </Group>
    </Card>
  );
}
