import { MASTERY_ORDER, type LessonDefinition, type MasteryState } from "../types";

export interface SkillMasteryRecord {
  skillId: string;
  state: MasteryState;
  updatedAt: string;
  successfulAttempts: number;
}

export interface LessonProgressRecord {
  lessonId: string;
  completedStages: string[];
  isCompleted: boolean;
  score: number;
  lastVisitedStage?: string | undefined;
  updatedAt: string;
}

const LOCAL_STORAGE_SKILL_MASTERY_KEY = "polybot_skill_mastery_v1";
const LOCAL_STORAGE_LESSON_PROGRESS_KEY = "polybot_lesson_progress_v1";

export class MasteryTracker {
  private skillStore: Map<string, SkillMasteryRecord> = new Map();
  private lessonStore: Map<string, LessonProgressRecord> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") return;
    try {
      const savedSkills = localStorage.getItem(LOCAL_STORAGE_SKILL_MASTERY_KEY);
      if (savedSkills) {
        const parsed: Record<string, SkillMasteryRecord> = JSON.parse(savedSkills);
        Object.entries(parsed).forEach(([id, rec]) => this.skillStore.set(id, rec));
      }

      const savedLessons = localStorage.getItem(LOCAL_STORAGE_LESSON_PROGRESS_KEY);
      if (savedLessons) {
        const parsed: Record<string, LessonProgressRecord> = JSON.parse(savedLessons);
        Object.entries(parsed).forEach(([id, rec]) => this.lessonStore.set(id, rec));
      }
    } catch (e) {
      console.warn("[MasteryTracker] Erro ao ler armazenamento local:", e);
    }
  }

  private persist(): void {
    if (typeof window === "undefined") return;
    try {
      const skillsObj: Record<string, SkillMasteryRecord> = {};
      this.skillStore.forEach((v, k) => (skillsObj[k] = v));
      localStorage.setItem(LOCAL_STORAGE_SKILL_MASTERY_KEY, JSON.stringify(skillsObj));

      const lessonsObj: Record<string, LessonProgressRecord> = {};
      this.lessonStore.forEach((v, k) => (lessonsObj[k] = v));
      localStorage.setItem(LOCAL_STORAGE_LESSON_PROGRESS_KEY, JSON.stringify(lessonsObj));
    } catch (e) {
      console.warn("[MasteryTracker] Erro ao persistir no armazenamento local:", e);
    }
  }

  /**
   * Obtém o estado atual de domínio de uma habilidade
   */
  getSkillMastery(skillId: string): MasteryState {
    return this.skillStore.get(skillId)?.state ?? "NOT_PRESENTED";
  }

  /**
   * Atualiza progressivamente o estado de domínio de uma habilidade.
   * Por padrão, só avança o estado na escala pedagógica (não rebaixa sem force=true).
   */
  advanceSkillMastery(skillId: string, targetState: MasteryState, force = false): MasteryState {
    const current = this.getSkillMastery(skillId);
    const currentRank = MASTERY_ORDER[current] ?? 0;
    const targetRank = MASTERY_ORDER[targetState] ?? 0;

    if (!force && targetRank <= currentRank) {
      // Já está em um nível igual ou superior
      return current;
    }

    const prev = this.skillStore.get(skillId);
    const record: SkillMasteryRecord = {
      skillId,
      state: targetState,
      updatedAt: new Date().toISOString(),
      successfulAttempts: (prev?.successfulAttempts ?? 0) + 1,
    };

    this.skillStore.set(skillId, record);
    this.persist();
    return targetState;
  }

  /**
   * Atualiza múltiplas habilidades em lote
   */
  advanceSkillsMastery(skillIds: string[], targetState: MasteryState): void {
    skillIds.forEach((id) => this.advanceSkillMastery(id, targetState));
  }

  /**
   * Registra a conclusão de uma etapa da lição
   */
  recordStageCompletion(lessonId: string, stageId: string): void {
    const prev = this.lessonStore.get(lessonId) ?? {
      lessonId,
      completedStages: [],
      isCompleted: false,
      score: 0,
      updatedAt: new Date().toISOString(),
    };

    const stagesSet = new Set(prev.completedStages);
    stagesSet.add(stageId);

    const record: LessonProgressRecord = {
      ...prev,
      completedStages: Array.from(stagesSet),
      lastVisitedStage: stageId,
      updatedAt: new Date().toISOString(),
    };

    this.lessonStore.set(lessonId, record);
    this.persist();
  }

  /**
   * Registra a conclusão final de uma lição e atualiza as habilidades associadas
   */
  completeLesson(lesson: LessonDefinition, score = 1.0): void {
    const prev = this.lessonStore.get(lesson.id);
    const record: LessonProgressRecord = {
      lessonId: lesson.id,
      completedStages: prev?.completedStages ?? [],
      isCompleted: true,
      score,
      updatedAt: new Date().toISOString(),
    };

    this.lessonStore.set(lesson.id, record);

    // Avança os requisitos de domínio da lição
    lesson.masteryRequirements.forEach((req) => {
      this.advanceSkillMastery(req.skillId, req.requiredState);
    });

    this.persist();
  }

  /**
   * Verifica se o aluno atingiu os requisitos de domínio para uma lição
   */
  evaluateLessonMastery(lesson: LessonDefinition): {
    meetsRequirements: boolean;
    rate: number;
    skillsStatus: Record<string, { current: MasteryState; required: MasteryState; met: boolean }>;
  } {
    const skillsStatus: Record<string, { current: MasteryState; required: MasteryState; met: boolean }> = {};
    let metCount = 0;

    lesson.masteryRequirements.forEach((req) => {
      const current = this.getSkillMastery(req.skillId);
      const currentRank = MASTERY_ORDER[current] ?? 0;
      const requiredRank = MASTERY_ORDER[req.requiredState] ?? 0;
      const met = currentRank >= requiredRank;
      if (met) metCount++;

      skillsStatus[req.skillId] = {
        current,
        required: req.requiredState,
        met,
      };
    });

    const total = lesson.masteryRequirements.length;
    const rate = total > 0 ? metCount / total : 1.0;

    return {
      meetsRequirements: metCount === total,
      rate,
      skillsStatus,
    };
  }

  /**
   * Retorna todo o mapa de domínio atual do aluno
   */
  getAllSkillsMastery(): Record<string, MasteryState> {
    const result: Record<string, MasteryState> = {};
    this.skillStore.forEach((v, k) => (result[k] = v.state));
    return result;
  }
}

// Instância singleton para uso em todo o aplicativo
export const defaultMasteryTracker = new MasteryTracker();
