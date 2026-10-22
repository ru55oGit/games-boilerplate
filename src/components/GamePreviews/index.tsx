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

export function TuttifrutaloPreview({ scale = 1 }: ScaleProps) {
  const entries = [
    { label: "País", value: "Venezuela" },
    { label: "Animal", value: "Vaca" },
  ];
  const circleSize = 44 * scale;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, py: 1 }}>
      <Box
        sx={{
          width: circleSize, height: circleSize, borderRadius: "50%", backgroundColor: "#fff",
          border: `2px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", fontWeight: 800, fontSize: 20 * scale, color: ACCENT,
        }}
      >
        V
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 * scale, justifyContent: "center" }}>
        {entries.map((e) => (
          <Box
            key={e.label}
            sx={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "999px", px: 1 * scale, py: 0.25 * scale }}
          >
            <Typography sx={{ fontSize: 9 * scale, color: "#999", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.2 }}>
              {e.label}
            </Typography>
            <Typography sx={{ fontSize: 11 * scale, color: "#333", fontWeight: 700, lineHeight: 1.2 }}>
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

export function EnganchaloPreview({ scale = 1 }: ScaleProps) {
  const words = ["CASA", "SAPO", "POZO"];
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

export function ViborealoPreview({ scale = 1 }: ScaleProps) {
  const cellSize = 22 * scale;
  const cells: { letter: string; kind: "body" | "head" | "tile" }[] = [
    { letter: "S", kind: "body" },
    { letter: "O", kind: "body" },
    { letter: "L", kind: "body" },
    { letter: "", kind: "head" },
    { letter: "A", kind: "tile" },
  ];
  return (
    <Box sx={{ display: "flex", gap: `${3 * scale}px` }}>
      {cells.map((cell, i) => (
        <Box
          key={i}
          sx={{
            width: cellSize, height: cellSize, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "monospace", fontSize: 12 * scale, fontWeight: 800,
            borderRadius: cell.kind === "head" ? "30% 70% 70% 30%" : "4px",
            backgroundColor: cell.kind === "body" ? "#22c55e" : cell.kind === "head" ? "#c0392b" : "#fce4e1",
            color: cell.kind === "tile" ? ACCENT : "#fff",
          }}
        >
          {cell.letter}
        </Box>
      ))}
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
