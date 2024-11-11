import { MerklApi } from "@angleprotocol/merkl-api";

const api = MerklApi(process.env.API_URL ?? "https://api.merkl.xyz");

export { api };
