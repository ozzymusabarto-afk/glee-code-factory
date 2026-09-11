import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  BookOpen,
  MessageSquare,
  Repeat,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlexCharacter } from "@/components/character/AlexCharacter";
import { ShadowingExercise } from "@/components/learning/ShadowingExercise";
import { ConversationChat } from "@/components/learning/ConversationChat";
import { WebSpeechAudioService } from "@/lib/scenario-engine/AudioService";
import { ScenarioProgressService } from "@/lib/scenario-engine/ScenarioProgressService";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/unit/1")({
  component: UnitOnePage,
  head: () => ({
    meta: [{ title: "Unit 1: Hello! — Polybot School" }],
  }),
});

type UnitStage =
  | "prepare"      // 1. Contextualização em português
  | "expose"       // 2. Exposição e reconhecimento
  | "shadow_1"     // 3. Shadowing: Hello!
  | "shadow_2"     // 3. Shadowing: My name is Alex
  | "rehearse"     // 4. Prática controlada
  | "conversation" // 5. Conversa real (chat) & Adjust
  | "expand"       // 6. Expansão (I'm vs My name is)
  | "consolidate"; // 7. Consolidação e progresso

export function UnitOnePage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<UnitStage>("prepare");
  const [studentName, setStudentName] = useState("");
  const [rehearseSelectedOrder, setRehearseSelectedOrder] = useState<string[]>([]);
  const [expandChoice, setExpandChoice] = useState<string | null>(null);
  const [progressSaved, setProgressSaved] = useState(false);

  const audioServiceRef = useRef<WebSpeechAudioService | null>(null);
  if (!audioServiceRef.current) audioServiceRef.current = new WebSpeechAudioService();

  const progressServiceRef = useRef<ScenarioProgressService | null>(null);
  if (!progressServiceRef.current) progressServiceRef.current = new ScenarioProgressService();

  // Inicia sessão no serviço de progresso
  useEffect(() => {
    progressServiceRef.current?.startSession("first-contact-meeting-someone", "step-1");
  }, []);

  // Quando chega na consolidação, salva o progresso final
  useEffect(() => {
    if (stage === "consolidate" && !progressSaved) {
      progressServiceRef.current?.updateProgress({
        scenarioId: "first-contact-meeting-someone",
        completedStepsCount: 10,
        totalStepsCount: 10,
        isCompleted: true,
        score: 1.0,
      });
      setProgressSaved(true);
    }
  }, [progressSaved, stage]);

  const speak = (text: string) => {
    audioServiceRef.current?.speak(text, {
      lang: "en-US",
      rate: 0.9,
    });
  };

  const STAGES_LIST: UnitStage[] = [
    "prepare",
    "expose",
    "shadow_1",
    "shadow_2",
    "rehearse",
    "conversation",
    "expand",
    "consolidate",
  ];

  const currentStageIndex = STAGES_LIST.indexOf(stage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Barra de Topo Editorial */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-30 px-6 py-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Jornada
          </Link>

          {/* Indicador de Unidade e Progresso da Lição */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              Unit 1 · Hello!
            </span>
            <div className="flex items-center gap-1 mt-1">
              {STAGES_LIST.map((s, idx) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentStageIndex
                      ? "w-5 bg-blue-600"
                      : idx < currentStageIndex
                        ? "w-2 bg-emerald-500"
                        : "w-2 bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>

          <span className="text-[11px] font-semibold text-slate-400">
            {currentStageIndex + 1} de {STAGES_LIST.length}
          </span>
        </div>
      </header>

      {/* Conteúdo Central da Etapa */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 md:p-8 flex flex-col justify-center">
        {/* ============================================================ */}
        {/* 1. PREPARE — Contextualização sem estresse em português       */}
        {/* ============================================================ */}
        {stage === "prepare" && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="mx-auto flex justify-center">
              <AlexCharacter pose="waving" size="md" />
            </div>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                Boas-vindas ao Polybot School
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Você não precisa saber inglês para começar.
              </h1>
              <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                Você acabou de entrar no saguão de um hotel internacional. Este é o <strong>Alex</strong>, e ele está vindo cumprimentar você.
              </p>
            </div>

            {/* Cartão de Apresentação da Palavra */}
            <div className="rounded-3xl border border-blue-200/80 bg-blue-50/60 p-6 max-w-md mx-auto space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Sua primeira palavra em inglês
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-black text-blue-950">Hello!</span>
                <button
                  type="button"
                  onClick={() => speak("Hello!")}
                  className="rounded-full bg-white p-3 text-blue-600 shadow-sm border border-blue-200 hover:bg-blue-100 transition-colors"
                  title="Ouvir pronúncia"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-600">
                Significa: <em>"Olá!"</em>
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => setStage("expose")}
                className="w-full max-w-md py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg gap-2 shadow-sm"
              >
                Começar a explorar <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. EXPOSE — Observação e Reconhecimento de Saudações        */}
        {/* ============================================================ */}
        {stage === "expose" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Fase 2: Observação
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Ouça e reconheça as saudações
              </h2>
              <p className="text-sm text-slate-500">
                Toque em cada cartão para ouvir a pronúncia natural com o Alex.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { en: "Hello!", pt: "Olá!", desc: "A saudação mais comum e versátil." },
                { en: "Hi!", pt: "Oi!", desc: "Mais casual e descontraída." },
                { en: "Thank you!", pt: "Obrigado(a)!", desc: "Para agradecer gentilmente." },
                { en: "Goodbye!", pt: "Tchau / Até logo!", desc: "Para se despedir." },
              ].map((item) => (
                <button
                  key={item.en}
                  type="button"
                  onClick={() => speak(item.en)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-500 hover:bg-blue-50/40 shadow-sm flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-black text-slate-900 group-hover:text-blue-700">
                      {item.en}
                    </span>
                    <div className="rounded-full bg-slate-100 group-hover:bg-blue-100 p-2 text-slate-500 group-hover:text-blue-600">
                      <Volume2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-700 block">{item.pt}</span>
                    <span className="text-xs text-slate-400">{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200/60 p-4 text-xs font-medium text-amber-900">
              💡 <strong>Percepção natural:</strong> Em inglês, <em>"Hello"</em> e <em>"Hi"</em> cumprem a mesma função de acolher alguém. Agora vamos treinar seu aparelho fonador para falar essas frases com clareza!
            </div>

            <Button
              onClick={() => setStage("shadow_1")}
              className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base gap-2 shadow-sm"
            >
              Ir para o Shadowing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. SHADOW 1 — Shadowing de "Hello!"                          */}
        {/* ============================================================ */}
        {stage === "shadow_1" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Metodologia Shadowing · Parte 1
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Construindo a ponte entre ouvir e falar
              </h2>
            </div>
            <ShadowingExercise
              targetPhrase="Hello!"
              translationPt="Olá!"
              level="A0"
              suggestedReps={2}
              onComplete={() => setStage("shadow_2")}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. SHADOW 2 — Shadowing de "My name is Alex."                */}
        {/* ============================================================ */}
        {stage === "shadow_2" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Metodologia Shadowing · Parte 2
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Dizendo seu nome com o ritmo certo
              </h2>
            </div>
            <ShadowingExercise
              targetPhrase="My name is Alex."
              translationPt="Meu nome é Alex."
              level="A0"
              suggestedReps={2}
              onComplete={() => setStage("rehearse")}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. REHEARSE — Prática controlada (montar e personalizar)     */}
        {/* ============================================================ */}
        {stage === "rehearse" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Fase 4: Prática Controlada
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Monte e personalize sua frase
              </h2>
              <p className="text-sm text-slate-500">
                Ordene as palavras para formar a estrutura correta:
              </p>
            </div>

            {/* Atividade 1: Ordenação de Blocos */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Toque nas palavras para montar: <em>"Meu nome é..."</em>
              </p>

              {/* Área onde as palavras selecionadas aparecem */}
              <div className="min-h-[56px] rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-3 flex flex-wrap items-center gap-2">
                {rehearseSelectedOrder.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toque nas palavras abaixo na ordem correta...</span>
                ) : (
                  rehearseSelectedOrder.map((w, i) => (
                    <span
                      key={`${w}-${i}`}
                      className="rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-sm"
                    >
                      {w}
                    </span>
                  ))
                )}
              </div>

              {/* Palavras para clicar */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["name", "My", "is"].map((word) => {
                  const isSelected = rehearseSelectedOrder.includes(word);
                  return (
                    <button
                      key={word}
                      type="button"
                      disabled={isSelected}
                      onClick={() => setRehearseSelectedOrder((prev) => [...prev, word])}
                      className={cn(
                        "rounded-xl border px-4 py-2.5 text-sm font-bold transition-all",
                        isSelected
                          ? "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed"
                          : "border-slate-300 bg-white text-slate-800 hover:border-blue-500 hover:bg-blue-50 shadow-sm",
                      )}
                    >
                      {word}
                    </button>
                  );
                })}

                {rehearseSelectedOrder.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setRehearseSelectedOrder([])}
                    className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Limpar ordem
                  </button>
                )}
              </div>

              {rehearseSelectedOrder.join(" ") === "My name is" && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  Perfeito! A estrutura é: My (Meu) + name (nome) + is (é).
                </div>
              )}
            </div>

            {/* Atividade 2: Inserir o Próprio Nome */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <label htmlFor="student-name" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Agora personalize: Qual é o seu nome?
              </label>
              <input
                id="student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Adriana, Carlos, etc."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 text-base font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
              />
              {studentName.trim() && (
                <div className="rounded-xl bg-blue-50 p-4 text-sm font-bold text-blue-900 flex items-center justify-between">
                  <span>Sua frase ficou: <strong>"My name is {studentName.trim()}."</strong></span>
                  <button
                    type="button"
                    onClick={() => speak(`My name is ${studentName.trim()}.`)}
                    className="p-1.5 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-100"
                    title="Ouvir sua frase"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <Button
              onClick={() => setStage("conversation")}
              className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base gap-2 shadow-sm"
            >
              Entrar na conversa real com Alex <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. CONVERSATION — Bate-papo autêntico com Alex & Adjust       */}
        {/* ============================================================ */}
        {stage === "conversation" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center space-y-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Fase 5: Situação Real
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Converse com o Alex no saguão
              </h2>
              <p className="text-xs text-slate-500">
                Use sua voz com o microfone ou digite sua resposta se preferir.
              </p>
            </div>

            <ConversationChat
              scenarioTitle="Saguão do Hotel"
              scenarioContextPt="Alex se aproximou para cumprimentar você."
              onComplete={() => setStage("expand")}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. EXPAND — Expansão: I'm vs My name is                      */}
        {/* ============================================================ */}
        {stage === "expand" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Fase 6: Expansão & Flexibilidade
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Outra forma muito natural de se apresentar
              </h2>
              <p className="text-sm text-slate-500">
                No dia a dia, falantes nativos adoram atalhos e abreviações.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Forma 1</span>
                  <h4 className="text-xl font-black text-slate-900">My name is...</h4>
                  <p className="text-xs text-slate-500">"Meu nome é..."</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">Forma 2 (Abreviada)</span>
                  <h4 className="text-xl font-black text-slate-900">I'm...</h4>
                  <p className="text-xs text-slate-500">"Eu sou..." (ou "Eu me chamo...")</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-xs font-medium text-slate-700 leading-relaxed space-y-2">
                <p>
                  <strong>💡 Pequena explicação:</strong> <em>"I'm"</em> é a junção de <em>"I am"</em> (Eu sou). As duas formas são 100% corretas e compreendidas no mundo todo!
                </p>
              </div>

              {/* Mini experimento interativo */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Experimente escolher como você responderia:
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    `My name is ${studentName || "Adriana"}.`,
                    `I'm ${studentName || "Adriana"}.`,
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => {
                        setExpandChoice(phrase);
                        speak(phrase);
                      }}
                      className={cn(
                        "rounded-2xl border p-4 text-left font-bold text-sm transition-all flex items-center justify-between",
                        expandChoice === phrase
                          ? "border-blue-600 bg-blue-50 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 text-slate-700",
                      )}
                    >
                      <span>"{phrase}"</span>
                      <Volume2 className="h-4 w-4 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStage("consolidate")}
              className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base gap-2 shadow-sm"
            >
              Concluir Unidade 1 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ============================================================ */}
        {/* 7. CONSOLIDATE — Celebração, Conquistas e Persistência        */}
        {/* ============================================================ */}
        {stage === "consolidate" && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="mx-auto flex justify-center">
              <AlexCharacter pose="celebrating" size="md" />
            </div>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
                🏆 Unidade 1 Concluída!
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Você começou sem saber inglês.
              </h1>
              <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                E agora já consegue participar de uma pequena conversa real com uma pessoa nativa!
              </p>
            </div>

            {/* Resumo das Competências Adquiridas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 text-left space-y-4 shadow-sm max-w-lg mx-auto">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Suas novas competências em inglês:
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Reconhecer e usar saudações cotidianas (<em>Hello!</em>, <em>Hi!</em>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Dizer o seu próprio nome (<em>My name is...</em> e <em>I'm...</em>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Entender a pergunta <em>"What's your name?"</em></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Retribuir a gentileza com <em>"Nice to meet you, too."</em></span>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 italic">
                ✓ Seu progresso foi salvo com sucesso na sua conta Polybot School.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStage("prepare");
                  setRehearseSelectedOrder([]);
                  setExpandChoice(null);
                }}
                className="flex-1 py-6 rounded-2xl border-slate-300 font-bold text-slate-700"
              >
                Revisar Unidade 1
              </Button>
              <Button
                onClick={() => navigate({ to: "/" })}
                className="flex-1 py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-sm gap-2"
              >
                Voltar à Jornada <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé Discreto */}
      <footer className="border-t border-slate-100 py-4 px-6 text-center text-xs text-slate-400">
        Polybot School · Método Natural de Aquisição de Linguagem
      </footer>
    </div>
  );
}
