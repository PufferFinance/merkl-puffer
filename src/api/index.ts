import { MerklApi } from "@angleprotocol/merkl-api";

<<<<<<< HEAD
const local = "http://localhost:6007";
const production = "https://api.merkl.xyz";
const staging = "https://api-staging.merkl.xyz";

const api = MerklApi(staging);
=======
const endpoint = "https://api.merkl.xyz";
const api = MerklApi("http://localhost:6007");
>>>>>>> b6eb8ee (add: campaign display with updated api)

export { api };
