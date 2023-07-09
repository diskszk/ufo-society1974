import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
  server: {
    host: true,
    port: 3000,
  },

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/index.html"),
        404: resolve(__dirname, "/404.html"),
        albums: resolve(__dirname, "/albums.html"),
        diary: resolve(__dirname, "/diary.html"),
        jikosyoukai: resolve(__dirname, "/jikosyoukai.html"),
        link: resolve(__dirname, "/link.html"),
      },
    },
  },
});
