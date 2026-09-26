/** JSON-LD builder: Organization. */
export interface OrganizationInput {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  telephone?: string;
}

export function organizationJsonLd(input: OrganizationInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
    ...(input.logo ? { logo: input.logo } : {}),
    ...(input.sameAs ? { sameAs: input.sameAs } : {}),
    ...(input.telephone ? { telephone: input.telephone } : {}),
  };
}
