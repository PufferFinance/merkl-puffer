import { api } from "../index.server";

function getQueryParams(
  request: Request,
  overrideQuery?: Parameters<typeof api.v4.opportunities.index.get>[0]["query"],
) {
  const status = new URL(request.url).searchParams.get("status");
  const action = new URL(request.url).searchParams.get("action");
  const chainId = new URL(request.url).searchParams.get("chain");
  const page = new URL(request.url).searchParams.get("page");

  const items = new URL(request.url).searchParams.get("items");
  const search = new URL(request.url).searchParams.get("search");
  const [sort, order] = new URL(request.url).searchParams.get("sort")?.split("-") ?? [];

  const filters = Object.assign(
    { status, action, chainId, items, sort, order, name: search, page },
    overrideQuery ?? {},
    page !== null && { page: Number(page) - 1 },
  );

  const query = Object.entries(filters).reduce(
    (_query, [key, filter]) => Object.assign(_query, filter == null ? {} : { [key]: filter }),
    {},
  );

  return query;
}

export async function fetchOpportunities(
  request: Request,
  overrideQuery?: Parameters<typeof api.v4.opportunities.index.get>[0]["query"],
) {
  const query = getQueryParams(request, overrideQuery);

  const { data: count } = await api.v4.opportunities.count.get({ query });
  const { data: opportunities } = await api.v4.opportunities.index.get({
    query,
  });

  if (count === null || !opportunities) throw "Cannot fetch opportunities";
  return { opportunities, count };
}
