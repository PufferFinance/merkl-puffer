import { MerklApi } from "@angleprotocol/merkl-api";

const local = "http://localhost:6007";
const prod = "https://api.merkl.xyz";

const api = MerklApi(local);

export { api };
