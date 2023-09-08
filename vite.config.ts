import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import inject from "@rollup/plugin-inject";
const esbuildShim = require.resolve("node-stdlib-browser/helpers/esbuild/shim");

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: stdLibBrowser } = await import("node-stdlib-browser");
  return {
    resolve: {
      alias: stdLibBrowser,
    },
    optimizeDeps: {
      include: ["buffer", "process"],
    },
    plugins: [
      react(),
      {
        ...inject({
          global: [esbuildShim, "global"],
          process: [esbuildShim, "process"],
          Buffer: [esbuildShim, "Buffer"],
        }),
        enforce: "post",
      },
    ],
  };
});
