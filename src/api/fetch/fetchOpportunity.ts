import { ChainId } from "src/config/chains";
import { API, query } from "../endpoint";
import { createCall } from "./call";
import { Action } from "src/config/actions";

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

export const fetchOpportunity = createCall<
  {
    [opportunityId: `${number}_${string}`]: FetchedOpportunity;
  },
  FetchedOpportunity,
  { chainId: ChainId; mainParameter: string }
>({
  async fetcher({ chainId, mainParameter }) {
    const { res, err } = await query(API, "/v3/opportunity", { chainId, mainParameter, campaigns: false });

    return res as {
      [opportunityId: `${number}_${string}`]: FetchedOpportunity;
    };
  },
  reducer(fetched, { mainParameter }) {
    const oppKey = Object.keys(fetched).find((key) => key.includes(mainParameter)) as `${number}_${string}` | undefined;
    const opp = oppKey ? fetched[oppKey] : undefined;

    if (oppKey) return opp;
  },
});
