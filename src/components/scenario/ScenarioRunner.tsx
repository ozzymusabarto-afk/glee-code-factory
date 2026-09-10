import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { WebSpeechAudioService } from '@/lib/scenario-engine/AudioService';
import { ScenarioEngine } from '@/lib/scenario-engine/ScenarioEngine';
import { ScenarioProgressService } from '@/lib/scenario-engine/ScenarioProgressService';
import { ScenarioRepository } from '@/lib/scenario-engine/ScenarioRepository';
import type {
  LoadedScenario,
  ScenarioEngineState,
  ScenarioStep,
  ValidationResult,
} from '@/lib/scenario-engine/types';

interface ScenarioRunnerProps {
  slug: string;
}

type RunnerStatus = 'loading' | 'ready' | 'not_found' | 'error';

export function ScenarioRunner({ slug }: ScenarioRunnerProps) {
  const engineRef = useRef<ScenarioEngine | null>(null);
  const audioServiceRef = useRef<WebSpeechAudioService | null>(null);
  if (!audioServiceRef.current) audioServiceRef.current = new WebSpeechAudioService();
  const progressServiceRef = useRef<ScenarioProgressService | null>(null);
  if (!progressServiceRef.current) progressServiceRef.current = new ScenarioProgressService();

  const [runnerStatus, setRunnerStatus] = useState<RunnerStatus>('loading');
  const [loadedScenario, setLoadedScenario] = useState<LoadedScenario | null>(null);
  const [engineState, setEngineState] = useState<ScenarioEngineState | null>(null);
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const {
    isListening,
    recognitionResult,
    startListening,
    stopListening,
    supported: speechRecognitionSupported,
  } = useSpeechRecognition({ lang: 'en-US' });

  useEffect(() => {
    let cancelled = false;

    async function loadScenario() {
      setRunnerStatus('loading');
      setErrorMessage(null);
      setLoadedScenario(null);
      setEngineState(null);
      setCurrentStep(null);
      setValidation(null);
      setHintLevel(0);
      setSpeechFeedback(null);
      setSessionId(null);
      engineRef.current = null;

      try {
        const repository = new ScenarioRepository();
        const loaded = await repository.getPublishedBySlug(slug);

        if (cancelled) return;

        if (!loaded) {
          setRunnerStatus('not_found');
          return;
        }

        const engine = new ScenarioEngine(loaded.scenario);
        engineRef.current = engine;
        setLoadedScenario(loaded);
        const initialState = engine.start();
        const initialStep = engine.getCurrentStep();
        setEngineState(initialState);
        setCurrentStep(initialStep);
        setRunnerStatus('ready');

        progressServiceRef.current
          ?.startSession(loaded.scenario.id, initialStep?.id)
          .then((id) => {
            if (!cancelled) setSessionId(id);
          });
      } catch (error) {
        if (cancelled) return;

        setRunnerStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load this scenario.');
      }
    }

    loadScenario();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    setHintLevel(0);
    setSpeechFeedback(null);
  }, [currentStep?.id]);

  useEffect(() => {
    const audioService = audioServiceRef.current;
    return () => audioService?.stop();
  }, []);

  const handleContinue = () => {
    const engine = engineRef.current;
    const scenario = loadedScenario?.scenario;
    const step = currentStep;
    if (!engine || !scenario || !step) return;

    setValidation(null);
    engine.completeCurrentStep();
    const nextState = engine.getState();
    const nextStep = engine.getCurrentStep();
    setEngineState(nextState);
    setCurrentStep(nextStep);

    const progressService = progressServiceRef.current;
    if (progressService) {
      const isFinished = nextState.status === 'completed';
      progressService.updateProgress({
        scenarioId: scenario.id,
        completedStepsCount: nextState.completedStepIds.length,
        totalStepsCount: loadedScenario.steps.length,
        lastStepId: nextStep?.id,
        isCompleted: isFinished,
      });

      if (isFinished) {
        progressService.completeSession(sessionId);
      }
    }
  };

  const handleSubmit = useCallback(
    (value: string) => {
      const engine = engineRef.current;
      const scenario = loadedScenario?.scenario;
      const step = currentStep;
      if (!engine || !scenario || !step) return;

      const submission = engine.submitResponse(value);
      setValidation(submission.validation);
      setEngineState(submission.state);
      setCurrentStep(submission.currentStep);

      const progressService = progressServiceRef.current;
      if (progressService) {
        progressService.recordAttempt({
          sessionId,
          scenarioId: scenario.id,
          stepId: step.id,
          transcript: value,
          normalizedTranscript: submission.validation.normalizedTranscript,
          matchScore: submission.validation.score,
          result: submission.validation.result,
          hintLevelUsed: hintLevel,
        });

        if (submission.validation.result === 'accepted') {
          const isFinished = submission.state.status === 'completed';
          progressService.updateProgress({
            scenarioId: scenario.id,
            completedStepsCount: submission.state.completedStepIds.length,
            totalStepsCount: loadedScenario.steps.length,
            lastStepId: submission.currentStep?.id,
            isCompleted: isFinished,
            score: submission.validation.score,
          });

          if (isFinished) {
            progressService.completeSession(sessionId);
          }
        }
      }
    },
    [currentStep, hintLevel, loadedScenario, sessionId],
  );

  useEffect(() => {
    if (!recognitionResult?.isFinal) return;

    if (recognitionResult.error || !recognitionResult.transcript) {
      setSpeechFeedback('Não consegui ouvir sua resposta. Tente novamente.');
      return;
    }

    setSpeechFeedback(null);
    handleSubmit(recognitionResult.transcript);
  }, [handleSubmit, recognitionResult]);

  if (runnerStatus === 'loading') {
    return <ScenarioRunnerShell>Carregando cenário…</ScenarioRunnerShell>;
  }

  if (runnerStatus === 'not_found') {
    return <ScenarioRunnerShell>Cenário publicado não encontrado.</ScenarioRunnerShell>;
  }

  if (runnerStatus === 'error') {
    return <ScenarioRunnerShell>Erro ao carregar cenário: {errorMessage}</ScenarioRunnerShell>;
  }

  if (!loadedScenario || !engineState) return null;

  const isComplete = engineState.status === 'completed';
  const speaker = currentStep?.speakerCharacterId
    ? loadedScenario.characters.find((character) => character.id === currentStep.speakerCharacterId)
    : null;
  const expectsResponse = Boolean(currentStep?.expectedResponses?.length);
  const isProductionStep = currentStep
    ? ['repeat', 'guided_speak', 'free_speak'].includes(currentStep.stepType)
    : false;
  const isVoiceResponseStep = isProductionStep || (currentStep?.stepType === 'recap' && expectsResponse);
  const showTargetPhrase = Boolean(currentStep?.targetPhrase) && (!isProductionStep || hintLevel === 3);
  const audioService = audioServiceRef.current;
  const feedbackMessage = validation
    ? {
        accepted: 'Muito bem! Vamos continuar.',
        near_match: 'Quase lá. Tente novamente com calma.',
        retry: 'Vamos tentar de novo.',
        recognition_error: 'Não consegui identificar uma resposta. Tente novamente.',
      }[validation.result]
    : null;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
      <header className="space-y-2 border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
          {loadedScenario.scenario.language} · {loadedScenario.scenario.level}
        </p>
        <h1 className="text-2xl font-black">{loadedScenario.scenario.title}</h1>
        {loadedScenario.scenario.contextPt && (
          <p className="text-sm text-slate-600">{loadedScenario.scenario.contextPt}</p>
        )}
        <p className="text-xs font-medium text-slate-500">
          {engineState.completedStepIds.length} de {loadedScenario.steps.length} passos concluídos
        </p>
      </header>

      {isComplete ? (
        <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-900">
          <h2 className="font-bold">Cenário concluído</h2>
          <p className="mt-1 text-sm">Todos os passos foram concluídos neste teste local.</p>
        </div>
      ) : currentStep ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Passo {currentStep.sequence} · {currentStep.stepType}
            </p>
            {speaker && <p className="text-sm font-semibold text-blue-700">{speaker.name}</p>}
            {currentStep.promptEn && (
              <p className="text-xl font-bold leading-relaxed">{currentStep.promptEn}</p>
            )}
            {currentStep.supportPt && (
              <p className="text-sm text-slate-600">{currentStep.supportPt}</p>
            )}
            {showTargetPhrase && currentStep.targetPhrase && (
              <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
                {currentStep.targetPhrase}
              </p>
            )}
            {currentStep.audioText && (
              <button
                type="button"
                onClick={() =>
                  audioService?.speak(currentStep.audioText ?? '', {
                    lang: loadedScenario.scenario.language === 'en' ? 'en-US' : loadedScenario.scenario.language,
                    voiceName: speaker?.voiceKey ?? undefined,
                  })
                }
                disabled={!audioService?.isSupported()}
                className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
              >
                Ouvir fala
              </button>
            )}
          </div>

          {expectsResponse ? (
            currentStep.stepType === 'choice' ? (
              <div className="flex flex-col gap-3">
                {currentStep.expectedResponses?.map((response) => (
                  <button
                    key={response.id}
                    type="button"
                    onClick={() => handleSubmit(response.responseText)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    {response.responseText}
                  </button>
                ))}
              </div>
            ) : isVoiceResponseStep ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">Responda usando o microfone</p>
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  disabled={!speechRecognitionSupported}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isListening ? 'Parar de ouvir' : 'Falar agora'}
                </button>
                {!speechRecognitionSupported && (
                  <p className="text-sm text-slate-600">
                    O reconhecimento de voz não está disponível neste navegador.
                  </p>
                )}
                {speechFeedback && <p className="text-sm text-rose-700">{speechFeedback}</p>}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Continuar
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Continuar
            </button>
          )}

          {isProductionStep && currentStep.targetPhrase && (
            <div className="flex flex-wrap gap-2">
              {hintLevel < 1 && currentStep.hintLevel1 && (
                <button
                  type="button"
                  onClick={() => setHintLevel(1)}
                  className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Ver uma dica
                </button>
              )}
              {hintLevel >= 1 && hintLevel < 2 && currentStep.hintLevel2 && (
                <button
                  type="button"
                  onClick={() => setHintLevel(2)}
                  className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Ver mais uma dica
                </button>
              )}
              {hintLevel >= 2 && hintLevel < 3 && (
                <button
                  type="button"
                  onClick={() => setHintLevel(3)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Mostrar frase-modelo
                </button>
              )}
            </div>
          )}

          {isProductionStep && hintLevel >= 1 && hintLevel < 3 && (
            <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
              {hintLevel === 1 ? currentStep.hintLevel1 : currentStep.hintLevel2}
            </div>
          )}

          {validation && (
            <div
              className={`rounded-xl p-4 text-sm ${
                validation.result === 'accepted'
                  ? 'bg-emerald-50 text-emerald-900'
                  : validation.result === 'near_match'
                    ? 'bg-amber-50 text-amber-900'
                    : 'bg-rose-50 text-rose-900'
              }`}
            >
              <p className="font-bold">{feedbackMessage}</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}

function ScenarioRunnerShell({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
      {children}
    </section>
  );
}
