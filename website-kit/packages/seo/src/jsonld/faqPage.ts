/** JSON-LD builder: FAQPage (pairs with the faq block). */
export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqPageJsonLd(items: FaqEntry[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}
