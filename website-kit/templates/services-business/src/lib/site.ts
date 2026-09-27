/**
 * Per-client site configuration (nav, contact, brand). create-client rewrites
 * these values for each client; here they hold the demo business content.
 */
export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "Meridian Bookkeeping & Advisory",
  shortName: "Meridian",
  tagline: "Bookkeeping and accounts for growing UK small businesses.",
  url: "https://meridian-bookkeeping.example",
  email: "hello@meridian-bookkeeping.example",
  phone: "+44 161 555 0142",
  phoneHref: "tel:+441615550142",
  whatsapp: "https://wa.me/441615550142",
  address: "Suite 4, 122 Deansgate, Manchester M3 2BW",
  companyNumber: "12345678",
  vatNumber: "GB 123 4567 89",
  navigation: { sticky: true, menuLabel: "Menu", closeLabel: "Close" },
  navCta: { label: "Get a quote", href: "/contact" },
  nav: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavLink[],
  legalNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ] as NavLink[],
} as const;
