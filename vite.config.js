import { defineConfig } from "vite";

export default defineConfig({
  base: "/lost-conversations/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    open: true,
  },
  define: {
    "process.env": process.env,
  },
});
