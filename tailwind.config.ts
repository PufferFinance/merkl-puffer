import { generateTailwindConfig } from "dappkit/src/utils/tailwind";
import type { Config } from "tailwindcss";

export default {
	content: ["./{app,dappkit}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		...generateTailwindConfig(),
		extend: {
			fontFamily: {
				sans: [
					'"Inter"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
	},
	plugins: [],
} satisfies Config;
