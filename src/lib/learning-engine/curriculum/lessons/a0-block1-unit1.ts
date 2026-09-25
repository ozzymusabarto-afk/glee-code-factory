import type { LessonDefinition } from "../../types";

export const UNIT_1_LESSON: LessonDefinition = {
  id: "a0-b1-unit1",
  slug: "home-and-hotel-first-contact",
  level: "A0",
  blockId: "a0-b1-first-contacts",
  order: 1,
  title: "HOME & HOTEL",
  subtitlePt: "Unit 1: Hello! — Conhecendo Alex no saguão",
  situation: "Chegando ao hotel internacional e conhecendo o Alex na recepção",
  objectivePt:
    "Compreender saudações básicas, responder 'Hello/Hi', dizer o próprio nome e retribuir a gentileza.",
  location: "Saguão do Hotel Internacional",

  pedagogy: {
    vocabulary: [
      { en: "Hello!", pt: "Olá!", contextPt: "A saudação mais comum e acolhedora ao chegar." },
      { en: "Hi!", pt: "Oi!", contextPt: "Saudação rápida, amigável e descontraída." },
      { en: "Thank you!", pt: "Obrigado(a)!", contextPt: "Para agradecer pela chave, café ou ajuda." },
      { en: "Goodbye!", pt: "Tchau / Até logo!", contextPt: "Para se despedir ao sair do saguão." },
      { en: "Name", pt: "Nome", contextPt: "Usado para se identificar e perguntar quem a pessoa é." },
      { en: "Meet", pt: "Conhecer / Encontrar", contextPt: "Usado em expressões de cortesia como 'Nice to meet you'." },
    ],
    communicativeFunctions: [
      "greeting_someone",
      "introducing_oneself",
      "understanding_name_query",
      "returning_courtesy",
    ],
    structures: [
      {
        id: "pattern-my-name-is",
        pattern: "My name is [name]",
        functionPt: "Dizer seu nome de forma clara e formal.",
        examples: ["My name is Alex.", "My name is Adriana."],
      },
      {
        id: "pattern-im",
        pattern: "I'm [name]",
        functionPt: "Dizer seu nome de forma contraída, casual e comum.",
        examples: ["I'm Alex.", "I'm Carlos."],
      },
      {
        id: "pattern-nice-to-meet-you",
        pattern: "Nice to meet you, too!",
        functionPt: "Retribuir gentileza ao ser apresentado a alguém.",
        examples: ["Nice to meet you, too!"],
      },
    ],
    pronunciation: [
      {
        id: "phonetics-name-is",
        focusPattern: "My name is",
        phoneticTipPt: "Ligue o som do 'm' ao 'is': pronuncie /neɪmɪz/ de forma contínua, sem pausas secas.",
        naturalPacingTipPt: "Não separe 'name' de 'is' como se fossem duas palavras isoladas.",
      },
      {
        id: "phonetics-nice-to-meet-you",
        focusPattern: "Nice to meet you, too!",
        phoneticTipPt: "Dê ênfase ao 'too' no final para expressar sinceridade.",
        naturalPacingTipPt: "O 'to' soa suave (/tə/), enquanto 'meet' e 'too' recebem o ritmo principal.",
      },
    ],
    skills: [
      {
        id: "skill:a0:greeting_someone",
        category: "communicative_function",
        namePt: "Saudar alguém",
        descriptionPt: "Usar Hello ou Hi ao encontrar uma pessoa em um contexto real.",
        level: "A0",
        targetItem: "Hello! / Hi!",
      },
      {
        id: "skill:a0:self_introduction",
        category: "speaking",
        namePt: "Apresentar-se",
        descriptionPt: "Dizer o próprio nome usando 'My name is...' ou 'I'm...'.",
        level: "A0",
        targetItem: "My name is... / I'm...",
      },
      {
        id: "skill:a0:understand_name_question",
        category: "listening",
        namePt: "Compreender pergunta de nome",
        descriptionPt: "Entender quando perguntam 'What's your name?' e responder sem hesitação.",
        level: "A0",
        targetItem: "What's your name?",
      },
      {
        id: "skill:a0:return_courtesy",
        category: "communicative_function",
        namePt: "Retribuir cortesia",
        descriptionPt: "Responder 'Nice to meet you, too!' com naturalidade e acolhimento.",
        level: "A0",
        targetItem: "Nice to meet you, too!",
      },
    ],
  },

  activities: {
    prepare: {
      welcomeWordEn: "Hello!",
      welcomeWordPt: "Olá!",
      explanationPt:
        "Você acabou de ouvir e entender sua primeira palavra em inglês dentro de uma situação real. Sem regras complicadas, sem nenhuma pressão.",
    },

    observation: {
      title: "Etapa 2 · Observação",
      subtitlePt:
        "No saguão do hotel, estas são 4 palavras que você provavelmente vai ouvir nesta situação. Toque em cada uma para escutar o som e se acostumar com o ritmo.",
      alexPromptPt: "Agora vamos ouvir e perceber antes de falar.",
      items: [
        { en: "Hello!", pt: "Olá!", contextPt: "A saudação mais comum ao chegar." },
        { en: "Hi!", pt: "Oi!", contextPt: "Mais rápida, amigável e descontraída." },
        { en: "Thank you!", pt: "Obrigado(a)!", contextPt: "Para agradecer pela chave ou ajuda." },
        { en: "Goodbye!", pt: "Tchau / Até logo!", contextPt: "Para se despedir ao sair do saguão." },
      ],
    },

    shadowing: {
      title: "Shadowing com Alex",
      phrases: [
        {
          id: "shadow-hello",
          targetPhrase: "Hello!",
          translationPt: "Olá!",
          suggestedReps: 2,
          pedagogicalTipPt: "Feche os olhos por um segundo e apenas escute a entonação da palavra. Não se preocupe em ler letra por letra, apenas absorva o som geral.",
        },
        {
          id: "shadow-my-name",
          targetPhrase: "My name is Alex.",
          translationPt: "Meu nome é Alex.",
          suggestedReps: 2,
          pedagogicalTipPt: "Perceba como o som de 'name' se conecta a 'is'. Repita junto sentindo a melodia da fala.",
        },
      ],
    },

    rehearsal: {
      promptPt: "Apresente-se ao Alex.",
      subPromptPt: "Escreva como você falaria.",
      alexPromptEn: "My name is Alex. What's your name?",
      alexPromptPt: "Meu nome é Alex. Qual é o seu nome?",
      hintPrefixPt: "Comece com: My name is...",
      exampleFullEn: "My name is Adriana.",
      acceptedPatterns: [
        /^my name is\s+.+$/i,
        /^(i'm|im|i am)\s+.+$/i,
      ],
    },

    conversation: {
      scenarioTitle: "Saguão do Hotel Internacional",
      scenarioContextPt: "Alex está na recepção do hotel pronto para conversar com você.",
      alexBridgePt: "Você já ouviu, repetiu e praticou. Agora é a vez de usar essas palavras comigo aqui no hotel.",
      turns: [
        {
          id: "turn-1",
          alexText: "Hi! Welcome to our hotel.",
          helpHintPt: "Responda à saudação com uma saudação amigável como 'Hello!' ou 'Hi!'.",
          targetExpected: ["hello", "hi", "hey", "thank you", "thanks"],
          validateResponse: (raw: string) => {
            const clean = raw.toLowerCase().trim().replace(/[^a-z]/g, "");
            const isGreeting =
              clean.includes("hello") ||
              clean.includes("hi") ||
              clean.includes("hey") ||
              clean.includes("goodmorning") ||
              clean.includes("goodafternoon") ||
              clean.includes("goodevening");
            if (isGreeting) {
              return { communicated: true, formAccurate: true };
            }
            return {
              communicated: false,
              formAccurate: false,
              feedbackMessage: "Alex deu as boas-vindas ao hotel. Responda com 'Hello!' ou 'Hi!'.",
              suggestedModel: "Hello!",
            };
          },
        },
        {
          id: "turn-2",
          alexText: "My name is Alex. What's your name?",
          helpHintPt: "Diga seu nome. Você pode usar: 'My name is [seu nome]' ou 'I'm [seu nome]'.",
          targetExpected: ["my name is", "im", "i am", "my name"],
          validateResponse: (raw: string) => {
            const clean = raw.trim().replace(/[.!,?]+$/, "");
            const lower = clean.toLowerCase();
            const match = clean.match(/^(my name is|i'm|im|i am)\s+(.+)$/i);
            const detectedName = match && match[2]
              ? match[2].trim().split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
              : undefined;

            const hasValidIntro =
              /^(my name is|i'm|im|i am)\s+/i.test(clean) ||
              lower.startsWith("my name is") ||
              lower.startsWith("i'm ") ||
              lower.startsWith("im ") ||
              lower.startsWith("i am ");

            if (hasValidIntro) {
              return {
                communicated: true,
                formAccurate: true,
                studentName: detectedName,
              };
            }

            if (lower.startsWith("my name") && !lower.includes("is")) {
              const namePart = clean.replace(/^my name\s*/i, "").trim();
              return {
                communicated: true,
                formAccurate: false,
                studentName: namePart || undefined,
                feedbackMessage: "Quase lá! No inglês dizemos 'My name is...' ou 'I'm...'.",
                suggestedModel: `My name is ${namePart || "..."}`,
              };
            }

            const words = clean.split(/\s+/).filter(Boolean);
            if (words.length >= 1 && words.length <= 3) {
              return {
                communicated: true,
                formAccurate: false,
                studentName: clean,
                feedbackMessage: "Entendido! Para soar mais completo, tente: 'My name is...' ou 'I'm...'.",
                suggestedModel: `My name is ${clean}`,
              };
            }

            return {
              communicated: false,
              formAccurate: false,
              feedbackMessage: "Diga seu nome usando 'My name is [seu nome]' ou 'I'm [seu nome]'.",
              suggestedModel: "My name is...",
            };
          },
        },
        {
          id: "turn-3",
          alexText: "Nice to meet you!",
          helpHintPt: "Alex disse que foi um prazer conhecer você! Retribua com: 'Nice to meet you, too!'.",
          targetExpected: ["nice to meet you too", "nice to meet you", "nice to meet you to"],
          validateResponse: (raw: string) => {
            const clean = raw.toLowerCase().trim().replace(/[^a-z\s]/g, "");
            const hasNiceToMeetYou = clean.includes("nice to meet you");
            const hasToo = clean.includes("too") || clean.includes("to") || clean.endsWith("you too") || clean.endsWith("you to");

            if (hasNiceToMeetYou || hasToo || clean.includes("you too") || clean.includes("same to you")) {
              return { communicated: true, formAccurate: true };
            }

            return {
              communicated: false,
              formAccurate: false,
              feedbackMessage: "Para retribuir a cortesia, diga: 'Nice to meet you, too!'.",
              suggestedModel: "Nice to meet you, too!",
            };
          },
        },
      ],
    },

    consolidation: {
      titlePt: "Primeiro contato concluído no hotel!",
      alexClosingQuotePt:
        "Você deu o primeiro passo real no inglês. Cumprimentou, disse seu nome e retribuiu a gentileza com naturalidade.",
      achievements: [
        {
          id: "ach-1",
          titlePt: "Reconhecer e usar saudações cotidianas (Hello!, Hi!)",
          category: "communicative_function",
        },
        {
          id: "ach-2",
          titlePt: "Dizer o seu próprio nome com naturalidade (My name is... e I'm...)",
          category: "speaking",
        },
        {
          id: "ach-3",
          titlePt: "Compreender a pergunta 'What's your name?' no contexto real",
          category: "listening",
        },
        {
          id: "ach-4",
          titlePt: "Retribuir a cortesia social com 'Nice to meet you, too!'",
          category: "communicative_function",
        },
      ],
      nextUnitTitlePt: "CAFÉ",
      nextUnitTeaserPt:
        "Na próxima parada, vamos pedir alguma coisa em um café. Você vai aprender a pedir um café ou bebida com confiança e naturalidade.",
      nextLessonId: "a0-b2-unit2",
    },
  },

  masteryRequirements: [
    { skillId: "skill:a0:greeting_someone", requiredState: "MASTERED" },
    { skillId: "skill:a0:self_introduction", requiredState: "MASTERED" },
    { skillId: "skill:a0:understand_name_question", requiredState: "UNDERSTANDS" },
    { skillId: "skill:a0:return_courtesy", requiredState: "USES_IN_CONTEXT" },
  ],

  reviewItems: ["Hello!", "Hi!", "My name is...", "Nice to meet you!"],
  nextLessonId: "a0-b2-unit2",
};
