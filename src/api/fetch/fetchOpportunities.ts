import type { Action } from "src/config/actions";
import type { ChainId } from "src/config/chains";
import { API, query } from "../endpoint";
import { createCall } from "./call";

export type FetchedOpportunity = {
  id: string;
  chainId: ChainId;
  distributionChainId?: ChainId;
  name: string;
  status: "past" | "live" | "soon";
  action: Action;
  subtype?: number;
  tvl?: number;
  platform?: string;
  apr?: number;
  dailyrewards?: number;
  tokenIcons?: string[];
  tags?: string[];
  rewardTokenIcons?: string[];
  dailyRewardTokens?: {
    symbol: string;
    amount: string;
    address: string;
  }[];
  campaigns: {
    type: number;
    ids: string[];
  };
};

export const fetchOpportunities = createCall<
  {
    [opportunityId: `${number}_${string}`]: FetchedOpportunity;
  },
  {
    [opportunityId: `${number}_${string}`]: FetchedOpportunity;
  },
  { chainId: ChainId }
>({
  async fetcher({ chainId }) {
    const { res, err } = await query(API, "/v3/opportunity", { chainId });

    return res as {
      [opportunityId: `${number}_${string}`]: FetchedOpportunity;
    };
  },
  reducer(fetched, { chainId }) {
    console.log("opps", fetched);

    return fetched;
  },
});
