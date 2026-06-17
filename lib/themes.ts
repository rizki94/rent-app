export type ThemeKey =
  | "navy_gold"
  | "urban_dark"
  | "elegant_black"
  | "racing_red"
  | "forest_green"
  | "midnight_blue";

export interface Theme {
  key: ThemeKey;
  name: string;
  description: string;
  /** CSS hex or rgb values injected into :root as custom properties */
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    accentFg: string;
    heroFrom: string;
    heroTo: string;
    heroText: string;
    sectionAlt: string;
    cardBg: string;
    badgeBg: string;
    footerBg: string;
    footerText: string;
    scrollbarThumb: string;
    scrollbarHover: string;
    selection: string;
    /** Border-radius value for UI elements, e.g. "0.75rem", "0px", "99px" */
    radius: string;
  };
  /** Tailwind-style font family hint rendered as a Google Fonts import */
  font: {
    heading: string;
    body: string;
    googleImport: string;
  };
  borderRadius: "rounded" | "sharp" | "pill";
}

export const THEMES: Record<ThemeKey, Theme> = {
  navy_gold: {
    key: "navy_gold",
    name: "Navy Gold",
    description: "Klasik kepercayaan — Biru tua yang mewah dengan aksen emas",
    colors: {
      primary: "#0A274E",
      primaryDark: "#071c38",
      accent: "#F59E0B",
      accentFg: "#0A274E",
      heroFrom: "#0A274E",
      heroTo: "#0d336a",
      heroText: "#FFFFFF",
      sectionAlt: "#f8fafc",
      cardBg: "#FFFFFF",
      badgeBg: "#0A274E",
      footerBg: "#0A274E",
      footerText: "#FFFFFF",
      scrollbarThumb: "#0A274E",
      scrollbarHover: "#FFC800",
      selection: "#0A274E",
      radius: "0.85rem",
    },
    font: {
      heading: "Plus Jakarta Sans",
      body: "Plus Jakarta Sans",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap",
    },
    borderRadius: "rounded",
  },

  urban_dark: {
    key: "urban_dark",
    name: "Urban Dark",
    description: "Urban premium — Hitam legam dengan aksen oranye balap yang berani",
    colors: {
      primary: "#000000",
      primaryDark: "#000000",
      accent: "#FF5E00",
      accentFg: "#FFFFFF",
      heroFrom: "#000000",
      heroTo: "#171717",
      heroText: "#FFFFFF",
      sectionAlt: "#f9fafb",
      cardBg: "#FFFFFF",
      badgeBg: "#000000",
      footerBg: "#000000",
      footerText: "#FFFFFF",
      scrollbarThumb: "#1a1a1a",
      scrollbarHover: "#FF5E00",
      selection: "#FF5E00",
      radius: "0px",
    },
    font: {
      heading: "Oxanium",
      body: "Oxanium",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500;600;700;800;900&display=swap",
    },
    borderRadius: "sharp",
  },

  elegant_black: {
    key: "elegant_black",
    name: "Elegant Black",
    description: "Kelas premium — Hitam legam dengan aksen emas champagne mewah",
    colors: {
      primary: "#1a1a1a",
      primaryDark: "#000000",
      accent: "#C9A84C",
      accentFg: "#1a1a1a",
      heroFrom: "#0d0d0d",
      heroTo: "#1a1a1a",
      heroText: "#F5F0E8",
      sectionAlt: "#FAFAF8",
      cardBg: "#FFFFFF",
      badgeBg: "#1a1a1a",
      footerBg: "#0d0d0d",
      footerText: "#F5F0E8",
      scrollbarThumb: "#1a1a1a",
      scrollbarHover: "#C9A84C",
      selection: "#1a1a1a",
      radius: "0.25rem",
    },
    font: {
      heading: "Cormorant Garamond",
      body: "Jost",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Jost:wght@400;500;600;700&display=swap",
    },
    borderRadius: "sharp",
  },

  racing_red: {
    key: "racing_red",
    name: "Racing Red",
    description: "Bertenaga dan berani — Merah balap dengan energi tinggi",
    colors: {
      primary: "#B91C1C",
      primaryDark: "#7f1d1d",
      accent: "#F59E0B",
      accentFg: "#1a1a1a",
      heroFrom: "#7f1d1d",
      heroTo: "#B91C1C",
      heroText: "#FFFFFF",
      sectionAlt: "#fef2f2",
      cardBg: "#FFFFFF",
      badgeBg: "#B91C1C",
      footerBg: "#1a1a1a",
      footerText: "#FFFFFF",
      scrollbarThumb: "#B91C1C",
      scrollbarHover: "#F59E0B",
      selection: "#B91C1C",
      radius: "0.5rem",
    },
    font: {
      heading: "Barlow Condensed",
      body: "Barlow",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap",
    },
    borderRadius: "rounded",
  },

  forest_green: {
    key: "forest_green",
    name: "Forest Green",
    description: "Ramah dan terpercaya — Hijau alam yang fresh dan menenangkan",
    colors: {
      primary: "#14532D",
      primaryDark: "#052e16",
      accent: "#F59E0B",
      accentFg: "#052e16",
      heroFrom: "#052e16",
      heroTo: "#166534",
      heroText: "#FFFFFF",
      sectionAlt: "#f0fdf4",
      cardBg: "#FFFFFF",
      badgeBg: "#14532D",
      footerBg: "#052e16",
      footerText: "#FFFFFF",
      scrollbarThumb: "#14532D",
      scrollbarHover: "#F59E0B",
      selection: "#14532D",
      radius: "1.5rem",
    },
    font: {
      heading: "Nunito",
      body: "Nunito",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap",
    },
    borderRadius: "pill",
  },

  midnight_blue: {
    key: "midnight_blue",
    name: "Midnight Blue",
    description: "Elegan malam — Biru malam dalam dengan aksen perak metalik",
    colors: {
      primary: "#1e3a5f",
      primaryDark: "#0f2040",
      accent: "#94A3B8",
      accentFg: "#0f2040",
      heroFrom: "#0f2040",
      heroTo: "#1e3a5f",
      heroText: "#E2E8F0",
      sectionAlt: "#f1f5f9",
      cardBg: "#FFFFFF",
      badgeBg: "#1e3a5f",
      footerBg: "#0f2040",
      footerText: "#E2E8F0",
      scrollbarThumb: "#1e3a5f",
      scrollbarHover: "#94A3B8",
      selection: "#1e3a5f",
      radius: "0.75rem",
    },
    font: {
      heading: "Space Grotesk",
      body: "Space Grotesk",
      googleImport:
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
    },
    borderRadius: "rounded",
  },
};

export const DEFAULT_THEME: ThemeKey = "navy_gold";

/** Returns the Theme object, falling back to navy_gold if key is invalid */
export function getTheme(key: string | null | undefined): Theme {
  if (key && key in THEMES) {
    return THEMES[key as ThemeKey];
  }
  return THEMES[DEFAULT_THEME];
}

/** Generates an inline style string of CSS custom properties for the :root */
export function buildThemeCSSVars(theme: Theme): string {
  const c = theme.colors;
  return [
    `--t-primary: ${c.primary}`,
    `--t-primary-dark: ${c.primaryDark}`,
    `--t-accent: ${c.accent}`,
    `--t-accent-fg: ${c.accentFg}`,
    `--t-hero-from: ${c.heroFrom}`,
    `--t-hero-to: ${c.heroTo}`,
    `--t-hero-text: ${c.heroText}`,
    `--t-section-alt: ${c.sectionAlt}`,
    `--t-card-bg: ${c.cardBg}`,
    `--t-badge-bg: ${c.badgeBg}`,
    `--t-footer-bg: ${c.footerBg}`,
    `--t-footer-text: ${c.footerText}`,
    `--t-font-heading: "${theme.font.heading}"`,
    `--t-font-body: "${theme.font.body}"`,
    `--t-radius: ${c.radius}`,
  ].join('; ');
}
