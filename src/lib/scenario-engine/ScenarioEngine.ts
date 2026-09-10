import { ResponseValidator } from './ResponseValidator';
import type {
  ScenarioDefinition,
  ScenarioEngineState,
  ScenarioSessionStatus,
  ScenarioStep,
  ScenarioSubmission,
  ValidationResult,
} from './types';

export class ScenarioEngine {
  private readonly steps: ScenarioStep[];
  private readonly validator: ResponseValidator;
  private currentIndex = 0;
  private status: ScenarioSessionStatus = 'idle';
  private completedStepIds: string[] = [];

  constructor(
    private readonly scenario: ScenarioDefinition,
    validator: ResponseValidator = new ResponseValidator(),
  ) {
    this.steps = [...scenario.steps].sort((a, b) => a.sequence - b.sequence);
    this.validator = validator;
    this.assertScenarioIsValid();
  }

  start(): ScenarioEngineState {
    if (this.status === 'idle') this.status = 'active';
    return this.getState();
  }

  getCurrentStep(): ScenarioStep | null {
    return this.status === 'completed' ? null : this.steps[this.currentIndex] ?? null;
  }

  getState(): ScenarioEngineState {
    return {
      scenarioId: this.scenario.id,
      scenarioSlug: this.scenario.slug,
      status: this.status,
      currentStepId: this.getCurrentStep()?.id ?? null,
      completedStepIds: [...this.completedStepIds],
    };
  }

  completeCurrentStep(): ScenarioEngineState {
    this.ensureActive();
    const currentStep = this.getCurrentStep();

    if (!currentStep) return this.getState();

    this.completedStepIds.push(currentStep.id);
    this.currentIndex += 1;

    if (this.currentIndex >= this.steps.length) this.status = 'completed';

    return this.getState();
  }

  submitResponse(transcript: string | null | undefined): ScenarioSubmission {
    this.ensureActive();
    const currentStep = this.getCurrentStep();

    if (!currentStep) {
      throw new Error('The scenario has no active step.');
    }

    const validation = this.validator.validate({
      transcript,
      completionRule: currentStep.completionRule,
      expectedResponses: currentStep.expectedResponses ?? [],
      requiredTerms: currentStep.requiredTerms,
    });

    if (validation.result === 'accepted') this.completeCurrentStep();

    return {
      validation,
      state: this.getState(),
      currentStep: this.getCurrentStep(),
    };
  }

  private ensureActive(): void {
    if (this.status === 'idle') this.start();
    if (this.status !== 'active') {
      throw new Error('The scenario is already completed.');
    }
  }

  private assertScenarioIsValid(): void {
    if (!this.steps.length) throw new Error('A scenario must contain at least one step.');

    const identifiers = new Set<string>();
    let previousSequence = 0;

    for (const step of this.steps) {
      if (identifiers.has(step.id)) throw new Error(`Duplicate scenario step id: ${step.id}`);
      if (step.sequence <= previousSequence) {
        throw new Error('Scenario steps must have unique, increasing sequences.');
      }

      identifiers.add(step.id);
      previousSequence = step.sequence;
    }
  }
}

export type { ScenarioDefinition, ScenarioEngineState, ScenarioStep, ScenarioSubmission, ValidationResult } from './types';
