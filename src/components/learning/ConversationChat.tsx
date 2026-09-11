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
    alexText: "Hello!",
    helpHintPt: "Responda à saudação com 'Hello!' ou 'Hi!'.",
    targetExpected: ["hello", "hi", "hey"],
    validateResponse: (raw: string) => {
      const clean = raw.toLowerCase().trim().replace(/[^a-z]/g, "");
      const isGreeting = clean.includes("hello") || clean.includes("hi") || clean.includes("hey");
      if (isGreeting) {
        return {
          communicated: true,
          formAccurate: true,
          feedbackMessage: "Ótima saudação! Simples, educada e natural.",
        };
      }
      return {
        communicated: false,
        formAccurate: false,
        feedbackMessage: "Alex disse uma saudação. Tente responder com 'Hello!' ou 'Hi!'.",
        suggestedModel: "Hello!",
      };
    },
  },
  {
    id: "turn-2",
    alexText: "What's your name?",
    helpHintPt: "Diga seu nome. Você pode dizer: 'My name is [seu nome]' ou 'I'm [seu nome]'.",
    targetExpected: ["my name is", "im", "i am", "my name"],
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
    helpHintPt: "Alex disse que foi um prazer conhecer você! Responda: 'Nice to meet you, too.'",
    targetExpected: ["nice to meet you too", "nice to meet you", "nice to meet you to"],
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

  return (
    <div
      className={cn(
        "mx-auto flex h-[580px] w-full max-w-xl flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden",
        className,
      )}
    >
      {/* Header do Chat */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
        <div className="flex items-center gap-3">
          <AlexAvatar className="h-9 w-9" />
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              Alex
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            </h3>
            <p className="text-[11px] font-medium text-slate-500">{scenarioTitle}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHelp((prev) => !prev)}
          className="gap-1 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <HelpCircle className="h-4 w-4" />
          Ajuda
        </Button>
      </div>

      {/* Caixa de Dica de Ajuda Expansível */}
      {showHelp && currentTurn && (
        <div className="border-b border-blue-100 bg-blue-50/80 px-6 py-3 text-xs text-blue-900 flex items-start justify-between">
          <div>
            <p className="font-bold">💡 Dica do Alex para responder:</p>
            <p className="mt-0.5">{currentTurn.helpHintPt}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 ml-3"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Área de Mensagens (Estilo Bate-Papo Autêntico) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/40 to-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex flex-col gap-1.5", msg.sender === "user" ? "items-end" : "items-start")}
          >
            <div className={cn("flex items-end gap-2 max-w-[85%]", msg.sender === "user" ? "flex-row-reverse" : "flex-row")}>
              {msg.sender === "alex" && <AlexAvatar className="h-7 w-7" />}

              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  msg.sender === "alex"
                    ? "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                    : "bg-blue-600 text-white rounded-br-none",
                )}
              >
                <p className="font-medium text-base">{msg.text}</p>

                {msg.sender === "alex" && (
                  <button
                    type="button"
                    onClick={() => speakAlex(msg.audioText || msg.text)}
                    className="mt-1 flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    Ouvir de novo
                  </button>
                )}
              </div>
            </div>

            {/* Feedback Pedagógico Discreto (ADJUST: Comunicação vs Forma) */}
            {msg.feedback && (
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-3 py-2 text-xs",
                  msg.feedback.communicated
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
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <AlexAvatar className="h-6 w-6 opacity-60" />
            <span>Alex está ouvindo...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barra de Rodapé / Entrada de Resposta */}
      {conversationComplete ? (
        <div className="border-t border-emerald-100 bg-emerald-50/80 p-5 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-base">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            Parabéns! Microconversa concluída com sucesso.
          </div>
          <p className="text-xs text-emerald-700">
            Você acabou de cumprimentar, apresentar-se e retribuir a cortesia em inglês real!
          </p>
          <Button
            onClick={onComplete}
            className="w-full py-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-sm"
          >
            Continuar para a próxima etapa <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-t border-slate-100 bg-white p-4">
          {inputMode === "voice" ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Digitar texto
              </button>

              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={!speechSupported}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98]",
                  isListening ? "bg-rose-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700",
                )}
              >
                <Mic className="h-4 w-4" />
                {isListening ? "Ouvindo... toque para parar" : "Falar no microfone"}
              </button>

              {currentTurn && (
                <button
                  type="button"
                  onClick={() => speakAlex(currentTurn.alexAudioText || currentTurn.alexText)}
                  className="p-3 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl"
                  title="Ouvir pergunta de novo"
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
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputText.trim()) {
                    handleStudentResponse(inputText);
                  }
                }}
              />
              <Button
                onClick={() => handleStudentResponse(inputText)}
                disabled={!inputText.trim()}
                className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3"
              >
                <Send className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl"
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
