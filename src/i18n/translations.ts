export interface Translation {
  appTitle: string;
  tagline: string;
  subtitle: string;
  playButton: string;
}

export const translations: Record<string, Translation> = {
  es: {
    appTitle: "Boludeando",
    tagline: "cerrá redes · pensá · divertite",
    subtitle: "Elegí un juego para jugar",
    playButton: "JUGAR",
  },
  en: {
    appTitle: "My Games",
    tagline: "think · play · repeat",
    subtitle: "Pick a game to play",
    playButton: "PLAY",
  },
  pt: {
    appTitle: "Meus Jogos",
    tagline: "pense · jogue · repita",
    subtitle: "Escolha um jogo para jogar",
    playButton: "JOGAR",
  },
  fr: {
    appTitle: "Mes Jeux",
    tagline: "pense · joue · répète",
    subtitle: "Choisis un jeu",
    playButton: "JOUER",
  },
};

export type SupportedLanguage = "es" | "en" | "pt" | "fr";
