import Card from "dappkit/components/extenders/Card";
import Group from "dappkit/components/extenders/Group";
import type { BoxProps } from "dappkit/components/primitives/Box";
import Title from "dappkit/components/primitives/Title";
import Value from "dappkit/components/primitives/Value";
import { mergeClass } from "dappkit/utils/css";
import type { FetchedOpportunity } from "src/api/fetch/fetchOpportunity";
import { chains } from "src/config/chains";
import Tag, { type TagTypes } from "../Tag";
import { OpportunityRow } from "./OpportunityTable";
import Icons from "dappkit/components/extenders/Icons";
import Icon from "dappkit/components/primitives/Icon";
import { Link } from "@remix-run/react";
import { useMemo } from "react";

export type OpportunityTableRowProps = { hideTags?: (keyof TagTypes)[]; opportunity: FetchedOpportunity } & BoxProps;

export default function OpportunityTableRow({ hideTags, opportunity, className, ...props }: OpportunityTableRowProps) {
  const link = useMemo(
    () => `/opportunity/${chains[opportunity.chainId].label?.toLowerCase()}/${opportunity.id?.split("_")?.[1]}`,
    [opportunity],
  );

  return (
    <Link to={link}>
      <OpportunityRow
        to={`/opportunity/${chains[opportunity.chainId].label?.toLowerCase()}/${opportunity.id?.split("_")?.[1]}`}
        size="lg"
        content="sm"
        className={mergeClass("", className)}
        {...props}
        aprColumn={
          <Group>
            <Value format="0.00a">{opportunity.apr}</Value>
          </Group>
        }
        tvlColumn={
          <Group>
            <Value format="0.00a">{opportunity.tvl}</Value>
          </Group>
        }
        rewardsColumn={
          <Group>
            <Value format="0.00a">{opportunity.dailyrewards}</Value>
          </Group>
        }
        opportunityColumn={
          <Group className="py-xl flex-col w-full text-nowrap whitespace-nowrap text-ellipsis">
            <Group className="text-nowrap whitespace-nowrap text-ellipsis min-w-0 flex-nowrap overflow-hidden max-w-full">
              <Icons>
                {opportunity?.contextTag
                  ?.filter(({ type }) => type === "token")
                  .map(({ value }) => (
                    <Icon rounded size={props?.size} src={value?.logoURI} />
                  ))}
              </Icons>
              <Title h={3} className="text-nowrap whitespace-nowrap text-ellipsis min-w-0 inline-block overflow-hidden">
                {opportunity.name}
              </Title>
            </Group>
            <Group>
              {opportunity?.contextTag
                ?.filter(({ type }) => !hideTags || !hideTags.includes(type))
                .map(tag => (
                  <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
                ))}
            </Group>
          </Group>
        }
      />
    </Link>
  );
}
