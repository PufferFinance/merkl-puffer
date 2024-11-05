import type { Opportunity } from "@angleprotocol/merkl-api";
import type { Themes } from "dappkit";

export function getCampaignType(labelOrShort: string): Opportunity["type"] | undefined {
  //TODO
}

export type MerklConfig<T extends Themes> = {
  themes: T;
  defaultTheme: keyof T;
};
