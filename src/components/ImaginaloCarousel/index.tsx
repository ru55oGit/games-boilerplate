import { Suspense, lazy, useEffect, useState, ComponentType } from "react";
import Box from "@mui/material/Box";

// Copias estáticas de la primera imagen de cada categoría de Imaginalo
// (src/assets/imaginaloPreview/*.js), para mostrar un carrousel automático
// representativo sin depender en vivo del repo de Imaginalo.
const MODULES = import.meta.glob("../../assets/imaginaloPreview/*.js") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;
const KEYS = Object.keys(MODULES).sort();
const ROTATE_MS = 2200;

export default function ImaginaloCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % KEYS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const key = KEYS[index];
  const Comp = lazy(MODULES[key]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .fade-in": { animation: "fadeIn 0.4s ease" },
        "@keyframes fadeIn": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }}
    >
      <Box key={key} className="fade-in" sx={{ width: "70%", height: "70%" }}>
        <Suspense fallback={null}>
          <Comp />
        </Suspense>
      </Box>
    </Box>
  );
}
