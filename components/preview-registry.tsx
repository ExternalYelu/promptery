import { AnalyticsCardPreview } from "./previews/analytics-card";
import { BentoHeroPreview } from "./previews/bento-hero";
import { CommandPalettePreview } from "./previews/command-palette";
import { GlassLoginPreview } from "./previews/glass-login";
import { SaasPricingPreview } from "./previews/saas-pricing";
import { ToastStackPreview } from "./previews/toast-stack";

export const previewRegistry: Record<string, React.ComponentType> = {
  "glass-login": GlassLoginPreview,
  "saas-pricing": SaasPricingPreview,
  "analytics-card": AnalyticsCardPreview,
  "bento-hero": BentoHeroPreview,
  "command-palette": CommandPalettePreview,
  "toast-notification": ToastStackPreview,
};
