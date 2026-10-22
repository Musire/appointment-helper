
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  resolve: {
    tsconfigPaths: true,
  },

  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    include: [
      "tests/unit/**/*.test.ts",
      "tests/components/**/*.test.tsx",
      "tests/integration/**/*.test.ts",
    ],
  },
});
