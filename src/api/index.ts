import { treaty } from "@elysiajs/eden";
import type { App } from "merkl-api";

const endpoint = "https://api.merkl.xyz";
const api = treaty<App>("http://localhost:6007");

export { api };
