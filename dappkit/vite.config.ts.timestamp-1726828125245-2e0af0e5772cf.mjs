// vite.config.ts
import { defineConfig } from "file:///home/clmnt/dev/angle/merkl-zksync/libs/dappkit/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///home/clmnt/dev/angle/merkl-zksync/libs/dappkit/node_modules/tailwindcss/lib/index.js";
import dts from "file:///home/clmnt/dev/angle/merkl-zksync/libs/dappkit/node_modules/vite-plugin-dts/dist/index.mjs";
import react from "file:///home/clmnt/dev/angle/merkl-zksync/libs/dappkit/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "/home/clmnt/dev/angle/merkl-zksync/libs/dappkit";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/index.ts"),
      name: "dappkit",
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss"
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [react(), dts({ rollupTypes: true })],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__vite_injected_original_dirname, "./src/"),
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9jbG1udC9kZXYvYW5nbGUvbWVya2wtemtzeW5jL2xpYnMvZGFwcGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvY2xtbnQvZGV2L2FuZ2xlL21lcmtsLXprc3luYy9saWJzL2RhcHBraXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvY2xtbnQvZGV2L2FuZ2xlL21lcmtsLXprc3luYy9saWJzL2RhcHBraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2luZGV4LnRzXCIpLFxuICAgICAgbmFtZTogXCJkYXBwa2l0XCIsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGluZGV4LiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJ0YWlsd2luZGNzc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgICAgdGFpbHdpbmRjc3M6IFwidGFpbHdpbmRjc3NcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBkdHMoeyByb2xsdXBUeXBlczogdHJ1ZSB9KV0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzc10sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvXCIpLFxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFFNVYsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFMakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDL0MsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsYUFBYTtBQUFBLE1BQzlDLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLGFBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxhQUFhLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDN0MsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFdBQVc7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxNQUNyQyxLQUFLLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
