import { generateTailwindConfig } from "./src/dappkit/utils/tailwind";
import type { Config } from "tailwindcss";

export default {
	content: ["./{app,src}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: generateTailwindConfig(),
	plugins: [],
} satisfies Config;
