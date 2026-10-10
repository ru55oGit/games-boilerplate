import Box from "@mui/material/Box";

// Banner fijo del hub (no es un ad_slot real, ver Home.tsx) que invita a
// anunciar en los juegos de Boludeando. A diferencia de AdSlotAvailableBanner
// (que vive en cada juego individual, "este espacio está libre"), acá el
// mensaje es sobre el hub entero y muestra los 3 formatos/precios reales que
// se venden (ver adFormats.ts en boludeando-ads) en vez de un solo precio —
// por eso es un componente propio, ya no el genérico copiado del SDK.
//
// es/en/pt — mismo alcance que adFallbackCopy.ts en boludeando-ads; fr (el
// hub soporta es/en/pt/fr, ver LanguageContext.tsx) cae a español por ahora.
const SIGNUP_URL = "https://ads-api.boludeando.com/login";

interface HubAdPromoCopy {
  kicker: string;
  headline: string;
  perWeek: string;
  tierLabels: [string, string, string];
  ariaLabel: string;
}

const COPY: Record<string, HubAdPromoCopy> = {
  es: {
    kicker: "Espacio publicitario disponible",
    headline: "Anunciá en los juegos de Boludeando",
    perWeek: "/sem",
    tierLabels: ["Banner", "Banner doble", "Rewarded"],
    ariaLabel: "Anunciá en los juegos de Boludeando — planes desde $1000 por semana",
  },
  en: {
    kicker: "Advertising space available",
    headline: "Advertise across Boludeando's games",
    perWeek: "/wk",
    tierLabels: ["Banner", "Double banner", "Rewarded"],
    ariaLabel: "Advertise across Boludeando's games — plans from $1000 a week",
  },
  pt: {
    kicker: "Espaço publicitário disponível",
    headline: "Anuncie nos jogos do Boludeando",
    perWeek: "/sem",
    tierLabels: ["Banner", "Banner duplo", "Recompensado"],
    ariaLabel: "Anuncie nos jogos do Boludeando — planos a partir de $1000 por semana",
  },
};

function getCopy(locale: string | undefined): HubAdPromoCopy {
  return COPY[locale ?? "es"] ?? COPY.es;
}

const TIER_PRICES = [1000, 2000, 3500];

interface HubAdPromoBannerProps {
  locale?: string;
  accentColor?: string;
  inkColor?: string;
}

export default function HubAdPromoBanner({ locale, accentColor = "#e74c3c", inkColor = "#3a1512" }: HubAdPromoBannerProps) {
  const copy = getCopy(locale);
  const paper = "#fff8f3";

  return (
    <Box
      component="a"
      href={SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.ariaLabel}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1.5,
        width: "100%",
        mx: "auto",
        boxSizing: "border-box",
        minHeight: 190,
        p: "18px 20px",
        backgroundColor: paper,
        borderRadius: "24px",
        textDecoration: "none",
        color: inkColor,
        overflow: "hidden",
        isolation: "isolate",
        transition: "transform 0.15s ease",
        "&:hover": { transform: "translateY(-1px)" },
        "&:active": { transform: "scale(0.985)" },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "5px",
          borderRadius: "19px",
          border: `2px dashed ${accentColor}73`,
          pointerEvents: "none",
          zIndex: -1,
        },
      }}
    >
      <Box>
        <Box component="span" sx={{ display: "block", fontSize: 13, fontWeight: 700, color: `${inkColor}99`, mb: 0.5 }}>
          {copy.kicker}
        </Box>
        <Box
          component="span"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: 20,
            lineHeight: "26px",
            fontWeight: 900,
            letterSpacing: "-0.01em",
          }}
        >
          {copy.headline}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 2.5 }}>
          {copy.tierLabels.map((label, i) => (
            <Box key={label}>
              <Box component="span" sx={{ display: "block", fontSize: 11, fontWeight: 700, color: `${inkColor}99` }}>
                {label}
              </Box>
              <Box component="span" sx={{ display: "block", fontSize: 15, fontWeight: 900, color: accentColor, whiteSpace: "nowrap" }}>
                ${TIER_PRICES[i]}
                <Box component="span" sx={{ fontSize: 10, fontWeight: 800 }}>
                  {copy.perWeek}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: inkColor,
            color: paper,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={22}
            height={22}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
