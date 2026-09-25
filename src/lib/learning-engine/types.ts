/**
 * POLYBOT LEARNING ENGINE — Core Curriculum & Pedagogy Types
 *
 * Princípio Central:
 * - O motor é único, reutilizável e desacoplado da interface visual.
 * - Currículo = o que precisa ser aprendido (invisível ao aluno).
 * - Experiência = como o aluno vive a situação no mundo real.
 */

export type LevelId = 'A0' | 'A1' | 'A2' | 'B1' | 'B2';

/**
 * Escala Oficial de Domínio (Mastery) do Polybot.
 * Permite registrar o progresso real de aprendizagem de cada habilidade/item.
 */
export type MasteryState =
  | 'NOT_PRESENTED'          // Conteúdo ainda não visto pelo aluno
  | 'PRESENTED'              // Apresentado no contexto/situação
  | 'RECOGNIZES'             // Reconhece a forma/som quando ouve ou vê
  | 'UNDERSTANDS'            // Compreende o significado na situação
  | 'REPRODUCES_WITH_SUPPORT'// Consegue repetir com apoio/áudio (Shadowing)
  | 'PRODUCES_ALONE'         // Consegue recuperar e produzir sozinho (Prática)
  | 'USES_IN_CONTEXT'        // Usa ativamente em diálogo com Alex (Conversa)
  | 'MASTERED';              // Dominado com fluência, retenção e naturalidade

export const MASTERY_ORDER: Record<MasteryState, number> = {
  NOT_PRESENTED: 0,
  PRESENTED: 1,
  RECOGNIZES: 2,
  UNDERSTANDS: 3,
  REPRODUCES_WITH_SUPPORT: 4,
  PRODUCES_ALONE: 5,
  USES_IN_CONTEXT: 6,
  MASTERED: 7,
};

export type SkillCategory =
  | 'vocabulary'
  | 'communicative_function'
  | 'grammar_structure'
  | 'pronunciation'
  | 'listening'
  | 'speaking'
  | 'writing';

export interface SkillDefinition {
  id: string;
  category: SkillCategory;
  namePt: string;
  descriptionPt: string;
  level: LevelId;
  targetItem?: string | undefined;
}

export interface VocabularyItem {
  en: string;
  pt: string;
  contextPt: string;
  audioText?: string | undefined;
}

export interface StructurePattern {
  id: string;
  pattern: string; // Ex: "My name is [name]" | "I'm [name]"
  functionPt: string;
  examples: string[];
}

export interface PronunciationTarget {
  id: string;
  phoneticTipPt: string;
  focusPattern: string; // Ex: "name is" -> /neɪmɪz/
  naturalPacingTipPt: string;
}

/**
 * Atividades Didáticas da Lição
 */
export interface ObservationActivity {
  title: string;
  subtitlePt: string;
  alexPromptPt: string;
  items: VocabularyItem[];
}

export interface ShadowingPhraseItem {
  id: string;
  targetPhrase: string;
  translationPt: string;
  audioText?: string | undefined;
  suggestedReps?: number | undefined;
  pedagogicalTipPt?: string | undefined;
}

export interface ShadowingActivity {
  title: string;
  phrases: ShadowingPhraseItem[];
}

export interface RehearsalActivity {
  promptPt: string;
  subPromptPt: string;
  alexPromptEn: string;
  alexPromptPt: string;
  hintPrefixPt: string;
  exampleFullEn: string;
  acceptedPatterns: RegExp[];
}

export interface ConversationTurnDefinition {
  id: string;
  alexText: string;
  alexAudioText?: string | undefined;
  helpHintPt: string;
  targetExpected: string[];
  suggestedChips?: string[] | undefined;
  validateResponse: (transcript: string) => {
    communicated: boolean;
    formAccurate: boolean;
    studentName?: string | undefined;
    feedbackMessage?: string | undefined;
    suggestedModel?: string | undefined;
  };
}

export interface ConversationActivity {
  scenarioTitle: string;
  scenarioContextPt: string;
  alexBridgePt: string;
  turns: ConversationTurnDefinition[];
}

export interface ConsolidationAchievement {
  id: string;
  titlePt: string;
  category: SkillCategory;
}

export interface ConsolidationActivity {
  titlePt: string;
  alexClosingQuotePt: string;
  achievements: ConsolidationAchievement[];
  nextUnitTitlePt: string;
  nextUnitTeaserPt: string;
  nextLessonId?: string | undefined;
}

export interface LessonActivities {
  prepare: {
    welcomeWordEn: string;
    welcomeWordPt: string;
    explanationPt: string;
  };
  observation: ObservationActivity;
  shadowing: ShadowingActivity;
  rehearsal: RehearsalActivity;
  conversation: ConversationActivity;
  consolidation: ConsolidationActivity;
}

export interface MasteryRequirement {
  skillId: string;
  requiredState: MasteryState;
}

export interface LessonDefinition {
  id: string;
  slug: string;
  level: LevelId;
  blockId: string;
  order: number;
  title: string;
  subtitlePt: string;
  situation: string;
  objectivePt: string;
  location: string;
  pedagogy: {
    vocabulary: VocabularyItem[];
    communicativeFunctions: string[];
    structures: StructurePattern[];
    pronunciation: PronunciationTarget[];
    skills: SkillDefinition[];
  };
  activities: LessonActivities;
  masteryRequirements: MasteryRequirement[];
  reviewItems: string[];
  nextLessonId?: string | undefined;
}

export interface CurriculumBlock {
  id: string;
  level: LevelId;
  order: number;
  titleEn: string;
  titlePt: string;
  descriptionPt: string;
  lessonIds: string[];
}

export interface CurriculumLevel {
  id: LevelId;
  order: number;
  name: string;
  titlePt: string;
  descriptionPt: string;
  blockIds: string[];
}

/**
 * Diagnóstico e Nivelamento (Placement)
 */
export interface DiagnosticItemProbe {
  id: string;
  skillId: string;
  promptPt: string;
  promptEn?: string | undefined;
  type: 'listening_comprehension' | 'speaking_production' | 'recognition' | 'writing';
  expectedAnswers: string[];
}

export interface PlacementAssessmentResult {
  level: LevelId;
  blockId: string;
  recommendedLessonId: string;
  summaryPt: string;
  rationalePt: string;
  masteredSkillIds: string[];
  inProgressSkillIds: string[];
  needsReviewSkillIds: string[];
  skillMasteryMap: Record<string, MasteryState>;
}
