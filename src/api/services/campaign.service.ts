import type { Campaign } from "@angleprotocol/merkl-api";
import { api } from "../index.server";

export abstract class CampaignService {
  // ------ Fetch all campaigns
  static async get(): Promise<Campaign[]> {
    const { data } = await api.v4.campaigns.index.get({ query: {} });

    return data;
  }

  // ------ Fetch a campaign by ID
  static async getByID(Id: string): Promise<Campaign | null> {
    return null;
  }
}
