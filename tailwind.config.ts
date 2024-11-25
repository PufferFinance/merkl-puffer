import { generateTailwindConfig } from "dappkit/src/utils/tailwind";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./{src,packages}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "!./packages/**/node_modules/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: generateTailwindConfig(),
  plugins: [],
} satisfies Config;
