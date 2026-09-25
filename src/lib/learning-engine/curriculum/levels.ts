import type { CurriculumLevel } from "../types";

export const CURRICULUM_LEVELS: Record<string, CurriculumLevel> = {
  A0: {
    id: "A0",
    order: 1,
    name: "Absolute Beginner",
    titlePt: "Iniciante Absoluto · A0",
    descriptionPt: "Primeiro contato com o inglês em situações reais do cotidiano. Sem pré-requisitos.",
    blockIds: [
      "a0-b1-first-contacts",
      "a0-b2-me-and-my-world",
      "a0-b3-concrete-world",
      "a0-b4-needs-and-actions",
      "a0-b5-my-life",
      "a0-b6-everyday-survival",
    ],
  },
  A1: {
    id: "A1",
    order: 2,
    name: "Beginner",
    titlePt: "Iniciante · A1",
    descriptionPt: "Comunicação simples para necessidades imediatas, compras, pedidos e direções.",
    blockIds: [],
  },
  A2: {
    id: "A2",
    order: 3,
    name: "Elementary",
    titlePt: "Básico · A2",
    descriptionPt: "Descrições simples, rotina, transporte, aeroporto e informações pessoais.",
    blockIds: [],
  },
  B1: {
    id: "B1",
    order: 4,
    name: "Intermediate",
    titlePt: "Intermediário · B1",
    descriptionPt: "Independência em viagens, expressão de opiniões, planos e acontecimentos.",
    blockIds: [],
  },
  B2: {
    id: "B2",
    order: 5,
    name: "Upper Intermediate",
    titlePt: "Independente · B2",
    descriptionPt: "Fluência e espontaneidade com falantes nativos sem grande esforço mútuo.",
    blockIds: [],
  },
};
