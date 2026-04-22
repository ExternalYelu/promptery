export type CaseStudy = {
  slug: string;
  title: string;
  deck: string;
  author: string;
  readingTime: string;
  accent: string;
  sections: { heading: string; body: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "linear-landing-in-three-prompts",
    title: "We rebuilt Linear's landing in 3 prompts",
    deck: "How structured prompts + a design token pass got us from blank page to pixel-close clone in under an hour.",
    author: "Promptery team",
    readingTime: "6 min",
    accent: "#a78bfa",
    sections: [
      {
        heading: "The brief",
        body: [
          "We wanted a reproducible experiment: take a landing page everyone knows — Linear's — and reconstruct it using only AI prompts from our library. No screenshots in the model input, no visual priming. Just prompts.",
          "The goal was to understand which prompt style produced the most predictable output, and whether pairing a component prompt with a theme prompt could substitute for a designer.",
        ],
      },
      {
        heading: "Prompt 1 — structure",
        body: [
          "We started with the Bento Hero prompt from our library. Given to Claude with our structured style, it produced a clean three-zone layout: nav, headline, bento grid. No colors, no typography — just semantic markup and spacing.",
        ],
      },
      {
        heading: "Prompt 2 — the theme pass",
        body: [
          "Next we layered on the Modern Dark theme prompt. One line of instruction — \"apply the following design tokens: …\" — and the result snapped into Linear's signature gradient, weight, and rhythm.",
          "This is the single biggest lesson from the experiment: separate structure from style. Structure prompts are reusable across hundreds of pages; theme prompts are reusable across hundreds of components.",
        ],
      },
      {
        heading: "Prompt 3 — the polish",
        body: [
          "We closed with a targeted remix prompt: tighter letter-spacing, a slightly cooler primary color, and two subtle glow layers. The difference between 85% and 98% is almost always in the micro-polish pass.",
        ],
      },
      {
        heading: "Takeaways",
        body: [
          "1. Structure first, style second. A library of structure prompts + a library of theme prompts is more powerful than either alone.",
          "2. Pick the right model for the job. Claude shines at structured follow-through. v0 is faster for one-shots. ChatGPT holds conversation state best.",
          "3. Every prompt is a commitment. If you can express the same thing with fewer constraints, the model has more room to surprise you — usually for the better.",
        ],
      },
    ],
  },
  {
    slug: "dashboard-in-20-minutes",
    title: "An investor-grade dashboard in 20 minutes",
    deck: "Using Analytics Card + the Swiss Minimalist theme to ship a data view a week ahead of schedule.",
    author: "Ada K.",
    readingTime: "4 min",
    accent: "#38bdf8",
    sections: [
      {
        heading: "Context",
        body: [
          "Pre-seed sprint, deck due Monday. We needed a product screenshot for the product slide that didn't look AI-generated and didn't look like a Figma wireframe. Enter Promptery.",
        ],
      },
      {
        heading: "The stack",
        body: [
          "Analytics Card prompt → Claude → Tailwind. Then wrapped in the Swiss Minimalist theme. We had to change exactly two CSS values: the primary color and the nav width.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Three investors asked which design studio we worked with. It was two prompts and a coffee.",
        ],
      },
    ],
  },
  {
    slug: "design-system-with-claude",
    title: "Bootstrapping a design system with Claude in one afternoon",
    deck: "Why themes-as-prompts scale better than component libraries for early-stage teams.",
    author: "Miko T.",
    readingTime: "5 min",
    accent: "#f472b6",
    sections: [
      {
        heading: "The myth of the early design system",
        body: [
          "Most startups cargo-cult design systems too early. You don't need Tailwind + shadcn + Radix + Storybook when you have three engineers and one customer.",
          "What you need is a consistent visual identity you can apply anywhere, cheaply.",
        ],
      },
      {
        heading: "Themes as the unit",
        body: [
          "A theme prompt is a ~400-token instruction that defines colors, typography, radii, spacing, motion, and tone. Paste it at the top of any generation and your output is on-brand.",
          "This is dramatically easier than maintaining a component library. Updating your look is one edit, not a migration.",
        ],
      },
      {
        heading: "When to graduate",
        body: [
          "Once you have more than ~15 components, invest in actual primitives. Until then, themes-as-prompts will get you 90% of the way.",
        ],
      },
    ],
  },
];
