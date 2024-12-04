import type { Reward } from "@merkl/api";
import { api } from "../index.server";
import { fetchWithLogs } from "../utils";

// Todo: Check how we should type Raw query
export type IRewards = {
  amount: string;
  recipient: string;
  campaignId: string;
  reason: string;
  Token: {
    id: string;
    name: string;
    chainId: number;
    address: string;
    decimals: number;
    symbol: string;
    icon: string;
    verified: boolean;
    price: number;
  };
};
// Todo: Check how we should type Raw query
export type ITotalRewards = {
  campaignId: string;
  totalAmount: string;
  Token: {
    id: string;
    name: string;
    chainId: number;
    address: string;
    decimals: number;
    symbol: string;
    icon: string;
    verified: boolean;
    price: number;
  };
}[];

export abstract class RewardService {
  static async #fetch<R, T extends { data: R; status: number; response: Response }>(
    call: () => Promise<T>,
    resource = "Reward",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await fetchWithLogs(call);

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500) throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  static async getForUser(address: string): Promise<Reward[]> {
    const rewards = await RewardService.#fetch(async () => api.v4.users({ address }).rewards.full.get());

    //TODO: add some cache here
    return rewards;
  }

  static async getByParams(query: {
    items?: number;
    page?: number;
    chainId: number;
    campaignIds: string[];
  }) {
    const rewards = await RewardService.#fetch(async () =>
      api.v4.rewards.index.get({
        query: {
          ...query,
          campaignIds: query.campaignIds.join(","),
        },
      }),
    );

    return rewards as unknown as IRewards[];
  }

  static async total(query: {
    chainId: number;
    campaignIds: string[];
  }): Promise<ITotalRewards> {
    const total = await RewardService.#fetch(async () =>
      api.v4.rewards.total.get({
        query: {
          ...query,
          campaignIds: query.campaignIds.join(","),
        },
      }),
    );

    return total as ITotalRewards;
  }
}
