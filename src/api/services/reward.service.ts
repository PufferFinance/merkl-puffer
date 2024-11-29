import { api } from "../index.server";
import type { Reward } from "@angleprotocol/merkl-api";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class RewardService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Reward",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

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
}