export interface Translation {
  appTitle: string;
  tagline: string;
  manifesto: string;
  subtitle: string;
  playButton: string;
}

export const translations: Record<string, Translation> = {
  es: {
    appTitle: "Boludeando",
    tagline: "cerrá redes · pensá · divertite",
    manifesto:
      "El scroll infinito no ejercita nada. Pasar horas deslizando redes sociales apaga la atención, fragmenta la memoria y le da al cerebro dopamina fácil sin esfuerzo real, como comer solo golosinas. Con el tiempo, esto reduce la capacidad de concentrarte, de pensar en profundidad y hasta de aburrirte (que es donde nace la creatividad). Los juegos mentales —sopas de letras, acertijos, categorías contrarreloj— hacen lo contrario: obligan a tu cabeza a buscar, asociar y resolver, fortaleciendo memoria y agilidad mental real. Es la diferencia entre consumir contenido y ejercitar la mente. Elegí un juego, no un scroll más.",
    subtitle: "Elegí un juego para jugar",
    playButton: "JUGAR",
  },
  en: {
    appTitle: "My Games",
    tagline: "think · play · repeat",
    manifesto:
      "Infinite scroll doesn't exercise anything. Hours of scrolling social media dulls attention, fragments memory, and feeds the brain easy dopamine without real effort — like eating only candy. Over time, this shrinks your ability to concentrate, to think deeply, and even to get bored (which is where creativity is born). Mental games — word searches, puzzles, categories against the clock — do the opposite: they force your mind to search, connect, and solve, building real memory and mental agility. It's the difference between consuming content and exercising your mind. Pick a game, not another scroll.",
    subtitle: "Pick a game to play",
    playButton: "PLAY",
  },
  pt: {
    appTitle: "Meus Jogos",
    tagline: "pense · jogue · repita",
    manifesto:
      "O scroll infinito não exercita nada. Passar horas rolando redes sociais desliga a atenção, fragmenta a memória e dá ao cérebro dopamina fácil sem esforço real, como comer só doces. Com o tempo, isso reduz a capacidade de se concentrar, de pensar em profundidade e até de se entediar (que é onde nasce a criatividade). Os jogos mentais —caça-palavras, quebra-cabeças, categorias contra o relógio— fazem o oposto: obrigam sua cabeça a buscar, associar e resolver, fortalecendo memória e agilidade mental real. É a diferença entre consumir conteúdo e exercitar a mente. Escolha um jogo, não mais um scroll.",
    subtitle: "Escolha um jogo para jogar",
    playButton: "JOGAR",
  },
  fr: {
    appTitle: "Mes Jeux",
    tagline: "pense · joue · répète",
    manifesto:
      "Le scroll infini n'exerce rien. Passer des heures à faire défiler les réseaux sociaux éteint l'attention, fragmente la mémoire et donne au cerveau de la dopamine facile sans effort réel, comme ne manger que des bonbons. Avec le temps, cela réduit la capacité à se concentrer, à penser en profondeur et même à s'ennuyer (c'est là que naît la créativité). Les jeux mentaux —mots mêlés, énigmes, catégories contre la montre— font l'inverse : ils obligent ton esprit à chercher, associer et résoudre, renforçant une vraie mémoire et agilité mentale. C'est la différence entre consommer du contenu et exercer son esprit. Choisis un jeu, pas un scroll de plus.",
    subtitle: "Choisis un jeu",
    playButton: "JOUER",
  },
};

export type SupportedLanguage = "es" | "en" | "pt" | "fr";
