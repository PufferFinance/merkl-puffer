import type { Campaign } from "@angleprotocol/merkl-api";
import { api } from "../index.server";

class CampaignService {
  // ------ Fetch all campaigns
  async get(): Promise<Campaign[]> {
    const { data } = await api.v4.campaigns.index.get({ query: {} });
    return data;
  }

  // ------ Fetch a campaign by ID
  async getByID(Id: string): Promise<Campaign> {
    return "To implements";
  }
}

export const campaignService = new CampaignService();
