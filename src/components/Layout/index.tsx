import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const RAIN_EMOJIS = [
  "😀", "😂", "🤣", "😍", "🥳", "🤩", "😎", "🤔", "😜", "🥸",
  "🤪", "😇", "🤗", "😻", "🎉", "🦄", "🌈", "🍕", "🎸", "🚀",
  "⭐", "💡", "🔥", "💎", "👑", "💪", "🎯", "🏆", "🎭", "🎨",
  "🌟", "💫", "🌙", "☀️", "🌸", "🌺", "🌼", "🌻",
];

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function spawnEmoji() {
      if (!canvas) return;

      const el = document.createElement("div");
      el.className = "rain-emoji";
      el.textContent =
        RAIN_EMOJIS[Math.floor(Math.random() * RAIN_EMOJIS.length)];
      const left = Math.random() * 100;
      const dur = 5 + Math.random() * 8;
      const size = 1.2 + Math.random() * 1.8;
      const delay = Math.random() * -dur;

      el.style.cssText = `
        left: ${left}%;
        font-size: ${size}rem;
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;

      canvas.appendChild(el);

      setTimeout(
        () => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        },
        (dur + Math.abs(delay)) * 1000,
      );
    }

    intervalRef.current = setInterval(spawnEmoji, 300);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (canvas) {
        canvas.innerHTML = "";
      }
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(#a34747, #F44336)",
        alignItems: "center",
        width: { md: "40vw", xs: "100%" },
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        pb: 2,
      }}
    >
      {/* Canvas para lluvia de emojis */}
      <Box
        ref={canvasRef}
        id="bg-canvas"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          "& .rain-emoji": {
            position: "absolute",
            top: "-50px",
            animation: "fall linear infinite",
            userSelect: "none",
            pointerEvents: "none",
            opacity: 0.7,
          },
          "@keyframes fall": {
            "0%": {
              transform: "translateY(-100px) rotate(0deg)",
              opacity: 0,
            },
            "10%": {
              opacity: 0.7,
            },
            "90%": {
              opacity: 0.7,
            },
            "100%": {
              transform: "translateY(100vh) rotate(360deg)",
              opacity: 0,
            },
          },
        }}
      />

      <Container
        disableGutters
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 2,
          px: 0,
          position: "relative",
          zIndex: 5,
        }}
      >
        {children}
      </Container>

      {showFooter && (
        <Box
          component="footer"
          sx={{
            py: 2,
            textAlign: "center",
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            position: "relative",
            zIndex: 5,
          }}
        >
          © {new Date().getFullYear()} Mis Juegos
        </Box>
      )}
    </Box>
  );
};

export default Layout;
