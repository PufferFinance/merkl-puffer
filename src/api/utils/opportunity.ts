import type { TagType } from "src/components/element/Tag";
import { getProtocol } from "src/config/protocols";
import type { FetchedOpportunity } from "../fetch/fetchOpportunities";
import type { Tokens } from "../fetch/fetchTokens";

export function tagOpportunity(opportunity: FetchedOpportunity, tokens: Tokens) {
  return {
    ...opportunity,
    contextTag: [
      { type: "chain", value: opportunity.chainId },
      { type: "action", value: opportunity.action },
      { type: "protocol", value: getProtocol(opportunity?.platform) },
      ...(opportunity?.tokenIcons?.map(t => ({
        type: "token",
        value: Object.values(tokens?.[opportunity.chainId] ?? {}).find(
          ({ symbol }) => symbol?.toLowerCase() === t?.toLowerCase(),
        ),
      })) ?? []),
    ] satisfies TagType[] as TagType[],
  };
}

export function tagOpportunities(
  opportunities: {
    [opportunityId: `${number}_${string}`]: FetchedOpportunity;
  },
  tokens: Tokens,
) {
  const opportunitiesWithTags: {
    [opportunityId: `${number}_${string}`]: FetchedOpportunity & { contextTag: TagType[] };
  } = {};

  for (const _id in opportunities) {
    const id = _id as `${number}_${string}`;
    const opportunity = opportunities[id];

    opportunitiesWithTags[id as `${number}_${string}`] = tagOpportunity(opportunity, tokens);
  }

  return opportunitiesWithTags;
}
