import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, Mic, CheckCircle2, RotateCcw, ArrowRight, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebSpeechAudioService } from "@/lib/scenario-engine/AudioService";
import { ResponseValidator } from "@/lib/scenario-engine/ResponseValidator";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { AlexAvatar } from "@/components/character/AlexCharacter";
import { cn } from "@/lib/utils";

export type ShadowingStage =
  | "listen"        // 1. OUVIR
  | "shadow"        // 2. ACOMPANHAR & REPETIR JUNTO
  | "try_alone"     // 3. TENTAR SOZINHO
  | "feedback";     // 4. FEEDBACK & USAR NA SITUAÇÃO

export interface ShadowingExerciseProps {
  targetPhrase: string;
  translationPt: string;
  audioText?: string | undefined;
  level?: string | undefined;
  suggestedReps?: number | undefined;
  onComplete: () => void;
  className?: string | undefined;
}

export function ShadowingExercise({
  targetPhrase,
  translationPt,
  audioText,
  level = "A0",
  suggestedReps = 2,
  onComplete,
  className,
}: ShadowingExerciseProps) {
  const [stage, setStage] = useState<ShadowingStage>("listen");
  const [repsCount, setRepsCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [typedText, setTypedText] = useState("");
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<{
    status: "success" | "partial" | "retry";
    feedback: string;
  } | null>(null);

  const audioServiceRef = useRef<WebSpeechAudioService | null>(null);
  if (!audioServiceRef.current) audioServiceRef.current = new WebSpeechAudioService();

  const validatorRef = useRef<ResponseValidator | null>(null);
  if (!validatorRef.current) validatorRef.current = new ResponseValidator();

  const {
    isListening,
    recognitionResult,
    startListening,
    stopListening,
    supported: speechSupported,
  } = useSpeechRecognition({ lang: "en-US" });

  const textToSpeak = audioText || targetPhrase;

  const playAudio = useCallback(() => {
    if (!audioServiceRef.current?.isSupported()) return;
    setIsPlaying(true);
    audioServiceRef.current.speak(textToSpeak, {
      lang: "en-US",
      rate: 0.9, // Ligeiramente pausado para aprendizado natural
    });
    setTimeout(() => {
      setIsPlaying(false);
      setRepsCount((c) => c + 1);
    }, 1400);
  }, [textToSpeak]);

  // Toca o áudio automaticamente na primeira vez que entra na fase listen
  useEffect(() => {
    const timer = setTimeout(() => {
      playAudio();
    }, 400);
    return () => clearTimeout(timer);
  }, [playAudio]);

  const handleEvaluateAttempt = useCallback(
    (spokenOrTyped: string) => {
      setRecognizedText(spokenOrTyped);
      const validator = validatorRef.current;
      if (!validator) return;

      const result = validator.validate({
        transcript: spokenOrTyped,
        completionRule: "single_accept",
        expectedResponses: [
          {
            id: "target",
            responseText: targetPhrase,
            normalizedText: targetPhrase.toLowerCase().replace(/[^a-z0-9\s]/g, ""),
            matchType: "normalized",
            isPrimary: true,
          },
        ],
      });

      if (result.result === "accepted") {
        setEvaluation({
          status: "success",
          feedback: "Ritmo e clareza excelentes! Você pegou a melodia da frase.",
        });
      } else if (result.result === "near_match") {
        setEvaluation({
          status: "partial",
          feedback: "Muito bom! Quase perfeito no som. Quer tentar mais uma vez ou avançar?",
        });
      } else {
        setEvaluation({
          status: "retry",
          feedback: "O som saiu um pouco diferente. Sem problemas, você pode repetir com calma!",
        });
      }
      setStage("feedback");
    },
    [targetPhrase],
  );

  // Escuta resultado final do microfone
  useEffect(() => {
    if (stage === "try_alone" && recognitionResult?.isFinal && recognitionResult.transcript) {
      handleEvaluateAttempt(recognitionResult.transcript);
    }
  }, [handleEvaluateAttempt, recognitionResult, stage]);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-xl rounded-3xl border border-slate-200/90 bg-white p-6 md:p-8 text-slate-800 shadow-lg shadow-slate-900/5",
        className,
      )}
    >
      {/* Header do Shadowing */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <AlexAvatar className="h-10 w-10 ring-2 ring-amber-400/40" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Shadowing com Alex · {level}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mt-0.5">
              {stage === "listen" && "1. Ouvir e absorver a melodia da fala"}
              {stage === "shadow" && "2. Acompanhar e falar junto com Alex"}
              {stage === "try_alone" && "3. Falar com a sua voz natural"}
              {stage === "feedback" && "4. Conexão realizada na situação"}
            </h3>
          </div>
        </div>

        {/* Trilha do Método Oficial */}
        <div className="flex items-center gap-1">
          {(["listen", "shadow", "try_alone", "feedback"] as ShadowingStage[]).map((s, idx) => {
            const currentIdx = ["listen", "shadow", "try_alone", "feedback"].indexOf(stage);
            return (
              <div
                key={s}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  stage === s ? "w-6 bg-amber-400" : idx < currentIdx ? "w-2.5 bg-emerald-500" : "w-2 bg-slate-200",
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Régua explicativa da metodologia oficial: OUVIR → ACOMPANHAR → REPETIR JUNTO → TENTAR SOZINHO → USAR NA SITUAÇÃO */}
      <div className="mt-3 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400 px-1 border-b border-slate-50 pb-2">
        <span className={cn(stage === "listen" && "text-blue-700 font-bold")}>1. Ouvir</span>
        <span>→</span>
        <span className={cn(stage === "shadow" && "text-blue-700 font-bold")}>2. Repetir Junto</span>
        <span>→</span>
        <span className={cn(stage === "try_alone" && "text-blue-700 font-bold")}>3. Tentar Sozinho</span>
        <span>→</span>
        <span className={cn(stage === "feedback" && "text-emerald-700 font-bold")}>4. Usar na Vida Real</span>
      </div>

      {/* Cartão Central da Frase Alvo com Estilo Premium */}
      <div className="my-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white p-7 text-center space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300/90 block">
          Frase de Aprendizado
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          "{targetPhrase}"
        </h2>
        <p className="text-sm font-semibold text-slate-300 italic">
          "{translationPt}"
        </p>

        {/* Botão Ouvir Áudio do Alex */}
        <div className="pt-3">
          <button
            type="button"
            onClick={playAudio}
            disabled={isPlaying}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md",
              isPlaying
                ? "bg-amber-400 text-slate-950 scale-105"
                : "bg-white/20 hover:bg-white/30 text-white border border-white/25",
            )}
            title="Ouvir a pronúncia natural de Alex"
          >
            <Volume2 className={cn("h-4 w-4", isPlaying && "animate-pulse")} />
            <span>{isPlaying ? "Alex falando..." : "Ouvir Alex falar"}</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Dinâmico por Fase */}
      {stage === "listen" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-blue-50/70 p-4 text-xs font-medium text-blue-900 leading-relaxed">
            <span className="font-bold">Dica do Alex:</span> Feche os olhos por um segundo e apenas escute a entonação da palavra. Não se preocupe em ler letra por letra, apenas absorva o som geral.
          </div>
          <Button
            onClick={() => setStage("shadow")}
            className="w-full py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-md gap-2 transition-all"
          >
            Acompanhar e falar junto <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {stage === "shadow" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-amber-50/70 p-4 text-xs font-medium text-amber-900 leading-relaxed">
            <span className="font-bold">Agora é a sua vez:</span> Clique em ouvir e repita <strong>junto com a voz</strong>. Sinta o tempo que a frase leva.
            {repsCount >= suggestedReps && (
              <span className="block mt-1 text-emerald-700 font-bold">
                ✓ Você já repetiu {repsCount} vezes! Ótimo ritmo.
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={playAudio}
              className="flex-1 py-6 rounded-2xl border-slate-300 font-bold text-slate-700 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Repetir mais uma vez ({repsCount})
            </Button>
            <Button
              onClick={() => setStage("try_alone")}
              className="flex-1 py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black gap-2 shadow-md transition-all"
            >
              Tentar sozinho <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {stage === "try_alone" && (
        <div className="space-y-4">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500">
            Diga a frase com naturalidade
          </p>

          {inputMode === "voice" ? (
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={!speechSupported}
                className={cn(
                  "h-20 w-20 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95",
                  isListening
                    ? "bg-rose-600 animate-pulse"
                    : "bg-blue-600 hover:bg-blue-700",
                )}
              >
                <Mic className="h-8 w-8" />
              </button>
              <p className="text-xs font-semibold text-slate-600">
                {isListening ? "Ouvindo você falar..." : "Toque no microfone para falar"}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
                >
                  <Keyboard className="h-3.5 w-3.5" />
                  Prefiro digitar
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => handleEvaluateAttempt(targetPhrase)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Já falei em voz alta ✓
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder={`Digite: "${targetPhrase}"`}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && typedText.trim()) {
                      handleEvaluateAttempt(typedText.trim());
                    }
                  }}
                />
                <Button
                  onClick={() => handleEvaluateAttempt(typedText.trim())}
                  disabled={!typedText.trim()}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-5"
                >
                  Enviar
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline flex items-center gap-1"
              >
                <Mic className="h-3.5 w-3.5" />
                Voltar ao microfone
              </button>
            </div>
          )}
        </div>
      )}

      {stage === "feedback" && evaluation && (
        <div className="space-y-4">
          <div
            className={cn(
              "rounded-2xl p-4 text-sm flex items-start gap-3",
              evaluation.status === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : evaluation.status === "partial"
                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                  : "bg-blue-50 text-blue-900 border border-blue-200",
            )}
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <p className="font-bold">{evaluation.feedback}</p>
              {recognizedText && (
                <p className="text-xs opacity-75 mt-1">
                  Você produziu: "{recognizedText}"
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setStage("try_alone");
                setEvaluation(null);
                setRecognizedText(null);
              }}
              className="flex-1 py-6 rounded-2xl border-slate-300 font-bold text-slate-700 gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Tentar de novo
            </Button>
            <Button
              onClick={onComplete}
              className="flex-1 py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black gap-2 shadow-md transition-all"
            >
              Levar para a conversa <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
