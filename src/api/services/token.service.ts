import type { Token } from "@angleprotocol/merkl-api";
import { api } from "../index.server";

export abstract class TokenService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Chain"
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500)
      throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  static async getMany(
    query: Parameters<typeof api.v4.tokens.index.get>[0]["query"]
  ): Promise<Token[]> {
    const tokens = await TokenService.#fetch(async () =>
      api.v4.tokens.index.get({ query })
    );

    return tokens;
  }

  static async getSymbol(symbol: string | undefined): Promise<Token[]> {
    if (!symbol) throw new Response("Token not found");

    const tokens = await TokenService.#fetch(async () =>
      api.v4.tokens.index.get({ query: { symbol } })
    );

    if (tokens.length === 0)
      throw new Response("Token not found", { status: 404 });
    return tokens;
  }
}
