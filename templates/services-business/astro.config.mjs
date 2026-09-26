import { defineConfig } from "astro/config";

// Static output; served by nginx from dist/ (see Dockerfile) for preview deploys.
export default defineConfig({
  output: "static",
});
