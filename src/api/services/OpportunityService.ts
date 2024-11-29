import { api } from "../index.server";
import type { Opportunity } from "@angleprotocol/merkl-api";

class OpportunityService {
  // ------ Fetch all campaigns
  async get(): Promise<Opportunity[]> {
    const { data } = await api.v4.campaigns.index.get({ query: {} });
    return data;
  }

  // ------ Fetch a campaign by ID
  async getByID(Id: string): Promise<Opportunity> {
    return "To implements";
  }
}

export const opportunityService = new OpportunityService();
