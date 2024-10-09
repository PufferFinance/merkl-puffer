import type {App, Opportunity} from "merkl-api"
import { edenFetch, treaty } from '@elysiajs/eden'

const endpoint = "https://api.merkl.xyz"
const api = treaty<App>("http://localhost:6007");

export {
    api
}