import { Card, Group, Title, Value, mergeClass } from "dappkit/src";
import type { BoxProps } from "dappkit/src";
import type { FetchedOpportunity } from "src/api/fetch/fetchOpportunity";
import { chains } from "src/config/chains";
import Tag, { type TagTypes } from "./Tag";

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
          {opportunity?.contextTag
            ?.filter(({ type }) => !hideTags || !hideTags.includes(type))
            .map(tag => (
              <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
            ))}
        </Group>
      </Group>
      <Group>
        <Value format="0.00a">{opportunity.apr}</Value>
      </Group>
      <Group>
        <Value format="0.00a">{opportunity.tvl}</Value>
      </Group>
      <Group>
        <Value format="0.00a">{opportunity.dailyrewards}</Value>
      </Group>
    </Card>
  );
}
