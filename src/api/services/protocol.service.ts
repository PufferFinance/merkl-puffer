import type { Protocol } from "@merkl/api";
import { api } from "../index.server";
import { fetchWithLogs } from "../utils";

export abstract class ProtocolService {
  static async #fetch<R, T extends { data: R; status: number; response: Response }>(
    call: () => Promise<T>,
    resource = "Protocol",
  ): Promise<NonNullable<T["data"]>> {
    const { data, status } = await fetchWithLogs(call);

    if (status === 404) throw new Response(`${resource} not found`, { status });
    if (status === 500) throw new Response(`${resource} unavailable`, { status });
    if (data == null) throw new Response(`${resource} unavailable`, { status });
    return data;
  }

  /**
   * Retrieves protocols query params from page request
   * @param request request containing query params such as paginatio
   * @param override params for which to override value
   * @returns query
   */
  static #getQueryFromRequest(
    request: Request,
    override?: Parameters<typeof api.v4.opportunities.index.get>[0]["query"],
  ) {
    const page = new URL(request.url).searchParams.get("page");
    const items = new URL(request.url).searchParams.get("items");
    const search = new URL(request.url).searchParams.get("search");

    const [sort, order] = new URL(request.url).searchParams.get("sort")?.split("-") ?? [];

    const filters = Object.assign(
      { items, sort, order, name: search, page },
      override ?? {},
      page !== null && { page: Number(page) - 1 },
    );

    const query = Object.entries(filters).reduce(
      (_query, [key, filter]) => Object.assign(_query, filter == null ? {} : { [key]: filter }),
      {},
    );

    return query;
  }

  static async get(query: { id: string }): Promise<Protocol> {
    const protocol = await ProtocolService.#fetch(async () => api.v4.protocols(query).get({ query }));

    return protocol;
  }

  static async getManyFromRequest(request: Request): Promise<{ protocols: Protocol[]; count: number }> {
    const query = ProtocolService.#getQueryFromRequest(request);
    const protocols = await ProtocolService.#fetch(async () => api.v4.protocols.index.get({ query }));
    const count = await ProtocolService.#fetch(async () => api.v4.protocols.count.get({ query }));

    return { protocols, count };
  }
}
