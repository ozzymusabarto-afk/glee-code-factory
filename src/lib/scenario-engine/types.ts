export type CompletionRule =
  | 'single_accept'
  | 'choice_correct'
  | 'all_required_terms';

export type MatchType =
  | 'exact'
  | 'normalized'
  | 'contains_required_terms'
  | 'accepted_variant';

export type ValidationResultType =
  | 'accepted'
  | 'near_match'
  | 'retry'
  | 'recognition_error';

export interface ExpectedResponse {
  id: string;
  responseText: string;
  normalizedText: string;
  matchType: MatchType;
  isPrimary: boolean;
}

export interface ValidationInput {
  transcript: string | null | undefined;
  completionRule: CompletionRule;
  expectedResponses: ExpectedResponse[];
  requiredTerms?: string[] | undefined;
}

export interface ValidationResult {
  result: ValidationResultType;
  score: number;
  normalizedTranscript: string;
  matchedResponseId?: string | undefined;
  reason?: string | undefined;
}

export interface ScenarioStep {
  id: string;
  sequence: number;
  stepType: string;
  completionRule: CompletionRule;
  speakerCharacterId: string | null;
  promptEn: string | null;
  supportPt: string | null;
  targetPhrase: string | null;
  hintLevel1: string | null;
  hintLevel2: string | null;
  audioText: string | null;
  expectedResponses?: ExpectedResponse[] | undefined;
  requiredTerms?: string[] | undefined;
}

export interface ScenarioDefinition {
  id: string;
  slug: string;
  language: string;
  level: string;
  title: string;
  description: string | null;
  contextPt: string | null;
  status: string;
  sortOrder: number;
  createdAt: string | null;
  steps: ScenarioStep[];
}

export interface ScenarioCharacter {
  id: string;
  scenarioId: string;
  name: string;
  role: string | null;
  avatarKey: string | null;
  voiceKey: string | null;
}

export interface LoadedScenario {
  scenario: ScenarioDefinition;
  characters: ScenarioCharacter[];
  steps: ScenarioStep[];
}

export type ScenarioSessionStatus = 'idle' | 'active' | 'completed';

export interface ScenarioEngineState {
  scenarioId: string;
  scenarioSlug: string;
  status: ScenarioSessionStatus;
  currentStepId: string | null;
  completedStepIds: string[];
}

export interface ScenarioSubmission {
  validation: ValidationResult;
  state: ScenarioEngineState;
  currentStep: ScenarioStep | null;
}
