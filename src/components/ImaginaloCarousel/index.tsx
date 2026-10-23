import { Suspense, lazy, useEffect, useMemo, useState, ComponentType } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SupportedLanguage } from "../../i18n/translations";

// Copias estáticas de la primera imagen de cada categoría de Imaginalo
// (src/assets/imaginaloPreview/*.js), para mostrar un carrousel automático
// representativo sin depender en vivo del repo de Imaginalo.
const MODULES = import.meta.glob("../../assets/imaginaloPreview/*.js") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;
const MODULES_BY_NAME: Record<string, () => Promise<{ default: ComponentType }>> = {};
Object.entries(MODULES).forEach(([path, loader]) => {
  const name = path.split("/").pop()!.replace(/\.js$/, "");
  MODULES_BY_NAME[name] = loader;
});

const ROTATE_MS = 2200;
const ACCENT = "#e74c3c";
const TILE_BORDER = "#1f254d";
const TILE_TEXT = "#59607a";

// Mismos nombres de categoría que usa imaginaloReact (src/i18n/translations.ts
// → categoryRiddles/categoryMovies/etc), + "jugadores" que ahí está
// deshabilitada del menú pero el asset de preview ya existía.
const CATEGORY_LABELS: Record<SupportedLanguage, Record<string, string>> = {
  es: {
    acertijos: "ACERTIJOS", banderas: "BANDERAS", emojis: "EMOJIS", escudos: "ESCUDOS",
    funkos: "FUNKOS", jugadores: "JUGADORES", marcas: "LOGOS", peliculas: "PELICULAS", sombras: "SOMBRAS",
  },
  en: {
    acertijos: "RIDDLES", banderas: "FLAGS", emojis: "EMOJIS", escudos: "SHIELDS",
    funkos: "FUNKOS", jugadores: "PLAYERS", marcas: "LOGOS", peliculas: "MOVIES", sombras: "SHADOWS",
  },
  pt: {
    acertijos: "ENIGMAS", banderas: "BANDEIRAS", emojis: "EMOJIS", escudos: "ESCUDOS",
    funkos: "FUNKOS", jugadores: "JOGADORES", marcas: "LOGOS", peliculas: "FILMES", sombras: "SOMBRAS",
  },
  // fr ya no está en el selector de idiomas, pero el tipo lo sigue incluyendo.
  fr: {
    acertijos: "ENIGMES", banderas: "DRAPEAUX", emojis: "EMOJIS", escudos: "ECUSSONS",
    funkos: "FUNKOS", jugadores: "JOUEURS", marcas: "LOGOS", peliculas: "FILMS", sombras: "OMBRES",
  },
};

type LocalizedField = string | Partial<Record<SupportedLanguage, string>>;

function resolveLocalized(field: LocalizedField, lang: SupportedLanguage): string {
  if (typeof field === "string") return field;
  return field[lang] ?? field.es ?? "";
}

// `respuesta` tal como está en los .json reales de imaginaloReact ("|" separa
// renglones de fichas, igual que en el juego real) — mismo texto en es/pt
// salvo que haya una traducción real disponible (peliculas_en.json,
// emojis_en.json) o, para "acertijos", un asset de imagen totalmente
// distinto en inglés (wuzzles1.js en vez de adivinanzas1.js, igual que hace
// game.tsx: ACERTIJOS + currentLanguage==="en" → wuzzlesData).
const SLIDES: Array<{ category: string; moduleKey: LocalizedField; answer: LocalizedField }> = [
  { category: "acertijos", moduleKey: { es: "adivinanzas1", pt: "adivinanzas1", en: "wuzzles1" }, answer: { es: "LUNATICO", pt: "LUNATICO", en: "HEADCOUNT" } },
  { category: "banderas", moduleKey: "banderas1", answer: "ARGENTINA" },
  { category: "emojis", moduleKey: "emojis1", answer: { es: "UNA AVENTURA|EXTRAORDINARIA", pt: "UNA AVENTURA|EXTRAORDINARIA", en: "LIFE OF PI" } },
  { category: "escudos", moduleKey: "escudos1", answer: "RIVER|PLATE" },
  { category: "funkos", moduleKey: "funkos1", answer: "EL CHAVO|DEL 8" },
  { category: "jugadores", moduleKey: "jugadores1", answer: "LIONEL|MESSI" },
  { category: "marcas", moduleKey: "marcas1", answer: "THE NEW|YORK TIMES" },
  { category: "peliculas", moduleKey: "peliculas1", answer: { es: "VOLVER AL|FUTURO", pt: "VOLVER AL|FUTURO", en: "BACK TO|THE FUTURE" } },
  { category: "sombras", moduleKey: "sombras1", answer: "GARFIELD" },
];

// Ancho disponible asumido conservador (la card más angosta del grid de 2
// columnas en mobile) para que ningún renglón de fichas desborde — mismo
// espíritu que el cálculo real de game.tsx (maxCharsPerRow) pero sin medir
// el viewport de verdad.
const ASSUMED_WIDTH_PX = 110;

interface ImaginaloCarouselProps {
  lang?: SupportedLanguage;
}

export default function ImaginaloCarousel({ lang = "es" }: ImaginaloCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];
  const label = CATEGORY_LABELS[lang]?.[slide.category] ?? CATEGORY_LABELS.es[slide.category];
  const moduleName = resolveLocalized(slide.moduleKey, lang);
  const answer = resolveLocalized(slide.answer, lang);
  const Comp = useMemo(() => lazy(MODULES_BY_NAME[moduleName]), [moduleName]);

  const rows = answer.split("|");
  const tileSize = useMemo(() => {
    const maxRowLetters = Math.max(
      ...rows.map((row) => row.replace(/ /g, "").length),
    );
    return Math.max(8, Math.min(12, Math.floor(ASSUMED_WIDTH_PX / maxRowLetters)));
  }, [answer]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        "& .fade-in": { animation: "fadeIn 0.4s ease" },
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <Box key={`${slide.category}-${lang}`} className="fade-in" sx={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.5,
      }}>
        <Typography sx={{
          color: ACCENT, fontWeight: 800, fontSize: 11, letterSpacing: "0.5px",
          textAlign: "center", lineHeight: 1.1,
        }}>
          {label}
        </Typography>

        <Box sx={{
          flex: 1, minHeight: 0, width: "62%",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid #000", borderRadius: 1, backgroundColor: "#fff",
          overflow: "hidden", p: 0.5,
        }}>
          <Suspense fallback={null}>
            <Comp />
          </Suspense>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: `${Math.max(1, tileSize * 0.15)}px` }}>
          {rows.map((row, rowIndex) => (
            <Box key={rowIndex} sx={{ display: "flex", alignItems: "center", gap: `${tileSize * 0.5}px` }}>
              {row.split(" ").map((word, wordIndex) => (
                <Box key={wordIndex} sx={{ display: "flex", gap: `${Math.max(1, tileSize * 0.12)}px` }}>
                  {word.split("").map((char, charIndex) => (
                    <Box
                      key={charIndex}
                      sx={{
                        width: tileSize, height: tileSize,
                        borderRadius: "2px", border: `1.5px solid ${TILE_BORDER}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: tileSize * 0.62, fontWeight: 700, color: TILE_TEXT,
                        lineHeight: 1, backgroundColor: "#fff",
                      }}
                    >
                      {char}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
