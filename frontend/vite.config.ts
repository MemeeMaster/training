import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@interfaces": "/src/interfaces",
      "@providers": "/src/providers",
      "@style": "/src/style",
      "@env": "/src/env",
      "@views": "/src/views",
      "@config": "/src/config"
    },
  },
});