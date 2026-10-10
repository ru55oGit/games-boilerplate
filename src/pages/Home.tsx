import { ReactNode } from "react";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import LanguageSelector from "../components/LanguageSelector";
import HubAdPromoBanner from "../ads/HubAdPromoBanner";
import ShareButtons from "../ads/ShareButtons";
import { useLanguage } from "../i18n/LanguageContext";
import ImaginaloCarousel from "../components/ImaginaloCarousel";
import {
  TuttifrutaloPreview,
  EnsopaloPreview,
  EnganchaloPreview,
  EnroscadoPreview,
  LetrisPreview,
  EmojionadoPreview,
  ViborealoPreview,
} from "../components/GamePreviews";

// es/en/pt — mismo alcance que el resto del hub (adFallbackCopy.ts,
// HubAdPromoBanner, ShareButtons); fr ya no está en el selector pero por
// las dudas cae a español si queda guardado en localStorage de antes.
interface LocalizedDescription {
  es: string;
  en: string;
  pt: string;
}

interface GameEntry {
  name: string;
  description: LocalizedDescription;
  url: string;
  preview: ReactNode;
}

function d(es: string, en: string, pt: string): LocalizedDescription {
  return { es, en, pt };
}

// Los nombres (Imaginalo, Ensopalo, etc.) son marca propia, no se traducen.
// `scale` agranda el contenido interno de los previews con tamaño fijo en
// desktop (Ensopalo e Imaginalo ya escalan solos, por eso no lo reciben).
function buildGames(scale: number): GameEntry[] {
  return [
    {
      name: "Imaginalo",
      description: d(
        "Adiviná qué representa una imagen entre banderas, funkos, escudos, sombras, logos y muchas categorías más.",
        "Guess what an image represents — flags, funkos, crests, shadows, logos, and many more categories.",
        "Adivinhe o que uma imagem representa entre bandeiras, funkos, escudos, sombras, logos e muitas outras categorias.",
      ),
      url: "https://imaginaloapp.com?from=boludeando",
      preview: <ImaginaloCarousel />,
    },
    {
      name: "Ensopalo",
      description: d(
        "Buscá palabras ocultas —horizontal, vertical o en diagonal— en una sopa de letras nueva cada día.",
        "Find hidden words — horizontal, vertical, or diagonal — in a new word search every day.",
        "Encontre palavras escondidas — na horizontal, vertical ou diagonal — numa caça-palavras nova todo dia.",
      ),
      url: "https://ensopalo.com?from=boludeando",
      preview: <EnsopaloPreview />,
    },
    {
      name: "Letris",
      description: d(
        "Caen fichas de letras tipo Tetris y armás palabras conectando letras adyacentes.",
        "Letter tiles fall Tetris-style and you build words by connecting adjacent letters.",
        "Caem fichas de letras estilo Tetris e você forma palavras conectando letras vizinhas.",
      ),
      url: "https://letris.net?from=boludeando",
      preview: <LetrisPreview scale={scale} />,
    },
    {
      name: "Viborealo",
      description: d(
        "La viborita clásica: comé letras para sumarlas al cuerpo y formá palabras para hacerlas desaparecer y sumar puntos.",
        "The classic snake game: eat letters to add them to your body and form words to clear them and score points.",
        "A cobrinha clássica: coma letras para somá-las ao corpo e forme palavras para fazê-las desaparecer e somar pontos.",
      ),
      url: "https://viborealo.com?from=boludeando",
      preview: <ViborealoPreview scale={scale} />,
    },
    {
      name: "Enroscado",
      description: d(
        "Es un rosco tipo Pasapalabra: respondé una definición por cada letra del abecedario, contrarreloj.",
        "A word-ring challenge: answer one clue per letter of the alphabet, against the clock.",
        "Um desafio em roda de perguntas: responda uma definição para cada letra do alfabeto, contra o tempo.",
      ),
      url: "https://enroscado.com?from=boludeando",
      preview: <EnroscadoPreview scale={scale} />,
    },
    {
      name: "Enganchalo",
      description: d(
        "Encadená palabras: cada una empieza con la última sílaba de la anterior.",
        "Chain words together: each one starts with the last syllable of the previous one.",
        "Encadeie palavras: cada uma começa com a última sílaba da anterior.",
      ),
      url: "https://enganchalo.com?from=boludeando",
      preview: <EnganchaloPreview scale={scale} />,
    },
    {
      name: "Emojionado",
      description: d(
        "Elegí una categoría de acertijos con emojis: encontrar el diferente, adivinar películas, banderas o qué representa cada uno.",
        "Pick an emoji-riddle category: spot the odd one out, guess the movie, the flag, or what each emoji represents.",
        "Escolha uma categoria de charadas com emojis: encontrar o diferente, adivinhar filmes, bandeiras ou o que cada um representa.",
      ),
      url: "https://emojionado.com?from=boludeando",
      preview: <EmojionadoPreview scale={scale} />,
    },
    {
      name: "Tuttifrutalo",
      description: d(
        "Elegís una letra y, contrarreloj, completás una palabra por cada categoría que empiece con esa letra.",
        "Pick a letter and, against the clock, complete a word for each category that starts with that letter.",
        "Escolha uma letra e, contra o tempo, complete uma palavra para cada categoria que comece com essa letra.",
      ),
      url: "https://tuttifrutalo.com?from=boludeando",
      preview: <TuttifrutaloPreview scale={scale} />,
    },
  ];
}

export default function Home() {
  const { t, currentLanguage } = useLanguage();
  // Media query fija (mismo corte que el breakpoint "md" de MUI) en vez de
  // theme.breakpoints.up("md"): esta app no tiene ThemeProvider, y useTheme()
  // creando el theme por default rompía el bundle de Vite.
  const isDesktop = useMediaQuery("(min-width:900px)");
  const games = buildGames(isDesktop ? 1.6 : 1);

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

        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: { xs: 13, sm: 14 },
            lineHeight: 1.6,
            textAlign: "center",
            maxWidth: 640,
            mx: "auto",
          }}
        >
          {t.manifesto}
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 20, sm: 24 }, textAlign: "center" }}>
          {t.subtitle}
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.25 }}>
          {games.map((game) => {
            // Imaginalo no tiene contenido armado en portugués todavía (ver
            // memoria del proyecto) — en vez de mandar a un jugador PT a un
            // juego que se le va a mostrar en otro idioma, se deshabilita la
            // card entera mientras currentLanguage sea "pt" (2026-10-10).
            const isUnavailable = currentLanguage === "pt" && game.name === "Imaginalo";
            return (
            <Box
              key={game.name}
              component={isUnavailable ? "div" : "a"}
              href={isUnavailable ? undefined : game.url}
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
                opacity: isUnavailable ? 0.5 : 1,
                cursor: isUnavailable ? "not-allowed" : "pointer",
                "&:active": { transform: isUnavailable ? "none" : "scale(0.98)" },
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
                {game.description[currentLanguage as keyof LocalizedDescription] ?? game.description.es}
              </Typography>

              <Box
                sx={{
                  alignSelf: "center",
                  borderRadius: 999,
                  backgroundColor: isUnavailable ? "#aaa" : "#e74c3c",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 12,
                  px: 2,
                  py: 0.7,
                  mt: 0.25,
                }}
              >
                {isUnavailable ? "Não disponível em PT" : t.playButton}
              </Box>
            </Box>
            );
          })}
        </Box>

        {/* Banner fijo "anunciá acá" — no es un ad_slot real, nunca se
            reemplaza por una campaña comprada. Siempre hay un lugar visible
            para que alguien descubra que puede anunciar en la hub, incluso
            si todos los slots de verdad de los juegos ya están vendidos
            (2026-10-09). Doble, con los 3 precios reales (2026-10-10). */}
        <HubAdPromoBanner locale={currentLanguage} />
        <ShareButtons locale={currentLanguage} />
      </Box>
    </Layout>
  );
}
