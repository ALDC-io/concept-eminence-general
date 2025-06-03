import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["277f-2001-569-5819-e700-558-5f64-98ee-5a0c.ngrok-free.app"],
  },
});
