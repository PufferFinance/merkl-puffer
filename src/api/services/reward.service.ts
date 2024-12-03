import type { Reward } from "@merkl/api";
import { api } from "../index.server";
import { fetchWithLogs } from "../utils";

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
    campaignIdentifiers: string[];
  }) {
    return RewardService.#fetch(async () =>
      api.v4.rewards.index.get({
        query: {
          ...query,
          campaignIdentifiers: query.campaignIdentifiers.join(","),
        },
      }),
    );
  }
}
