import { api } from "..";

export async function fetchOpportunities(
  request: Request,
  overrideQuery?: Parameters<typeof api.v4.opportunity.get>[0]["query"],
) {
  const status = new URL(request.url).searchParams.get("status");
  const action = new URL(request.url).searchParams.get("action");
  const chainId = new URL(request.url).searchParams.get("chain");
  const page = new URL(request.url).searchParams.get("page");
  const items = new URL(request.url).searchParams.get("items");
  const search = new URL(request.url).searchParams.get("search");
  const [sort, order] = new URL(request.url).searchParams.get("sort")?.split("-") ?? [];

  const filters = Object.assign(
    { status, action, chainId, page, items, sort, order, name: search },
    overrideQuery ?? {},
  );
  const query = Object.entries(filters).reduce(
    (_query, [key, filter]) => Object.assign(_query, !filter ? {} : { [key]: filter }),
    {},
  );

  return await api.v4.opportunity.get({ query });
}
