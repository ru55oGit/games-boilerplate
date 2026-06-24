import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import EmojiCarousel from "../components/EmojiCarousel";
import { TOTAL_LEVELS, PROGRESS_KEY } from "../levels/levelsData";

const BY_LANGUAGE = {
  es: {
    tagline: "observa · piensa · gana",
    greetingMorning: "Buenos días",
    greetingAfternoon: "Buenas tardes",
    greetingEvening: "Buenas noches",
    question: "¿Jugamos?",
    levelLabel: "Nivel",
    of: "de",
  },
  en: {
    tagline: "observe · think · win",
    greetingMorning: "Good morning",
    greetingAfternoon: "Good afternoon",
    greetingEvening: "Good evening",
    question: "Ready to play?",
    levelLabel: "Level",
    of: "of",
  },
  pt: {
    tagline: "observe · pense · ganhe",
    greetingMorning: "Bom dia",
    greetingAfternoon: "Boa tarde",
    greetingEvening: "Boa noite",
    question: "Vamos jogar?",
    levelLabel: "Nível",
    of: "de",
  },
  fr: {
    tagline: "observe · réfléchis · gagne",
    greetingMorning: "Bonjour",
    greetingAfternoon: "Bon après-midi",
    greetingEvening: "Bonsoir",
    question: "On joue?",
    levelLabel: "Niveau",
    of: "sur",
  },
} as const;

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState(1);

  const lang = (currentLanguage in BY_LANGUAGE ? currentLanguage : "en") as keyof typeof BY_LANGUAGE;
  const copy = BY_LANGUAGE[lang];

  useEffect(() => {
    const readProgress = () => {
      const stored = parseInt(localStorage.getItem(PROGRESS_KEY) || "1", 10);
      const safe = Number.isFinite(stored) ? Math.min(Math.max(stored, 1), TOTAL_LEVELS) : 1;
      setCurrentLevel(safe);
    };
    readProgress();
    window.addEventListener("focus", readProgress);
    document.addEventListener("visibilitychange", readProgress);
    return () => {
      window.removeEventListener("focus", readProgress);
      document.removeEventListener("visibilitychange", readProgress);
    };
  }, []);

  const nowHour = new Date().getHours();
  const greeting =
    nowHour < 12 ? copy.greetingMorning : nowHour < 20 ? copy.greetingAfternoon : copy.greetingEvening;

  const STEPS = [
    { icon: "👀", text: t.lookAtGrid },
    { icon: "🤔", text: t.findDifferent },
    { icon: "👆", text: t.clickQuickly },
  ];

  return (
    <Layout showFooter={false}>
      <Box
        sx={{
          width: "100%",
          px: { xs: 1.5, md: 2 },
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
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
            fontSize: { xs: "4.1rem", sm: "5rem", md: "6rem" },
            lineHeight: 0.95,
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
            fontSize: { xs: 18, md: 22 },
          }}
        >
          {copy.tagline}
        </Typography>

        <Typography sx={{ color: "rgba(255, 255, 255, 0.72)", fontWeight: 700, fontSize: { xs: 18, md: 24 } }}>
          {greeting}
        </Typography>

        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: 24, sm: 32, md: 32 }, lineHeight: 1.05 }}>
          {copy.question}
        </Typography>

        {/* Hero card */}
        <Box
          sx={{
            borderRadius: 6,
            backgroundColor: "#ef7063",
            display: "flex",
            flexDirection: "column",
            p: { xs: 1.75, md: 2.5 },
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              backgroundColor: "#ffffff",
              width: "100%",
              height: { xs: 260, md: 300 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EmojiCarousel />
          </Box>

          <Box
            sx={{
              mt: { xs: 1, md: 1.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/levels")}
              sx={{
                borderRadius: 999,
                backgroundColor: "#fff",
                color: "#c93d2f",
                px: { xs: 2.5, md: 4 },
                py: { xs: 0.9, md: 1.2 },
                fontWeight: 700,
                fontSize: { xs: 20, md: 30 },
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#fff5f3", boxShadow: "none" },
              }}
            >
              {t.playButton}
            </Button>

            <Box sx={{ flex: 1, minWidth: 0, textAlign: "right", color: "#fff" }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, md: 18 }, lineHeight: 1.1 }}>
                {t.appTitle}
              </Typography>
              <Typography sx={{ opacity: 0.9, fontWeight: 600, fontSize: { xs: 13, md: 16 }, lineHeight: 1.2 }}>
                {copy.levelLabel} {currentLevel} {copy.of} {TOTAL_LEVELS}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* How to play */}
        <Box sx={{ borderRadius: 4, backgroundColor: "#f2f1f1", px: 2, pt: 2, pb: 3 }}>
          <Typography
            sx={{
              color: "#1f2025",
              fontWeight: 700,
              fontSize: { xs: 18, md: 28 },
              letterSpacing: "1px",
              mb: 1.75,
            }}
          >
            {t.howToPlay}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {STEPS.map((step) => (
              <Box
                key={step.icon}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "#fff",
                  border: "1px solid #e3e3e3",
                  borderRadius: 3,
                  px: 2,
                  py: 1.25,
                }}
              >
                <Typography sx={{ fontSize: "28px" }}>{step.icon}</Typography>
                <Typography sx={{ color: "#222", fontSize: 15, fontWeight: 600 }}>
                  {step.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
