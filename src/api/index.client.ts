import { MerklApi } from "@angleprotocol/merkl-api";

console.log((window as any)?.ENV?.API_URL ?? "https://api.merkl.xyz");


const api = MerklApi((window as any)?.ENV?.API_URL ?? "https://api.merkl.xyz");

export { api };
