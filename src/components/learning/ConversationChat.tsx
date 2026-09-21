import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, Mic, Send, HelpCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebSpeechAudioService } from "@/lib/scenario-engine/AudioService";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { AlexAvatar } from "@/components/character/AlexCharacter";
import { cn } from "@/lib/utils";

export interface ChatTurn {
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
    feedbackMessage: string;
    suggestedModel?: string | undefined;
  };
}

export interface ConversationChatProps {
  scenarioTitle?: string | undefined;
  scenarioContextPt?: string | undefined;
  turns?: ChatTurn[] | undefined;
  onComplete: () => void;
  className?: string | undefined;
  variant?: "light" | "dark" | undefined;
}

interface MessageItem {
  id: string;
  sender: "alex" | "user";
  text: string;
  audioText?: string | undefined;
  feedback?: {
    communicated: boolean;
    formAccurate: boolean;
    message: string;
    suggestedModel?: string | undefined;
  } | undefined;
}

const DEFAULT_UNIT_1_TURNS: ChatTurn[] = [
  {
    id: "turn-1",
    alexText: "Hi! Welcome to our hotel.",
    helpHintPt: "Responda à saudação do saguão com 'Hello!' ou 'Hi!'.",
    targetExpected: ["hello", "hi", "hey", "thank you", "thanks"],
    suggestedChips: ["Hello!", "Hi!"],
    validateResponse: (raw: string) => {
      const clean = raw.toLowerCase().trim().replace(/[^a-z]/g, "");
      const isGreeting =
        clean.includes("hello") ||
        clean.includes("hi") ||
        clean.includes("hey") ||
        clean.includes("thank");
      if (isGreeting) {
        return {
          communicated: true,
          formAccurate: true,
          feedbackMessage: "Ótima saudação! Simples, educada e calorosa.",
        };
      }
      return {
        communicated: false,
        formAccurate: false,
        feedbackMessage: "Alex deu as boas-vindas ao hotel. Responda com 'Hello!' ou 'Hi!'.",
        suggestedModel: "Hello!",
      };
    },
  },
  {
    id: "turn-2",
    alexText: "My name is Alex. What's your name?",
    helpHintPt: "Diga seu nome. Você pode dizer: 'My name is [seu nome]' ou 'I'm [seu nome]'.",
    targetExpected: ["my name is", "im", "i am", "my name"],
    suggestedChips: ["My name is...", "I'm..."],
    validateResponse: (raw: string) => {
      const lower = raw.toLowerCase().trim();
      const words = lower.replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);

      // Comunicação: aluno disse o próprio nome ou usou "my name" / "im"
      const hasMyNameIs = lower.includes("my name is") || lower.includes("i am") || lower.includes("im");
      const hasMyNameWithoutIs = lower.includes("my name") && !lower.includes("is");

      // Tenta extrair o nome falado
      let detectedName = "";
      if (hasMyNameIs) {
        const parts = lower.split(/my name is|i am|im/);
        detectedName = (parts[1] || "").trim();
      } else if (hasMyNameWithoutIs) {
        const parts = lower.split("my name");
        detectedName = (parts[1] || "").trim();
      } else if (words.length > 0) {
        detectedName = words[words.length - 1] || "";
      }

      if (hasMyNameIs) {
        return {
          communicated: true,
          formAccurate: true,
          studentName: detectedName,
          feedbackMessage: "Perfeito! Você disse seu nome com a estrutura gramatical exata.",
        };
      }

      if (hasMyNameWithoutIs) {
        // Exemplo: "My name Adriana" -> Comunicação OK, forma com pequeno ajuste
        return {
          communicated: true,
          formAccurate: false,
          studentName: detectedName,
          feedbackMessage: "Comunicação 100%! Entendi seu nome perfeitamente. Dica de forma: no inglês adicionamos 'is' → 'My name is...'.",
          suggestedModel: `My name is ${detectedName || "..."}`,
        };
      }

      if (words.length >= 1) {
        // Apenas falou o nome diretamente (ex: "Adriana")
        return {
          communicated: true,
          formAccurate: false,
          studentName: raw.trim(),
          feedbackMessage: "Entendido! Você comunicou seu nome. Para soar mais completo, tente usar a frase inteira: 'My name is...'.",
          suggestedModel: `My name is ${raw.trim()}`,
        };
      }

      return {
        communicated: false,
        formAccurate: false,
        feedbackMessage: "Não consegui identificar seu nome. Tente dizer: 'My name is [seu nome]'.",
        suggestedModel: "My name is...",
      };
    },
  },
  {
    id: "turn-3",
    alexText: "Nice to meet you!",
    helpHintPt: "Alex disse que foi um prazer conhecer você! Responda: 'Nice to meet you, too!'.",
    targetExpected: ["nice to meet you too", "nice to meet you", "nice to meet you to"],
    suggestedChips: ["Nice to meet you, too!", "Nice to meet you!"],
    validateResponse: (raw: string) => {
      const clean = raw.toLowerCase().trim().replace(/[^a-z\s]/g, "");
      const hasNiceToMeetYou = clean.includes("nice to meet you");
      const hasToo = clean.includes("too") || clean.includes("to");

      if (hasNiceToMeetYou && hasToo) {
        return {
          communicated: true,
          formAccurate: true,
          feedbackMessage: "Excelente cortesia! O 'too' no final expressa 'também'.",
        };
      }

      if (hasNiceToMeetYou) {
        return {
          communicated: true,
          formAccurate: true,
          feedbackMessage: "Muito bem! Você retribuiu a gentileza com naturalidade.",
        };
      }

      return {
        communicated: false,
        formAccurate: false,
        feedbackMessage: "Para retribuir, diga: 'Nice to meet you, too.' (Prazer em te conhecer também).",
        suggestedModel: "Nice to meet you, too.",
      };
    },
  },
];

export function ConversationChat({
  scenarioTitle = "Encontro com Alex",
  scenarioContextPt = "Você e Alex acabaram de se encontrar. Converse de forma descontraída e natural.",
  turns = DEFAULT_UNIT_1_TURNS,
  onComplete,
  className,
  variant = "dark",
}: ConversationChatProps) {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioServiceRef = useRef<WebSpeechAudioService | null>(null);
  if (!audioServiceRef.current) audioServiceRef.current = new WebSpeechAudioService();

  const {
    isListening,
    recognitionResult,
    startListening,
    stopListening,
    supported: speechSupported,
  } = useSpeechRecognition({ lang: "en-US" });

  const currentTurn = turns[currentTurnIndex];

  const speakAlex = useCallback((text: string) => {
    audioServiceRef.current?.speak(text, {
      lang: "en-US",
      rate: 0.92,
    });
  }, []);

  // Inicia a conversa com a fala do Alex no primeiro turno
  useEffect(() => {
    if (turns.length > 0 && messages.length === 0) {
      const first = turns[0];
      if (!first) return;
      setMessages([
        {
          id: `alex-0-${Date.now()}`,
          sender: "alex",
          text: first.alexText,
          audioText: first.alexAudioText || first.alexText,
        },
      ]);
      speakAlex(first.alexAudioText || first.alexText);
    }
  }, [messages.length, speakAlex, turns]);

  // Rola para a mensagem mais recente
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStudentResponse = useCallback(
    (response: string) => {
      const trimmed = response.trim();
      if (!trimmed || !currentTurn || isProcessing) return;

      setIsProcessing(true);
      setShowHelp(false);

      const evaluation = currentTurn.validateResponse(trimmed);

      // Adiciona mensagem do usuário com feedback discreto
      const userMsg: MessageItem = {
        id: `user-${currentTurnIndex}-${Date.now()}`,
        sender: "user",
        text: trimmed,
        feedback: {
          communicated: evaluation.communicated,
          formAccurate: evaluation.formAccurate,
          message: evaluation.feedbackMessage,
          suggestedModel: evaluation.suggestedModel,
        },
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");

      // Se a comunicação foi compreendida, avança para o próximo turno do Alex
      if (evaluation.communicated) {
        const nextIndex = currentTurnIndex + 1;
        if (nextIndex < turns.length) {
          const nextTurn = turns[nextIndex];
          if (!nextTurn) return;
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: `alex-${nextIndex}-${Date.now()}`,
                sender: "alex",
                text: nextTurn.alexText,
                audioText: nextTurn.alexAudioText || nextTurn.alexText,
              },
            ]);
            speakAlex(nextTurn.alexAudioText || nextTurn.alexText);
            setCurrentTurnIndex(nextIndex);
            setIsProcessing(false);
          }, 1100);
        } else {
          // Conversa concluída com sucesso!
          setTimeout(() => {
            setConversationComplete(true);
            setIsProcessing(false);
          }, 900);
        }
      } else {
        setIsProcessing(false);
      }
    },
    [currentTurn, currentTurnIndex, isProcessing, speakAlex, turns],
  );

  // Escuta reconhecimento de voz do microfone
  useEffect(() => {
    if (recognitionResult?.isFinal && recognitionResult.transcript) {
      handleStudentResponse(recognitionResult.transcript);
    }
  }, [handleStudentResponse, recognitionResult]);

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "mx-auto flex h-[580px] w-full max-w-xl flex-col rounded-3xl overflow-hidden transition-all",
        isDark
          ? "border border-white/15 bg-slate-900/90 backdrop-blur-md shadow-2xl text-white"
          : "border border-slate-200 bg-white shadow-sm text-slate-800",
        className,
      )}
    >
      {/* Header do Chat */}
      <div className={cn(
        "flex items-center justify-between border-b px-6 py-4",
        isDark ? "border-white/10 bg-slate-950/70" : "border-slate-100 bg-slate-50/70"
      )}>
        <div className="flex items-center gap-3">
          <AlexAvatar className="h-9 w-9 ring-2 ring-amber-400/40" />
          <div>
            <h3 className={cn("text-sm font-bold flex items-center gap-1.5", isDark ? "text-white" : "text-slate-800")}>
              Alex
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            </h3>
            <p className={cn("text-[11px] font-medium", isDark ? "text-slate-400" : "text-slate-500")}>
              {scenarioTitle} · Ao vivo no saguão
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHelp((prev) => !prev)}
          className={cn(
            "gap-1 rounded-xl text-xs font-semibold transition-colors",
            isDark
              ? "text-amber-400 hover:text-amber-300 hover:bg-white/10"
              : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
          )}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Dica do Alex</span>
        </Button>
      </div>

      {/* Caixa de Dica de Ajuda Expansível */}
      {showHelp && currentTurn && (
        <div className={cn(
          "border-b px-6 py-3 text-xs flex items-start justify-between",
          isDark
            ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
            : "border-blue-100 bg-blue-50/80 text-blue-900"
        )}>
          <div>
            <p className="font-bold">💡 Dica do Alex para responder:</p>
            <p className="mt-0.5">{currentTurn.helpHintPt}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className={cn("text-xs font-bold ml-3", isDark ? "text-amber-400 hover:text-amber-300" : "text-blue-700 hover:text-blue-900")}
          >
            Fechar
          </button>
        </div>
      )}

      {/* Área de Mensagens (Estilo Bate-Papo Autêntico) */}
      <div className={cn(
        "flex-1 overflow-y-auto p-6 space-y-4",
        isDark
          ? "bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950/70"
          : "bg-gradient-to-b from-slate-50/40 to-white"
      )}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex flex-col gap-1.5", msg.sender === "user" ? "items-end" : "items-start")}
          >
            <div className={cn("flex items-end gap-2 max-w-[85%]", msg.sender === "user" ? "flex-row-reverse" : "flex-row")}>
              {msg.sender === "alex" && <AlexAvatar className="h-7 w-7 ring-1 ring-amber-400/40" />}

              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md",
                  msg.sender === "alex"
                    ? isDark
                      ? "bg-white/10 text-white border border-white/15 rounded-bl-none backdrop-blur-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                    : "bg-amber-400 text-slate-950 rounded-br-none font-bold",
                )}
              >
                <p className="text-base">{msg.text}</p>

                {msg.sender === "alex" && (
                  <button
                    type="button"
                    onClick={() => speakAlex(msg.audioText || msg.text)}
                    className={cn(
                      "mt-1.5 flex items-center gap-1 text-[11px] font-bold transition-colors",
                      isDark ? "text-amber-300 hover:text-amber-200" : "text-blue-600 hover:text-blue-800"
                    )}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Ouvir de novo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Feedback Pedagógico Discreto (ADJUST: Comunicação vs Forma) */}
            {msg.feedback && (
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-3 py-2 text-xs",
                  isDark
                    ? msg.feedback.communicated
                      ? msg.feedback.formAccurate
                        ? "bg-emerald-950/80 text-emerald-200 border border-emerald-500/40"
                        : "bg-amber-950/80 text-amber-200 border border-amber-500/40"
                      : "bg-rose-950/80 text-rose-200 border border-rose-500/40"
                    : msg.feedback.communicated
                      ? msg.feedback.formAccurate
                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200/60"
                        : "bg-amber-50 text-amber-900 border border-amber-200/60"
                      : "bg-rose-50 text-rose-900 border border-rose-200/60",
                )}
              >
                <p className="font-semibold">{msg.feedback.message}</p>
                {msg.feedback.suggestedModel && !msg.feedback.formAccurate && (
                  <p className="mt-1 font-mono text-[11px] opacity-85">
                    Sugestão de forma: "{msg.feedback.suggestedModel}"
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className={cn("flex items-center gap-2 text-xs italic", isDark ? "text-slate-400" : "text-slate-400")}>
            <AlexAvatar className="h-6 w-6 opacity-60" />
            <span>Alex está ouvindo você...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barra de Rodapé / Entrada de Resposta */}
      {conversationComplete ? (
        <div className={cn(
          "border-t p-5 text-center space-y-3",
          isDark
            ? "border-emerald-500/30 bg-emerald-950/90 text-emerald-200"
            : "border-emerald-100 bg-emerald-50/80 text-emerald-800"
        )}>
          <div className="flex items-center justify-center gap-2 font-black text-base">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span>Microconversa concluída no saguão!</span>
          </div>
          <p className="text-xs opacity-90">
            Você acabou de cumprimentar, apresentar-se e retribuir a cortesia em inglês real!
          </p>
          <Button
            onClick={onComplete}
            className="w-full py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black gap-2 shadow-md transition-all text-base"
          >
            <span>Continuar para a consolidação</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className={cn("border-t p-4", isDark ? "border-white/10 bg-slate-950/80" : "border-slate-100 bg-white")}>
          {currentTurn?.suggestedChips && currentTurn.suggestedChips.length > 0 && !conversationComplete && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={cn("text-[11px] font-bold", isDark ? "text-slate-400" : "text-slate-500")}>
                Sugestões guiadas:
              </span>
              {currentTurn.suggestedChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    if (chip.includes("...")) {
                      setInputMode("text");
                      setInputText(chip.replace("...", " "));
                    } else {
                      handleStudentResponse(chip);
                    }
                  }}
                  className={cn(
                    "text-xs font-bold px-3 py-1.5 rounded-xl border transition-all active:scale-95 shadow-2xs",
                    isDark
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 hover:border-amber-400"
                      : "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100",
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {inputMode === "voice" ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={cn(
                  "text-xs font-semibold px-3 py-2 rounded-xl transition-colors",
                  isDark ? "text-slate-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                )}
              >
                Digitar texto
              </button>

              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={!speechSupported}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-black shadow-sm transition-all active:scale-[0.98]",
                  isListening
                    ? "bg-rose-500 animate-pulse text-white"
                    : "bg-amber-400 hover:bg-amber-500 text-slate-950",
                )}
              >
                <Mic className="h-4 w-4" />
                <span>{isListening ? "Ouvindo... toque para parar" : "Falar com Alex"}</span>
              </button>

              {currentTurn && (
                <button
                  type="button"
                  onClick={() => speakAlex(currentTurn.alexAudioText || currentTurn.alexText)}
                  className={cn(
                    "p-3 rounded-xl transition-colors",
                    isDark ? "text-slate-400 hover:text-amber-400 hover:bg-white/10" : "text-slate-400 hover:text-blue-600 hover:bg-slate-50"
                  )}
                  title="Ouvir fala de novo"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite sua resposta em inglês..."
                className={cn(
                  "flex-1 rounded-2xl border px-4 py-3 text-sm focus:outline-none",
                  isDark
                    ? "bg-slate-900/90 border-white/20 text-white placeholder-slate-400 focus:border-amber-400"
                    : "border-slate-300 focus:border-blue-500"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputText.trim()) {
                    handleStudentResponse(inputText);
                  }
                }}
              />
              <Button
                onClick={() => handleStudentResponse(inputText)}
                disabled={!inputText.trim()}
                className="rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-3"
              >
                <Send className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className={cn(
                  "p-3 rounded-xl transition-colors",
                  isDark ? "text-slate-400 hover:text-amber-400 hover:bg-white/10" : "text-slate-400 hover:text-blue-600 hover:bg-slate-50"
                )}
                title="Voltar ao microfone"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
