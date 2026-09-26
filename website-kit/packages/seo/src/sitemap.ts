/**
 * Sitemap config helper. Wraps @astrojs/sitemap options so templates share one
 * consistent configuration.
 */
export interface SitemapConfig {
  site: string;
  /** Paths to exclude from the sitemap (e.g. draft/legal). */
  exclude?: string[];
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: number;
}

export function sitemapOptions(config: SitemapConfig) {
  // TODO: map to @astrojs/sitemap integration options; wire into astro.config.
  return {
    filter: (page: string) => !(config.exclude ?? []).some((p) => page.includes(p)),
    changefreq: config.changefreq ?? "weekly",
    priority: config.priority ?? 0.7,
  };
}
