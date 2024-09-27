export type ApiCall<R, T> = {
  fetched: R;
  reduced: T;
};

/**
 * Create a caller that fetches and types an api call
 * @param fetcher how should the call be fetched according to parameters
 * @param route to fetch from
 */
export function createCall<T, R, Q>({
  fetcher,
  reducer,
}: {
  fetcher: (params: Q) => Promise<T>;
  reducer: (fetched: T, params: Q) => R | undefined;
}): (params: Q) => Promise<{ res?: R; err?: string }> {
  return async (params: Q) => {
    const fetched = await fetcher(params);

    //TODO: handle error cases
    return { res: reducer(fetched, params) };
  };
}
