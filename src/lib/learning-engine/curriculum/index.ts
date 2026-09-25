import type {
  CurriculumBlock,
  CurriculumLevel,
  LessonDefinition,
  LevelId,
} from "../types";
import { CURRICULUM_LEVELS } from "./levels";
import { A0_CURRICULUM_BLOCKS } from "./blocks-a0";
import { UNIT_1_LESSON } from "./lessons/a0-block1-unit1";

export const LESSONS_REGISTRY: Record<string, LessonDefinition> = {
  "a0-b1-unit1": UNIT_1_LESSON,
  // Alias conveniente para rota /unit/1
  "unit-1": UNIT_1_LESSON,
  "unit-01": UNIT_1_LESSON,
};

export const BLOCKS_REGISTRY: Record<string, CurriculumBlock> = {
  ...A0_CURRICULUM_BLOCKS,
};

export const LEVELS_REGISTRY: Record<string, CurriculumLevel> = {
  ...CURRICULUM_LEVELS,
};

export function getLessonById(id: string): LessonDefinition | undefined {
  return LESSONS_REGISTRY[id];
}

export function getBlockById(blockId: string): CurriculumBlock | undefined {
  return BLOCKS_REGISTRY[blockId];
}

export function getLevelById(levelId: LevelId): CurriculumLevel | undefined {
  return LEVELS_REGISTRY[levelId];
}

export function getAllLevels(): CurriculumLevel[] {
  return Object.values(LEVELS_REGISTRY).sort((a, b) => a.order - b.order);
}

export function getBlocksByLevel(levelId: LevelId): CurriculumBlock[] {
  return Object.values(BLOCKS_REGISTRY)
    .filter((b) => b.level === levelId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByBlock(blockId: string): LessonDefinition[] {
  const block = getBlockById(blockId);
  if (!block) return [];
  return block.lessonIds
    .map((id) => getLessonById(id))
    .filter((l): l is LessonDefinition => Boolean(l))
    .sort((a, b) => a.order - b.order);
}
