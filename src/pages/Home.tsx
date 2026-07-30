import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

interface GameEntry {
  name: string;
  tagline: string;
  emoji: string;
  url: string;
}

// Tagline en español tal cual la usa cada juego (son nombres propios y
// frases de marca, no hace falta traducirlas por idioma).
const GAMES: GameEntry[] = [
  { name: "Ensopalo", tagline: "buscá · encontrá · ganá", emoji: "🍲", url: "https://ensopalo.com" },
  { name: "Tuttifrutalo", tagline: "una letra · siete categorías · contrarreloj", emoji: "🍓", url: "https://tuttifrutalo.com" },
  { name: "Imaginalo", tagline: "pensá · adiviná · ganá", emoji: "🖼️", url: "https://imaginaloapp.com" },
  { name: "Emojionado", tagline: "observa · clickea · gana", emoji: "😀", url: "https://emojionado.com" },
  { name: "Enganchalo", tagline: "pensá · enganchá · ganás", emoji: "🔗", url: "https://enganchalo.com" },
  { name: "Enroscado", tagline: "pensá · respondé · ganá", emoji: "🌀", url: "https://enroscado.com" },
  { name: "Letris", tagline: "encastrá · formá · sumá", emoji: "🔤", url: "https://letris.net" },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout showFooter>
      <Box sx={{ width: "100%", px: { xs: 1.5, md: 2 }, pb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <LanguageSelector />

        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "2px",
            fontFamily: "Lobster, cursive",
            width: "100%",
            textAlign: "center",
            fontSize: { xs: "3.4rem", sm: "4rem", md: "4.6rem" },
            lineHeight: 1,
          }}
        >
          {t.appTitle}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.64)",
            fontStyle: "italic",
            letterSpacing: "2px",
            width: "100%",
            textAlign: "center",
            fontSize: { xs: 16, md: 20 },
          }}
        >
          {t.tagline}
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 20, sm: 24 }, textAlign: "center" }}>
          {t.subtitle}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {GAMES.map((game) => (
            <Box
              key={game.name}
              component="a"
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "none",
                borderRadius: 4,
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.75,
                boxShadow: "0 6px 16px rgba(0,0,0,0.14)",
                transition: "transform 0.15s ease",
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: "#fdecea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {game.emoji}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "Lobster, cursive",
                    color: "#e74c3c",
                    fontSize: 22,
                    lineHeight: 1.15,
                  }}
                >
                  {game.name}
                </Typography>
                <Typography sx={{ color: "#888", fontSize: 13, fontWeight: 600 }}>
                  {game.tagline}
                </Typography>
              </Box>

              <Box
                sx={{
                  flexShrink: 0,
                  borderRadius: 999,
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  px: 2,
                  py: 0.9,
                }}
              >
                {t.playButton}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}
