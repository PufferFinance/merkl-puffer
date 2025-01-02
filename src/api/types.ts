import type { MerklApi } from "@merkl/api";
import type { SerializeFrom, TypedResponse } from "@remix-run/node";

export type Api = ReturnType<typeof MerklApi>;

/**
 * Type returned through a loader
 * @description helps with inconsistencies of the implicit type when returned through the remix json() loader
 */
export type Fetched<T> = SerializeFrom<() => TypedResponse<T>>;
