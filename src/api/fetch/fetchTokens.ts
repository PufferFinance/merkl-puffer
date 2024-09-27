import type { ChainId } from "src/config/chains";
import { API, query } from "../endpoint";
import { createCall } from "./call";

export type FetchedToken = {
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  hasPermit: boolean;
  useInSwap: boolean;
  logoURI: string;
};

export type Tokens = {
  [chainId in ChainId]?: { [tokenAddress: string]: FetchedToken };
};

export const fetchTokens = createCall<Tokens, Tokens, { chainIds?: ChainId[]; symbols?: string[] }>({
  async fetcher() {
    const { res, err } = await query(API, "/v1/tokens", {});

    return res as {
      [tokenAddress: string]: FetchedToken;
    };
  },
  reducer(fetched, { symbols, chainIds }) {
    const tokens: {
      [chainId in ChainId]?: { [tokenAddress: string]: FetchedToken };
    } = {};

    if (!symbols && !chainIds) return fetched;

    for (const [chain, values] of Object.entries(fetched)) {
      const chainId = Number.parseInt(chain) as ChainId;

      if (chainIds && !chainIds?.includes(chainId)) continue;
      if (!symbols) {
        tokens[chainId] = values;
        break;
      }

      tokens[chainId] = {};

      for (const [address, token] of Object.entries(values)) {
        if (symbols.map(v => v.toLowerCase()).includes(token.symbol.toLocaleLowerCase()))
          tokens[chainId][address] = token;
      }
    }

    return tokens;
  },
});
