import { MerklApi } from "@angleprotocol/merkl-api";

const local = "http://localhost:6007";
const production = "https://api.merkl.xyz";
const staging = "https://api-staging.merkl.xyz";

const api = MerklApi(staging);

export { api };
