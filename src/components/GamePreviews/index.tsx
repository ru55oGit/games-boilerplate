import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SupportedLanguage } from "../../i18n/translations";

const ACCENT = "#e74c3c";

// Cada preview es una versión chica y estática del bloque que ese juego
// muestra arriba de su propio botón JUGAR, armada con datos de ejemplo
// hardcodeados (no importa nada en vivo de los otros repos).

interface ScaleProps {
  scale?: number;
}

// Letra V + 4 categorías de ejemplo, mismos datos que usa el propio demo de
// tuttifrutaloReact (ver EXAMPLE_ENTRIES en su Home.tsx) + una 4ta
// categoría (nombre) para completar las 4 que pidió el usuario.
const TUTTIFRUTALO_CATEGORY_LABELS: Record<SupportedLanguage, Record<string, string>> = {
  es: { pais: "País", animal: "Animal", color: "Color", nombre: "Nombre" },
  en: { pais: "Country", animal: "Animal", color: "Color", nombre: "Name" },
  pt: { pais: "País", animal: "Animal", color: "Cor", nombre: "Nome" },
  // fr ya no está en el selector de idiomas (ver LanguageContext.tsx), pero
  // el tipo lo sigue incluyendo por si queda guardado en localStorage.
  fr: { pais: "Pays", animal: "Animal", color: "Couleur", nombre: "Prénom" },
};
const TUTTIFRUTALO_ANSWERS: Record<SupportedLanguage, Record<string, string>> = {
  es: { pais: "Venezuela", animal: "Vaca", color: "Verde", nombre: "Valentina" },
  en: { pais: "Venezuela", animal: "Vulture", color: "Violet", nombre: "Victoria" },
  pt: { pais: "Venezuela", animal: "Vaca", color: "Verde", nombre: "Valentina" },
  fr: { pais: "Venezuela", animal: "Vautour", color: "Violet", nombre: "Victoire" },
};
const TUTTIFRUTALO_CATEGORY_ORDER = ["pais", "animal", "color", "nombre"];

interface TuttifrutaloPreviewProps extends ScaleProps {
  lang?: SupportedLanguage;
}

export function TuttifrutaloPreview({ scale = 1, lang = "es" }: TuttifrutaloPreviewProps) {
  const labels = TUTTIFRUTALO_CATEGORY_LABELS[lang] ?? TUTTIFRUTALO_CATEGORY_LABELS.es;
  const answers = TUTTIFRUTALO_ANSWERS[lang] ?? TUTTIFRUTALO_ANSWERS.es;
  const entries = TUTTIFRUTALO_CATEGORY_ORDER.map((key) => ({ label: labels[key], value: answers[key] }));
  const circleSize = 32 * scale;
  return (
    <Box sx={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
      gap: 0.4 * scale, pt: 0.5,
    }}>
      <Box
        sx={{
          width: circleSize, height: circleSize, borderRadius: "50%", backgroundColor: "#fff",
          border: `2px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", fontWeight: 800, fontSize: 15 * scale, color: ACCENT,
        }}
      >
        V
      </Box>
      {/* display:grid sin columnas explícitas = una sola columna cuyo
          ancho lo marca el ítem más ancho, y el resto estira para
          igualarlo (justify-items:stretch, default de grid) — todos los
          chips terminan con el ancho del más largo sin medir nada a mano. */}
      <Box sx={{ display: "grid", gap: 0.3 * scale, justifyItems: "stretch" }}>
        {entries.map((e) => (
          <Box
            key={e.label}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 * scale,
              backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "999px",
              px: 1 * scale, py: 0.2 * scale, whiteSpace: "nowrap",
            }}
          >
            <Typography sx={{ fontSize: 8 * scale, color: "#999", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1 }}>
              {e.label}:
            </Typography>
            <Typography sx={{ fontSize: 9 * scale, color: "#333", fontWeight: 700, lineHeight: 1.1 }}>
              {e.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// "Sopa de letras" / "Word search" / "Caça-palavras" — una fila resaltada
// por palabra, centrada en una grilla de ancho fijo (8, lo justo para que
// entre "PALAVRAS" sin recortar). El resto se rellena con letras al azar.
const ENSOPALO_WORDS: Record<SupportedLanguage, string[]> = {
  es: ["SOPA", "DE", "LETRAS"],
  en: ["WORD", "SEARCH"],
  pt: ["CAÇA", "PALAVRAS"],
  // fr ya no está en el selector de idiomas (ver LanguageContext.tsx), pero
  // el tipo lo sigue incluyendo por si queda guardado en localStorage.
  fr: ["MOTS", "MÊLÉS"],
};
const FILLER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ENSOPALO_GRID_WIDTH = 8;

function randomFillerLetter(): string {
  return FILLER_LETTERS[Math.floor(Math.random() * FILLER_LETTERS.length)];
}

interface EnsopaloPreviewProps {
  lang?: SupportedLanguage;
}

export function EnsopaloPreview({ lang = "es" }: EnsopaloPreviewProps) {
  const words = ENSOPALO_WORDS[lang] ?? ENSOPALO_WORDS.es;

  const { grid, found } = useMemo(() => {
    const rows: string[] = [];
    const foundSet = new Set<string>();
    const pushFillerRow = () => {
      rows.push(Array.from({ length: ENSOPALO_GRID_WIDTH }, randomFillerLetter).join(""));
    };
    pushFillerRow();
    words.forEach((word) => {
      const start = Math.max(0, Math.floor((ENSOPALO_GRID_WIDTH - word.length) / 2));
      const rowIndex = rows.length;
      const chars = Array.from({ length: ENSOPALO_GRID_WIDTH }, (_, c) => {
        const wordIndex = c - start;
        if (wordIndex >= 0 && wordIndex < word.length) {
          foundSet.add(`${rowIndex}-${c}`);
          return word[wordIndex];
        }
        return randomFillerLetter();
      });
      rows.push(chars.join(""));
      pushFillerRow();
    });
    return { grid: rows, found: foundSet };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join("|")]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${ENSOPALO_GRID_WIDTH}, 1fr)`, gap: "2px", width: "100%" }}>
      {grid.map((row, r) =>
        [...row].map((ch, c) => (
          <Box
            key={`${r}-${c}`}
            sx={{
              aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "monospace", fontSize: 10, fontWeight: 700, borderRadius: "3px",
              backgroundColor: found.has(`${r}-${c}`) ? "#22c55e" : "#f1f1f1",
              color: found.has(`${r}-${c}`) ? "#fff" : "#888",
            }}
          >
            {ch}
          </Box>
        )),
      )}
    </Box>
  );
}

// Cadena de ejemplo por idioma — en castellano se encadena por la última
// sílaba (CA-SA, SA-PO, PO-ZO, mecánica real del juego en ese idioma); en
// el resto el juego real encadena por la última LETRA en vez de sílaba
// (ver getChallengeLetter en enganchadoReact/src/utils/wordEngineEn.ts /
// wordEnginePt.ts), así que las palabras de ejemplo siguen esa otra regla.
const ENGANCHALO_CHAINS: Record<SupportedLanguage, string[]> = {
  es: ["CASA", "SAPO", "POZO"],
  en: ["DOOR", "ROCK", "KITE"],
  pt: ["CASA", "AMOR", "RIO"],
  // fr ya no está en el selector de idiomas (ver LanguageContext.tsx), pero
  // el tipo lo sigue incluyendo por si queda guardado en localStorage.
  fr: ["PORTE", "ECOLE", "ETOILE"],
};

interface EnganchaloPreviewProps extends ScaleProps {
  lang?: SupportedLanguage;
}

export function EnganchaloPreview({ scale = 1, lang = "es" }: EnganchaloPreviewProps) {
  const words = ENGANCHALO_CHAINS[lang] ?? ENGANCHALO_CHAINS.es;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 0.5 * scale }}>
      {words.map((w, i) => (
        <Box key={w} sx={{ display: "flex", alignItems: "center", gap: 0.5 * scale }}>
          <Box
            sx={{
              px: 1 * scale, py: 0.5 * scale, borderRadius: "8px",
              backgroundColor: i === words.length - 1 ? `${ACCENT}22` : "#e5e7eb",
              border: i === words.length - 1 ? `2px solid ${ACCENT}` : "none",
              fontFamily: "monospace", fontSize: 12 * scale, fontWeight: 800, color: "#333",
            }}
          >
            {w}
          </Box>
          {i < words.length - 1 && (
            <Typography sx={{ color: ACCENT, fontWeight: 900, fontSize: 14 * scale }}>→</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

export function EnroscadoPreview({ scale = 1 }: ScaleProps) {
  const size = 120 * scale;
  const dotSize = 18 * scale;
  // Bien grueso a propósito — más ancho que el diámetro de un punto, así
  // tapa parte de las letras (como en la referencia) en vez de solo
  // asomar en los bordes.
  const ringWidth = dotSize * 1.3;
  // Mismo radio para el <circle> del SVG y para las letras — así el trazo
  // del aro pasa matemáticamente por el centro exacto de cada punto, sin
  // depender de box-sizing/border de CSS (ahí es donde fallaban los
  // intentos anteriores: dos elementos distintos con offsets calculados
  // por separado, que nunca terminaban de coincidir a simple vista).
  const radius = size / 2 - dotSize / 2;
  // El trazo del aro (ringWidth, grueso a propósito) sobresale del
  // círculo de radio `radius` — si el <svg> mide exactamente `size`, ese
  // sobrante se recorta justo en los 4 puntos cardinales (donde el aro
  // llega más lejos del centro en línea recta). El lienzo del SVG tiene
  // que ser más grande que `size` para que quepa entero; el Box de afuera
  // se queda en `size` (el tamaño que espera el resto del layout) y el
  // SVG se centra encima con un offset negativo.
  const svgSize = size + ringWidth;
  const svgOffset = (svgSize - size) / 2;
  const letters = "ABCDEFGHIJKLMNOP".split(""); // 16 en vez de 26, para que se note el espacio entre los puntos
  const statusColor = (i: number) => {
    if (i < 4) return "#2ecc71"; // correcta
    if (i === 4) return "#f1c40f"; // activa
    return "#1565c0"; // pendiente
  };
  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <svg width={svgSize} height={svgSize} style={{ position: "absolute", top: -svgOffset, left: -svgOffset }}>
        <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke="#d8e6f8" strokeWidth={ringWidth} />
      </svg>
      {letters.map((letter, i) => {
        const angle = (i / letters.length) * 2 * Math.PI - Math.PI / 2;
        const x = size / 2 + radius * Math.cos(angle);
        const y = size / 2 + radius * Math.sin(angle);
        return (
          <Box
            key={letter}
            sx={{
              position: "absolute", left: x - dotSize / 2, top: y - dotSize / 2, width: dotSize, height: dotSize, borderRadius: "50%",
              backgroundColor: statusColor(i),
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 9 * scale, fontWeight: 800, lineHeight: 1, fontFamily: "inherit",
            }}
          >
            {letter}
          </Box>
        );
      })}
    </Box>
  );
}

export function LetrisPreview({ scale = 1 }: ScaleProps) {
  const GRID: (string | null)[][] = [
    ["L", "E", "T", "R", "I"],
    ["A", null, "S", null, "S"],
    [null, null, null, null, null],
  ];
  const selected = new Set(["0-0", "0-1", "0-2", "0-3", "0-4"]);
  const cellSize = 22 * scale;
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: `${3 * scale}px` }}>
      {GRID.map((row, r) =>
        row.map((ch, c) => (
          <Box
            key={`${r}-${c}`}
            sx={{
              width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "monospace", fontSize: 12 * scale, fontWeight: 800, borderRadius: "4px",
              backgroundColor: ch ? (selected.has(`${r}-${c}`) ? "#22c55e" : "#fce4e1") : "transparent",
              color: ch ? (selected.has(`${r}-${c}`) ? "#fff" : ACCENT) : "transparent",
            }}
          >
            {ch ?? "·"}
          </Box>
        )),
      )}
    </Box>
  );
}

// "Forma palabras" / "Form words" / "Forme palavras" — la víbora (cuerpo
// verde + cabeza roja) serpentea en forma de U (baja por la columna
// izquierda, cruza por la fila de abajo, sube por la columna derecha) para
// deletrear la frase — más parecido a un camino real de la víbora que un
// zigzag fila por fila. Quedan algunas letras sueltas (fichas rosas, como
// la comida del juego real) dispersas en las celdas libres del interior.
// Las dos palabras por separado — entre una y otra va una "X" (ficha
// marcador, no es parte de ninguna palabra) en vez de dejar un hueco.
const VIBOREALO_WORDS: Record<SupportedLanguage, [string, string]> = {
  es: ["FORMA", "PALABRAS"],
  en: ["FORM", "WORDS"],
  pt: ["FORME", "PALAVRAS"],
  // fr ya no está en el selector de idiomas (ver LanguageContext.tsx), pero
  // el tipo lo sigue incluyendo por si queda guardado en localStorage.
  fr: ["FORME", "MOTS"],
};
const VIBOREALO_GRID_COLS = 5;
const VIBOREALO_LOOSE_LETTERS = ["Q", "Z", "E"];

// Baja por la col. 0, cruza la última fila, sube por la última columna —
// la "U" del dibujo de referencia. Puede quedar más larga que lo que hace
// falta (letras + cabeza); el resto simplemente no se usa.
function buildStaplePath(rows: number, cols: number): { row: number; col: number }[] {
  const path: { row: number; col: number }[] = [];
  for (let r = 0; r < rows; r++) path.push({ row: r, col: 0 });
  for (let c = 1; c < cols; c++) path.push({ row: rows - 1, col: c });
  for (let r = rows - 2; r >= 0; r--) path.push({ row: r, col: cols - 1 });
  return path;
}

interface ViborealoPreviewProps extends ScaleProps {
  lang?: SupportedLanguage;
}

type ViborealoCell = { letter: string; kind: "body" | "head" | "tile" | "divider" };

export function ViborealoPreview({ scale = 1, lang = "es" }: ViborealoPreviewProps) {
  const [word1, word2] = VIBOREALO_WORDS[lang] ?? VIBOREALO_WORDS.es;
  const cellSize = 20 * scale;

  const { rows, cellAt } = useMemo(() => {
    // Secuencia completa del cuerpo: palabra 1 + "X" separadora + palabra 2.
    const sequence: { letter: string; kind: ViborealoCell["kind"] }[] = [
      ...[...word1].map((letter) => ({ letter, kind: "body" as const })),
      { letter: "X", kind: "divider" as const },
      ...[...word2].map((letter) => ({ letter, kind: "body" as const })),
    ];
    const totalCells = sequence.length + 1; // secuencia + cabeza
    const rowCount = Math.max(3, Math.ceil((totalCells - VIBOREALO_GRID_COLS + 2) / 2));
    const grid: (ViborealoCell | null)[][] = Array.from(
      { length: rowCount },
      () => Array(VIBOREALO_GRID_COLS).fill(null),
    );
    const path = buildStaplePath(rowCount, VIBOREALO_GRID_COLS);

    sequence.forEach((cell, i) => {
      const { row, col } = path[i];
      grid[row][col] = cell;
    });
    const headPos = path[sequence.length];
    grid[headPos.row][headPos.col] = { letter: "", kind: "head" };

    const freeCells: { row: number; col: number }[] = [];
    grid.forEach((r, row) => r.forEach((cell, col) => { if (!cell) freeCells.push({ row, col }); }));
    VIBOREALO_LOOSE_LETTERS.forEach((letter, i) => {
      const pos = freeCells[Math.floor((i + 0.5) * (freeCells.length / VIBOREALO_LOOSE_LETTERS.length))];
      if (pos) grid[pos.row][pos.col] = { letter, kind: "tile" };
    });

    return { rows: grid.length, cellAt: grid };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word1, word2]);

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: `repeat(${VIBOREALO_GRID_COLS}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      gap: `${3 * scale}px`,
    }}>
      {cellAt.map((row, r) =>
        row.map((cell, c) => (
          <Box
            key={`${r}-${c}`}
            sx={{
              position: "relative",
              width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "monospace", fontSize: 11 * scale, fontWeight: 800,
              // Más redondeado arriba que abajo: da la idea de un hocico
              // apuntando hacia arriba (la víbora sube hasta acá).
              borderRadius: cell?.kind === "head" ? "55% 55% 20% 20%" : "4px",
              border: cell?.kind === "divider" ? `1px solid ${ACCENT}55` : "none",
              backgroundColor:
                !cell ? "transparent"
                : cell.kind === "body" ? "#22c55e"
                : cell.kind === "head" ? "#c0392b"
                : cell.kind === "divider" ? "#ffffff"
                : "#fce4e1",
              color: cell?.kind === "tile" || cell?.kind === "divider" ? ACCENT : "#fff",
            }}
          >
            {cell?.kind === "head" ? (
              <>
                <Box sx={{ position: "absolute", top: "24%", left: "22%", width: "18%", height: "18%", borderRadius: "50%", backgroundColor: "#fff" }} />
                <Box sx={{ position: "absolute", top: "24%", left: "60%", width: "18%", height: "18%", borderRadius: "50%", backgroundColor: "#fff" }} />
              </>
            ) : (
              cell?.letter ?? ""
            )}
          </Box>
        )),
      )}
    </Box>
  );
}

export function EmojionadoPreview({ scale = 1 }: ScaleProps) {
  const EMOJI = "😀";
  const DIFFERENT = "😄";
  const cells = Array.from({ length: 9 }, (_, i) => (i === 4 ? DIFFERENT : EMOJI));
  const cellSize = 26 * scale;
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${4 * scale}px` }}>
      {cells.map((e, i) => (
        <Box
          key={i}
          sx={{
            width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16 * scale, borderRadius: "6px", backgroundColor: i === 4 ? `${ACCENT}18` : "#f5f5f5",
            border: i === 4 ? `1.5px solid ${ACCENT}` : "none",
          }}
        >
          {e}
        </Box>
      ))}
    </Box>
  );
}
