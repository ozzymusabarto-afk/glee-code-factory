import { supabase } from '@/integrations/supabase/client';
import type { ValidationResultType } from './types';

export type AttemptResultType = ValidationResultType | 'skipped';

export interface RecordAttemptParams {
  sessionId?: string | null | undefined;
  scenarioId: string;
  stepId: string;
  transcript?: string | null | undefined;
  normalizedTranscript?: string | null | undefined;
  matchScore?: number | null | undefined;
  result: AttemptResultType;
  hintLevelUsed?: number | undefined;
}

export interface UpdateProgressParams {
  scenarioId: string;
  completedStepsCount: number;
  totalStepsCount: number;
  lastStepId?: string | null | undefined;
  isCompleted: boolean;
  score?: number | null | undefined;
}

const LOCAL_STORAGE_SESSION_PREFIX = 'scenario_session_';
const LOCAL_STORAGE_PROGRESS_PREFIX = 'scenario_progress_';
const LOCAL_STORAGE_ATTEMPTS_PREFIX = 'scenario_attempts_';

export class ScenarioProgressService {
  /**
   * Inicia uma nova sessão de aprendizado para o cenário.
   * Se o usuário estiver autenticado no Supabase, salva no banco.
   * Caso contrário, gera uma sessão local no localStorage.
   */
  async startSession(
    scenarioId: string,
    initialStepId?: string | null | undefined,
  ): Promise<string> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('learning_sessions')
          .insert({
            user_id: user.id,
            scenario_id: scenarioId,
            current_step_id: initialStepId ?? null,
            status: 'active',
          })
          .select('id')
          .single();

        if (!error && data?.id) {
          return data.id;
        }
      }
    } catch (err) {
      console.warn('[ScenarioProgressService] Não foi possível salvar sessão no Supabase, usando local:', err);
    }

    // Fallback local
    const localSessionId = `local-sess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `${LOCAL_STORAGE_SESSION_PREFIX}${scenarioId}`,
        JSON.stringify({
          sessionId: localSessionId,
          scenarioId,
          currentStepId: initialStepId,
          startedAt: new Date().toISOString(),
          status: 'active',
        }),
      );
    }
    return localSessionId;
  }

  /**
   * Registra uma tentativa de resposta do aluno no passo atual.
   */
  async recordAttempt(params: RecordAttemptParams): Promise<void> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && params.sessionId && !params.sessionId.startsWith('local-')) {
        const { error } = await supabase.from('step_attempts').insert({
          session_id: params.sessionId,
          step_id: params.stepId,
          transcript: params.transcript ?? null,
          normalized_transcript: params.normalizedTranscript ?? null,
          match_score: params.matchScore ?? null,
          result: params.result,
          hint_level_used: params.hintLevelUsed ?? 0,
        });

        if (!error) return;
      }
    } catch (err) {
      console.warn('[ScenarioProgressService] Falha ao persistir tentativa no Supabase, salvando localmente:', err);
    }

    // Fallback local no localStorage
    if (typeof window !== 'undefined') {
      const storageKey = `${LOCAL_STORAGE_ATTEMPTS_PREFIX}${params.scenarioId}`;
      const existing = localStorage.getItem(storageKey);
      const attempts = existing ? JSON.parse(existing) : [];
      attempts.push({
        ...params,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(storageKey, JSON.stringify(attempts));
    }
  }

  /**
   * Atualiza o progresso geral do usuário no cenário.
   */
  async updateProgress(params: UpdateProgressParams): Promise<void> {
    const status = params.isCompleted
      ? 'completed'
      : params.completedStepsCount > 0
        ? 'in_progress'
        : 'not_started';

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase.from('user_scenario_progress').upsert({
          user_id: user.id,
          scenario_id: params.scenarioId,
          status,
          completed_steps: params.completedStepsCount,
          best_score: params.score ?? null,
          last_step_id: params.lastStepId ?? null,
          last_attempt_at: new Date().toISOString(),
          completed_at: params.isCompleted ? new Date().toISOString() : null,
        });

        if (!error) return;
      }
    } catch (err) {
      console.warn('[ScenarioProgressService] Falha ao atualizar progresso no Supabase, salvando localmente:', err);
    }

    // Fallback local
    if (typeof window !== 'undefined') {
      const storageKey = `${LOCAL_STORAGE_PROGRESS_PREFIX}${params.scenarioId}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          status,
          completedSteps: params.completedStepsCount,
          totalSteps: params.totalStepsCount,
          lastStepId: params.lastStepId,
          lastAttemptAt: new Date().toISOString(),
          completedAt: params.isCompleted ? new Date().toISOString() : null,
        }),
      );
    }
  }

  /**
   * Finaliza uma sessão de aprendizado ativa.
   */
  async completeSession(sessionId?: string | null | undefined): Promise<void> {
    if (!sessionId) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && !sessionId.startsWith('local-')) {
        await supabase
          .from('learning_sessions')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', sessionId);
      }
    } catch (err) {
      console.warn('[ScenarioProgressService] Falha ao finalizar sessão no Supabase:', err);
    }
  }
}
