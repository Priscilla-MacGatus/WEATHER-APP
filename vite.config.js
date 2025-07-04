import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Change this to your backend URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS
      },
    },
  },
});
