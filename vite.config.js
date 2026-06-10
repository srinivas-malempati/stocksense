import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // During local dev, proxy /api calls to a local express server
      // OR run `vercel dev` which handles this automatically
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
