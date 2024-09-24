import QueryString from "qs";

export const API = "https://api.merkl.xyz";

/**
 * Handles a fetch using only query parameters
 * @param endpoint url of the api, likely ANGLE_API
 * @param route to fetch from
 * @param queryObj to map to query params ({a: 1, b: "2"} => [...]/?a=1&b=2)
 */
export async function query<T>(
  endpoint: string,
  route: `/${string}`,
  queryObj: any,
): Promise<{ res?: T; err?: string }> {
  try {
    const res = await fetch(`${endpoint}${route}?${QueryString.stringify(queryObj, { skipNulls: true })}`).then(r =>
      r.json(),
    );

    return { res: res as T };
  } catch (err) {
    return { err: "error" };
  }
}
