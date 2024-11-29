import type { Protocol } from "@angleprotocol/merkl-api";
import { api } from "../index.server";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class ProtocolService {
  static async #fetch<R, T extends { data: R; status: number }>(
    call: () => Promise<T>,
    resource = "Protocol",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await call();

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500) throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  static async get(query: { id: string }): Promise<Protocol> {
    const protocol = await ProtocolService.#fetch(async () => api.v4.protocols(query).get({ query }));

    return protocol;
  }
}
