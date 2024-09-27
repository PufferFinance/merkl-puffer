import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path"
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [
    svgr(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      dappkit: path.resolve(__dirname, "./src/dappkit")
    }
  }
});
