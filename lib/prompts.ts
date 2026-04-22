export type AiTarget = "chatgpt" | "claude" | "v0" | "cursor";

export type PromptEntry = {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  summary: string;
  author?: string;
  prompts: Record<AiTarget, string>;
};

export const categories = [
  { id: "auth", label: "Auth" },
  { id: "dashboards", label: "Dashboards" },
  { id: "landing", label: "Landing pages" },
  { id: "pricing", label: "Pricing" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
] as const;

export type Category = (typeof categories)[number]["id"];

const SHARED_FOOTER =
  "Use TailwindCSS. No external UI libraries. Keep it responsive and accessible. Return a single self-contained component.";

export const prompts: PromptEntry[] = [
  {
    id: "glass-login",
    title: "Glassmorphism Login",
    category: "auth",
    tags: ["glassmorphism", "form", "dark"],
    summary:
      "A frosted-glass sign-in card floating over a soft gradient, with email + password and a social row.",
    prompts: {
      chatgpt: `Design a premium sign-in screen for a modern SaaS product.

Requirements:
- A single centered "glass" card (backdrop blur, 1px white/10 border, subtle inner highlight at top).
- Soft purple-to-blue gradient background with 2 blurred orbs.
- Email + password fields with floating labels, a "Forgot password?" link, and a primary CTA.
- Divider reading "or continue with" and three social buttons (Google, GitHub, Apple) in a row.
- Fine print link to sign up at the bottom.
- Dark theme. Use generous spacing, 14–15px body, 24–28px card radius. ${SHARED_FOOTER}`,
      claude: `Create a polished glassmorphism sign-in component.

Structure: Centered card over a radial purple/blue gradient. Card uses backdrop-blur-xl, 1px border of white/10, and a faint top highlight via an inner gradient overlay.

Fields: email, password (with show/hide toggle), "Forgot password?" link right-aligned, primary gradient button "Sign in", divider, three equal-width OAuth buttons (Google, GitHub, Apple).

Typography: Geist/Inter, tracking-tight headings, calm neutral copy. Dark theme only. Ensure labels are associated with inputs and the form is keyboard-navigable. ${SHARED_FOOTER}`,
      v0: `A glassmorphism sign-in card. Backdrop blur, white/10 border, radial purple+blue gradient background with blurred orbs. Email + password fields with floating labels, forgot password link, gradient primary button, divider "or continue with", and Google/GitHub/Apple buttons. Dark theme, 28px radius, tailwind only.`,
      cursor: `Generate app/(auth)/sign-in/page.tsx — a glassmorphism sign-in card. Use TailwindCSS. Centered card with backdrop-blur-xl, border border-white/10, bg-white/5. Background: fixed radial gradients (purple 600 -> blue 600) with two blurred orbs. Include email + password (with toggle), forgot-password link, gradient primary button, OAuth row (Google/GitHub/Apple), sign-up footer. Accessible labels, form submits on enter.`,
    },
  },
  {
    id: "saas-pricing",
    title: "Three-tier SaaS Pricing",
    category: "pricing",
    tags: ["pricing", "cards", "comparison"],
    summary:
      "Free / Pro / Team pricing cards with a featured middle tier, monthly/yearly toggle, and feature checklist.",
    prompts: {
      chatgpt: `Design a three-tier SaaS pricing section (Free, Pro, Team) with a centered monthly/yearly toggle above the cards.

- The middle card (Pro) is visually lifted: slightly larger, gradient border, a "Most popular" badge.
- Each card shows: tier name, one-line description, large price with /mo suffix, primary CTA, then a feature checklist with green check icons.
- 12 columns, 3 cards, equal height. Dark theme, generous padding, soft dividers. ${SHARED_FOOTER}`,
      claude: `Build a pricing section with three tiers: Free, Pro (featured), Team. Above the grid, a segmented toggle switches between Monthly and Yearly (yearly shows a "save 20%" chip).

Each card: 1px border, 20px radius, 28–32px inner padding. Pro tier has a gradient border wrapper and a small pill badge reading "Most popular" floating at the top edge. Prices animate when toggling billing period (crossfade). Feature list uses 16x16 check icons with muted labels. CTAs: "Get started" (Free), "Start free trial" (Pro, primary gradient), "Contact sales" (Team). ${SHARED_FOOTER}`,
      v0: `Pricing section, 3 tiers (Free / Pro / Team). Monthly–yearly toggle on top with a "save 20%" badge. Middle tier featured with gradient border and "Most popular" badge. Cards: price, description, CTA, feature checklist. Dark, tailwind only.`,
      cursor: `Create components/pricing.tsx — three-tier pricing (Free, Pro, Team). Props: billing: "monthly" | "yearly". Include a toggle as a separate client component. Middle card is featured via a wrapping gradient div (padding 1px) with a "Most popular" badge. Use semantic <ul> for features. Tailwind only.`,
    },
  },
  {
    id: "analytics-card",
    title: "Analytics Stat Card with Sparkline",
    category: "dashboards",
    tags: ["stat", "chart", "dashboard"],
    summary:
      "A compact KPI card: label, big number, delta chip, and a sparkline trailing across the bottom.",
    prompts: {
      chatgpt: `Design a compact KPI card for an analytics dashboard.

Top row: small uppercase label (tracking wide, muted) + a subtle info icon (tooltip on hover).
Main: a large number (tabular figures) and a pill chip showing percent delta vs last period — green if positive, red if negative, with a small up/down caret.
Bottom: a smooth sparkline spanning the full card width with a soft gradient fill under the line; the last point is marked with a dot.
Card: 1px border, 16px radius, subtle inner top highlight. Dark theme. ${SHARED_FOOTER}`,
      claude: `Create a reusable <StatCard> component for a dashboard.

Props: label, value, deltaPct, series (number[]), format.

Layout: compact card (260px min-width). Label row at top with muted uppercase text and info icon. Large tabular numeric value, followed by a colored delta pill (green >=0, red <0) with a caret icon. A sparkline SVG fills the bottom, line + gradient-fill area, last point dot. Handles zero/negative gracefully.

Style: border border-white/10, bg-white/[0.03], 16px radius, subtle top highlight overlay. Use aria-label on the sparkline for a11y. ${SHARED_FOOTER}`,
      v0: `KPI stat card: label, big tabular number, +/- delta pill with caret, full-width sparkline with gradient fill and a dot on the last point. Dark, 16px radius, thin border.`,
      cursor: `Implement components/stat-card.tsx (TypeScript). Props: { label: string; value: number; deltaPct: number; series: number[]; format?: "currency"|"number"|"percent" }. Render the sparkline as inline SVG (no chart lib): compute polyline points + an area path for the gradient fill. Use <linearGradient> keyed by id. Tailwind only. Accessible label.`,
    },
  },
  {
    id: "bento-hero",
    title: "Bento Grid Hero Section",
    category: "landing",
    tags: ["hero", "bento", "grid"],
    summary:
      "A modern bento-grid hero with a big headline tile, a product screenshot tile, and 3 supporting feature tiles.",
    prompts: {
      chatgpt: `Design a landing-page hero using a bento grid (5 tiles, 12-column layout).

Tile A (col-span 7, row-span 2): Tagline + H1 headline + 1-line subcopy + primary & secondary CTAs + a subtle "trusted by" row.
Tile B (col-span 5, row-span 2): Product screenshot with a soft drop shadow and a tilted 3D perspective.
Tile C/D/E (col-span 4 each, row-span 1): small feature highlights with a mono icon, 2-word title, 1 line of copy.

Each tile: 1px border, 20px radius, subtle gradient overlay. Dark. Keep whitespace generous. ${SHARED_FOOTER}`,
      claude: `Build a bento-grid hero section for a SaaS landing page. Use a 12-col grid with 3 rows. Primary tile (left, spans 7x2) contains the main pitch. Secondary tile (right, spans 5x2) contains a product screenshot rendered with a faint perspective transform and a gradient glow behind it. The third row contains three equal feature tiles (4 cols each) with icon + title + one-line copy. Maintain consistent 20px radii and 1px borders. Include a subtle animated gradient border on the primary tile. ${SHARED_FOOTER}`,
      v0: `Bento-grid hero, 12 cols × 3 rows. Big pitch tile (7×2), product screenshot tile (5×2) with perspective + glow, and three feature tiles across the bottom. Dark, 20px radii, 1px borders, generous spacing.`,
      cursor: `Create components/hero-bento.tsx. Use CSS grid classes: grid-cols-12 grid-rows-3 gap-4. Tiles: pitch (col-span-7 row-span-2), screenshot (col-span-5 row-span-2), features ×3 (col-span-4 each). Screenshot is a placeholder <div> with transform-gpu rotate-y-6 and a blurred gradient sibling for the glow. All tiles: rounded-2xl border border-white/10 bg-white/[0.03] p-8.`,
    },
  },
  {
    id: "command-palette",
    title: "Command Palette (⌘K)",
    category: "navigation",
    tags: ["cmdk", "overlay", "search"],
    summary:
      "A centered command menu with grouped results, keyboard hints, and recent searches.",
    prompts: {
      chatgpt: `Design a command palette overlay triggered by ⌘K.

Container: dimmed backdrop (bg-black/60 + blur), a centered 640px panel with 1px border, 16px radius, a soft shadow and a subtle top highlight.

Top: a search input with a leading search icon and a "ESC" kbd chip on the right.
Body: scrollable list grouped by section headers ("Recent", "Pages", "Actions"). Each row: leading icon, label, optional subtext, and trailing kbd shortcuts. Hovered/active row has an accent-tinted background and a left accent bar.
Footer: hint row with ↑↓ to navigate, ↵ to select, ESC to close. Dark theme. ${SHARED_FOOTER}`,
      claude: `Create a ⌘K command palette. Layout: full-screen overlay with backdrop-blur and black/60. Panel centered, max-w-xl, rounded-2xl, border border-white/10, bg-[color:var(--color-surface)]. Input at top with search icon and ESC kbd chip. Results grouped ("Recent", "Pages", "Actions"); each item has icon + label + optional kbd shortcut. Selected item uses accent-tinted row with a 2px left accent bar. Footer shows keyboard hints. Keyboard navigation with arrow keys; Enter selects. ${SHARED_FOOTER}`,
      v0: `Command palette overlay (⌘K). Backdrop blur + black/60. Centered 640px panel. Search input with ESC kbd. Grouped results (Recent/Pages/Actions) with icons and shortcuts. Selected row accent-tinted with left bar. Footer keyboard hints. Dark.`,
      cursor: `Implement components/command-palette.tsx — client component. State: open, query, activeIndex. Key handlers: ⌘K to toggle, arrow up/down to move, Enter to run. Render overlay via a portal. Group items with a headers array. Highlighted row uses bg-[color:var(--color-accent-soft)] and a border-l-2 border-[color:var(--color-accent)]. Tailwind only.`,
    },
  },
  {
    id: "toast-notification",
    title: "Toast Notification Stack",
    category: "feedback",
    tags: ["toast", "notifications", "stack"],
    summary:
      "A bottom-right stack of toasts with icon, title, description, and a progress bar timer.",
    prompts: {
      chatgpt: `Design a stack of toast notifications, anchored bottom-right, with a max of 3 visible.

Each toast: 1px border, 14px radius, 360px max width, a leading status icon (success/info/warn/error), a title (medium weight), a subtext, an optional "Undo" link, and a close X. A thin progress bar animates along the bottom edge showing the auto-dismiss timer.

Stack behavior: new toasts slide up from below; older ones compress slightly in scale/opacity behind. Dark theme. ${SHARED_FOOTER}`,
      claude: `Build a toast system with a bottom-right stack. Each toast has: status (success/info/warn/error), title, description, optional action, and duration. Render a max of 3 toasts; extras queue. Toasts slide in from below with a spring-like easing; as new ones appear, previous ones translate up and scale down slightly (0.96) with reduced opacity. A 2px progress bar at the bottom of each toast animates its time remaining. Pause the timer on hover. ${SHARED_FOOTER}`,
      v0: `Bottom-right toast stack, max 3 visible. Each toast: icon, title, subtext, close X, thin progress bar along the bottom. New toasts slide up; older ones compress behind. Dark theme, 14px radius.`,
      cursor: `Create lib/toast.tsx with a Toaster provider + useToast hook. Toast shape: { id, status, title, description?, duration?, action? }. Maintain a queue; render up to 3 in a fixed bottom-right container. Animate mount/unmount with CSS transitions (translateY + opacity). Include a progress bar that shrinks from 100% -> 0% over duration; pause on hover via state.`,
    },
  },
];

export function getPrompt(id: string) {
  return prompts.find((p) => p.id === id);
}
