import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
  },
  define: {
    "process.env": process.env,
  },
});
