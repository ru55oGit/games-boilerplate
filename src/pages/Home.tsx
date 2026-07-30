import { ReactNode } from "react";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import ImaginaloCarousel from "../components/ImaginaloCarousel";
import {
  TuttifrutaloPreview,
  EnsopaloPreview,
  EnganchaloPreview,
  EnroscadoPreview,
  LetrisPreview,
  EmojionadoPreview,
} from "../components/GamePreviews";

interface GameEntry {
  name: string;
  description: string;
  url: string;
  preview: ReactNode;
}

// Descripciones y preview en español tal cual (son nombres propios y
// mecánicas de juego, no hace falta traducirlas por idioma).
const GAMES: GameEntry[] = [
  {
    name: "Ensopalo",
    description: "Buscá palabras ocultas —horizontal, vertical o en diagonal— en una sopa de letras nueva cada día.",
    url: "https://ensopalo.com",
    preview: <EnsopaloPreview />,
  },
  {
    name: "Tuttifrutalo",
    description: "Elegís una letra y, contrarreloj, completás una palabra por cada categoría que empiece con esa letra.",
    url: "https://tuttifrutalo.com",
    preview: <TuttifrutaloPreview />,
  },
  {
    name: "Imaginalo",
    description: "Adiviná qué representa una imagen entre banderas, funkos, escudos, sombras, logos y muchas categorías más.",
    url: "https://imaginaloapp.com",
    preview: <ImaginaloCarousel />,
  },
  {
    name: "Emojionado",
    description: "Elegí una categoría de acertijos con emojis: encontrar el diferente, adivinar películas, banderas o qué representa cada uno.",
    url: "https://emojionado.com",
    preview: <EmojionadoPreview />,
  },
  {
    name: "Enganchalo",
    description: "Encadená palabras: cada una empieza con la última sílaba de la anterior.",
    url: "https://enganchalo.com",
    preview: <EnganchaloPreview />,
  },
  {
    name: "Enroscado",
    description: "Es un rosco tipo Pasapalabra: respondé una definición por cada letra del abecedario, contrarreloj.",
    url: "https://enroscado.com",
    preview: <EnroscadoPreview />,
  },
  {
    name: "Letris",
    description: "Caen fichas de letras tipo Tetris y armás palabras conectando letras adyacentes.",
    url: "https://letris.net",
    preview: <LetrisPreview />,
  },
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

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.25 }}>
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
                flexDirection: "column",
                gap: 0.75,
                p: 1.25,
                boxShadow: "0 6px 16px rgba(0,0,0,0.14)",
                transition: "transform 0.15s ease",
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Lobster, cursive",
                  color: "#e74c3c",
                  fontSize: 19,
                  lineHeight: 1.15,
                  textAlign: "center",
                }}
              >
                {game.name}
              </Typography>

              <Box
                sx={{
                  borderRadius: 3,
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #eee",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  overflow: "hidden",
                }}
              >
                {game.preview}
              </Box>

              <Typography sx={{ color: "#777", fontSize: 11, lineHeight: 1.35, flex: 1 }}>
                {game.description}
              </Typography>

              <Box
                sx={{
                  alignSelf: "center",
                  borderRadius: 999,
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 12,
                  px: 2,
                  py: 0.7,
                  mt: 0.25,
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
