import type { Tokens } from "src/api/fetch/fetchTokens";
import type { ChainId } from "src/config/chains";
import { create } from "zustand";

export const useTokenStore = create<Tokens>(set => ({
  tokens: {},
  mergeTokens: (next: Tokens) =>
    set(prev => {
      for (const [chain, users] of Object.entries(next)) {
        const chainId = Number.parseInt(chain) as ChainId;

        for (const [user, data] of Object.entries(users)) {
          if (!prev) prev = {};
          if (!prev?.[chainId]) prev[chainId] = {};

          prev[chainId][user] = data;
        }
      }
      return prev;
    }),
}));
