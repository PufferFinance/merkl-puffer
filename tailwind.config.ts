import { generateTailwindConfig } from "dappkit/src/utils/tailwind";

export default {
  content: [
    "./{src,packages}/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "!./packages/**/node_modules/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: { ...generateTailwindConfig(), 
    fontFamily: { ...generateTailwindConfig().fontFamily,   
    title: [ '"Recoleta", serif' ],
    text: [ '"Inter", sans-serif' ],
    mono: [ '"Space Mono", sans-serif' ] } },
  plugins: [],
} satisfies Config;
