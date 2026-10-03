import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],

  base: "/Assignment-15/",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});