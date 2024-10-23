import { generateTailwindConfig } from "dappkit/src/utils/tailwind";
import type { Config } from "tailwindcss";

export default {
	content: ["./{app,src,packages}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: generateTailwindConfig(),
	plugins: [],
} satisfies Config;
