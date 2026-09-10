import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

import type {
  CompletionRule,
  ExpectedResponse,
  LoadedScenario,
  MatchType,
  ScenarioCharacter,
  ScenarioDefinition,
  ScenarioStep,
} from './types';
import { SEED_FIRST_CONTACT_SCENARIO } from './seedData';

type ScenarioRow = Database['public']['Tables']['learning_scenarios']['Row'];
type CharacterRow = Database['public']['Tables']['scenario_characters']['Row'];
type StepRow = Database['public']['Tables']['learning_steps']['Row'];
type ExpectedResponseRow = Database['public']['Tables']['step_expected_responses']['Row'];

const completionRules: CompletionRule[] = [
  'single_accept',
  'choice_correct',
  'all_required_terms',
];

const matchTypes: MatchType[] = [
  'exact',
  'normalized',
  'contains_required_terms',
  'accepted_variant',
];

function asCompletionRule(value: string): CompletionRule {
  if (!completionRules.includes(value as CompletionRule)) {
    throw new Error(`Unsupported completion rule returned by Supabase: ${value}`);
  }

  return value as CompletionRule;
}

function asMatchType(value: string): MatchType {
  if (!matchTypes.includes(value as MatchType)) {
    throw new Error(`Unsupported response match type returned by Supabase: ${value}`);
  }

  return value as MatchType;
}

function toCharacter(row: CharacterRow): ScenarioCharacter {
  return {
    id: row.id,
    scenarioId: row.scenario_id,
    name: row.name,
    role: row.role,
    avatarKey: row.avatar_key,
    voiceKey: row.voice_key,
  };
}

function toExpectedResponse(row: ExpectedResponseRow): ExpectedResponse {
  return {
    id: row.id,
    responseText: row.response_text,
    normalizedText: row.normalized_text,
    matchType: asMatchType(row.match_type),
    isPrimary: row.is_primary,
  };
}

function toStep(row: StepRow, expectedResponses: ExpectedResponse[]): ScenarioStep {
  return {
    id: row.id,
    sequence: row.sequence,
    stepType: row.step_type,
    completionRule: asCompletionRule(row.completion_rule),
    speakerCharacterId: row.speaker_character_id,
    promptEn: row.prompt_en,
    supportPt: row.support_pt,
    targetPhrase: row.target_phrase,
    hintLevel1: row.hint_level_1,
    hintLevel2: row.hint_level_2,
    audioText: row.audio_text,
    expectedResponses,
  };
}

function toScenario(row: ScenarioRow, steps: ScenarioStep[]): ScenarioDefinition {
  return {
    id: row.id,
    slug: row.slug,
    language: row.language,
    level: row.level,
    title: row.title,
    description: row.description,
    contextPt: row.context_pt,
    status: row.status,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    steps,
  };
}

export class ScenarioRepository {
  async getPublishedBySlug(slug: string): Promise<LoadedScenario | null> {
    const { data: scenarioRow, error: scenarioError } = await supabase
      .from('learning_scenarios')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (scenarioError) {
      if (
        (scenarioError.code === 'PGRST205' || scenarioError.message?.includes('schema cache')) &&
        slug === SEED_FIRST_CONTACT_SCENARIO.scenario.slug
      ) {
        console.warn(
          `[ScenarioRepository] Tabela 'learning_scenarios' não encontrada no Supabase (${scenarioError.code}). Carregando seed local '${slug}'. Execute a migration '20260821120000_create_scenario_engine_foundation.sql' no SQL Editor do Supabase para persistência remota.`
        );
        return SEED_FIRST_CONTACT_SCENARIO;
      }

      throw new Error(`Unable to load published scenario "${slug}": ${scenarioError.message}`);
    }

    if (!scenarioRow) return null;

    const [{ data: characterRows, error: charactersError }, { data: stepRows, error: stepsError }] =
      await Promise.all([
        supabase
          .from('scenario_characters')
          .select('*')
          .eq('scenario_id', scenarioRow.id),
        supabase
          .from('learning_steps')
          .select('*')
          .eq('scenario_id', scenarioRow.id)
          .order('sequence', { ascending: true }),
      ]);

    if (charactersError) {
      throw new Error(`Unable to load characters for scenario "${slug}": ${charactersError.message}`);
    }

    if (stepsError) {
      throw new Error(`Unable to load steps for scenario "${slug}": ${stepsError.message}`);
    }

    const resolvedStepRows = stepRows ?? [];
    let responseRows: ExpectedResponseRow[] = [];

    if (resolvedStepRows.length) {
      const { data, error } = await supabase
        .from('step_expected_responses')
        .select('*')
        .in('step_id', resolvedStepRows.map((step) => step.id));

      if (error) {
        throw new Error(`Unable to load expected responses for scenario "${slug}": ${error.message}`);
      }

      responseRows = data ?? [];
    }

    const responsesByStepId = new Map<string, ExpectedResponse[]>();
    for (const row of responseRows) {
      const responses = responsesByStepId.get(row.step_id) ?? [];
      responses.push(toExpectedResponse(row));
      responsesByStepId.set(row.step_id, responses);
    }

    const steps = resolvedStepRows.map((row) =>
      toStep(row, responsesByStepId.get(row.id) ?? []),
    );

    return {
      scenario: toScenario(scenarioRow, steps),
      characters: (characterRows ?? []).map(toCharacter),
      steps,
    };
  }
}
