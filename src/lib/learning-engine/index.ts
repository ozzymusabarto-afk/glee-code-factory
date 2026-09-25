/**
 * POLYBOT SCHOOL — LEARNING ENGINE
 *
 * Ponto de entrada unificado do motor de aprendizagem.
 * O conteúdo muda; o motor permanece.
 */

export * from "./types";
export * from "./curriculum";
export * from "./mastery/MasteryTracker";
export * from "./diagnostic/PlacementEngine";

import {
  getLessonById,
  getBlockById,
  getLevelById,
  getAllLevels,
  getBlocksByLevel,
  getLessonsByBlock,
} from "./curriculum";
import { defaultMasteryTracker } from "./mastery/MasteryTracker";
import { defaultPlacementEngine } from "./diagnostic/PlacementEngine";

export const LearningEngine = {
  // Currículo
  getLesson: getLessonById,
  getBlock: getBlockById,
  getLevel: getLevelById,
  getAllLevels,
  getBlocksByLevel,
  getLessonsByBlock,

  // Domínio & Progresso
  mastery: defaultMasteryTracker,

  // Diagnóstico & Placement
  placement: defaultPlacementEngine,
};

export default LearningEngine;
