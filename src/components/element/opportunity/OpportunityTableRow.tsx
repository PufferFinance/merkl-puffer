import Card from "dappkit/components/extenders/Card";
import Group from "dappkit/components/extenders/Group";
import type { BoxProps } from "dappkit/components/primitives/Box";
import Title from "dappkit/components/primitives/Title";
import Value from "dappkit/components/primitives/Value";
import { mergeClass } from "dappkit/utils/css";
import type { FetchedOpportunity } from "src/api/fetch/fetchOpportunity";
import { chains } from "src/config/chains";
import Tag, { TagProps, TagType, type TagTypes } from "../Tag";
import { OpportunityRow } from "./OpportunityTable";
import Icons from "dappkit/components/extenders/Icons";
import Icon from "dappkit/components/primitives/Icon";
import { Link } from "@remix-run/react";
import { useMemo } from "react";
import { Opportunity } from "merkl-api";
import { Button } from "dappkit/index";

export type OpportunityTableRowProps = { hideTags?: (keyof TagTypes)[]; opportunity: Opportunity } & BoxProps;

export default function OpportunityTableRow({ hideTags, opportunity, className, ...props }: OpportunityTableRowProps) {
  const link = useMemo(
    () => `/opportunity/${chains[opportunity.chainId]?.label?.toLowerCase?.()}/${opportunity.identifier?.split("_")?.[1]}`,
    [opportunity],
  );

  console.log(opportunity.aprRecords);
  

  const tags = useMemo(() => {
    const tokens: TagType<"token">[] = opportunity.tokens.map((t) => ({type: "token", value: t})) 
    const action: TagType<"action"> = {type: "action", value: opportunity.action}
    const protocol: TagType<"protocol"> = opportunity?.protocol &&{type: "protocol", value: opportunity?.protocol}
    const chain: TagType<"chain"> = {type: "chain", value: opportunity?.chainId}
    const status: TagType<"status"> = {type: "status", value: opportunity?.status}

    return [chain, status, action, protocol, ...tokens].filter(a => a);
  }, [opportunity])

  return (
    <Link to={link}>
      <OpportunityRow
        to={`/opportunity/${chains[opportunity.chainId]?.label?.toLowerCase?.()}/${opportunity.identifier?.split("_")?.[1]}`}
        size="lg"
        content="sm"
        className={mergeClass("", className)}
        {...props}
        aprColumn={
          <Group className='py-xl'>
            <Button look={opportunity.aprRecords?.[0]?.cummulated > 0 ? "hype" : "soft"} className="font-mono">
            <Value value format="0a%">{opportunity.aprRecords?.[0]?.cummulated / 100}</Value>
            </Button>
          </Group>
        }
        tvlColumn={
          <Group className='py-xl'>
              <Button look={opportunity.tvlRecords?.[0]?.total > 0 ? "soft" : "soft"} className="font-mono">
                <Value value format="$0,0.0a">{opportunity.tvlRecords?.[0]?.total ?? 0}</Value>
            </Button>
          </Group>
        }
        rewardsColumn={
          <Group className='py-xl'>
            <Value format="0.00a">{0}</Value>
          </Group>
        }
        opportunityColumn={
          <Group className="py-xl flex-col w-full text-nowrap whitespace-nowrap text-ellipsis">
            <Group className="text-nowrap whitespace-nowrap text-ellipsis min-w-0 flex-nowrap overflow-hidden max-w-full">
              <Icons>
                {tags
                  ?.filter(({ type }) => type === "token")
                  .map(({ value }) => (
                    <Icon rounded size={props?.size} src={value?.icon} />
                  ))}
              </Icons>
              <Title h={3} className="text-nowrap whitespace-nowrap text-ellipsis min-w-0 inline-block overflow-hidden">
                {opportunity.name}
              </Title>
            </Group>
            <Group>
              {tags
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
