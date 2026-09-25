import { MASTERY_ORDER, type MasteryState, type PlacementAssessmentResult } from "../types";
import { defaultMasteryTracker, type MasteryTracker } from "../mastery/MasteryTracker";
import { getBlocksByLevel, getLessonsByBlock } from "../curriculum";

export interface SkillObservationEvent {
  skillId: string;
  observedIn: 'observation' | 'shadowing' | 'rehearsal' | 'conversation';
  success: boolean;
  formAccurate: boolean;
  usedSupport: boolean;
}

/**
 * Diagnostic & Placement Engine
 * Avalia o domínio real por capacidade/habilidade e recomenda o ponto de partida ideal.
 */
export class PlacementEngine {
  constructor(private masteryTracker: MasteryTracker = defaultMasteryTracker) {}

  /**
   * Avalia o perfil de habilidades do aluno e recomenda onde começar a jornada.
   */
  evaluatePlacement(skillMasteryOverrides?: Record<string, MasteryState>): PlacementAssessmentResult {
    const currentSkills = {
      ...this.masteryTracker.getAllSkillsMastery(),
      ...(skillMasteryOverrides ?? {}),
    };

    const mastered: string[] = [];
    const inProgress: string[] = [];
    const needsReview: string[] = [];

    Object.entries(currentSkills).forEach(([skillId, state]) => {
      const rank = MASTERY_ORDER[state] ?? 0;
      if (rank >= MASTERY_ORDER.USES_IN_CONTEXT) {
        mastered.push(skillId);
      } else if (rank >= MASTERY_ORDER.UNDERSTANDS) {
        inProgress.push(skillId);
      } else if (rank > 0) {
        needsReview.push(skillId);
      }
    });

    // Análise de bloco do A0:
    // Se o aluno ainda não domina saudações básicas ou apresentações, começa na Unit 1 do Bloco 1
    const a0Blocks = getBlocksByLevel("A0");
    const block1 = a0Blocks[0];
    const block1Lessons = block1 ? getLessonsByBlock(block1.id) : [];
    const firstLesson = block1Lessons[0];

    const hasBasicGreeting = (MASTERY_ORDER[currentSkills["skill:a0:greeting_someone"] ?? "NOT_PRESENTED"] ?? 0) >= MASTERY_ORDER.USES_IN_CONTEXT;
    const hasSelfIntro = (MASTERY_ORDER[currentSkills["skill:a0:self_introduction"] ?? "NOT_PRESENTED"] ?? 0) >= MASTERY_ORDER.USES_IN_CONTEXT;

    if (!hasBasicGreeting || !hasSelfIntro) {
      return {
        level: "A0",
        blockId: block1?.id ?? "a0-b1-first-contacts",
        recommendedLessonId: firstLesson?.id ?? "a0-b1-unit1",
        summaryPt: "Ponto de Partida: Primeiro Contato no Hotel",
        rationalePt:
          "Identificamos que construir uma base sólida nas saudações e apresentações com Alex trará confiança imediata.",
        masteredSkillIds: mastered,
        inProgressSkillIds: inProgress,
        needsReviewSkillIds: needsReview,
        skillMasteryMap: currentSkills,
      };
    }

    // Se já domina a Unit 1, sugere a próxima etapa curricular
    return {
      level: "A0",
      blockId: block1?.id ?? "a0-b1-first-contacts",
      recommendedLessonId: firstLesson?.nextLessonId ?? "a0-b2-unit2",
      summaryPt: "Avanço Direto: Você já domina saudações e apresentações",
      rationalePt:
        "Você demonstrou naturalidade ao se apresentar e cumprimentar. Recomendamos avançar diretamente para a próxima situação real.",
      masteredSkillIds: mastered,
      inProgressSkillIds: inProgress,
      needsReviewSkillIds: needsReview,
      skillMasteryMap: currentSkills,
    };
  }

  /**
   * Microdiagnóstico Contínuo e Não Intrusivo:
   * Atualiza sutilmente o estado da habilidade durante qualquer interação de aula
   * sem burocracia ou interrupção da experiência do aluno.
   */
  recordSkillObservation(event: SkillObservationEvent): MasteryState {
    const current = this.masteryTracker.getSkillMastery(event.skillId);

    if (event.success) {
      if (event.observedIn === "conversation" && event.formAccurate) {
        return this.masteryTracker.advanceSkillMastery(event.skillId, "USES_IN_CONTEXT");
      }
      if (event.observedIn === "rehearsal") {
        return this.masteryTracker.advanceSkillMastery(
          event.skillId,
          event.usedSupport ? "REPRODUCES_WITH_SUPPORT" : "PRODUCES_ALONE"
        );
      }
      if (event.observedIn === "shadowing") {
        return this.masteryTracker.advanceSkillMastery(event.skillId, "REPRODUCES_WITH_SUPPORT");
      }
      if (event.observedIn === "observation") {
        return this.masteryTracker.advanceSkillMastery(event.skillId, "UNDERSTANDS");
      }
    }

    return current;
  }
}

export const defaultPlacementEngine = new PlacementEngine();
