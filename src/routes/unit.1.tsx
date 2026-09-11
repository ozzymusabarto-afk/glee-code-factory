import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlexCharacter, AlexAvatar } from "@/components/character/AlexCharacter";
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
  | "prepare"      // 1. Contextualização no saguão do hotel
  | "expose"       // 2. Exposição e escuta de saudações
  | "shadow_1"     // 3. Shadowing: Hello!
  | "shadow_2"     // 3. Shadowing: My name is Alex
  | "rehearse"     // 4. Prática dialogada (What's your name?)
  | "conversation" // 5. Conversa real no saguão
  | "expand"       // 6. Expansão: I'm vs My name is
  | "consolidate"; // 7. Consolidação e conquistas

export function UnitOnePage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<UnitStage>("prepare");
  const [studentName, setStudentName] = useState("");
  const [rehearseSelectedOrder, setRehearseSelectedOrder] = useState<string[]>([]);
  const [expandChoice, setExpandChoice] = useState<string | null>(null);
  const [progressSaved, setProgressSaved] = useState(false);
  const [heardGreetings, setHeardGreetings] = useState<Record<string, boolean>>({});

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Camada de Cenário Real: Saguão do Hotel em profundidade suave */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] overflow-hidden">
        <img
          src="/assets/scenarios/hotel-lobby.jpg"
          alt=""
          className="w-full h-full object-cover object-center filter blur-xs"
        />
      </div>

      {/* ============================================================ */}
      {/* HEADER EDITORIAL COM NAVEGAÇÃO E PROGRESSO                   */}
      {/* ============================================================ */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 shadow-xs">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Mapa da Jornada</span>
          </Link>

          {/* Indicador Central da Unidade e Estágios */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Cenário 1 · Home & Hotel
              </span>
            </div>
            <span className="text-xs font-black text-slate-900 mt-0.5">
              Unit 1: Hello! (Conhecendo Alex no saguão)
            </span>

            {/* Cápsulas de Progresso */}
            <div className="flex items-center gap-1.5 mt-2">
              {STAGES_LIST.map((s, idx) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentStageIndex
                      ? "w-6 bg-amber-400"
                      : idx < currentStageIndex
                        ? "w-2.5 bg-emerald-500"
                        : "w-2 bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-500 block">
              Etapa {currentStageIndex + 1} de {STAGES_LIST.length}
            </span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* CONTEÚDO NARRATIVO DINÂMICO DA ETAPA                         */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center relative z-10">
        {/* ------------------------------------------------------------ */}
        {/* 1. PREPARE — A Recepção com Alex no Hotel                    */}
        {/* ------------------------------------------------------------ */}
        {stage === "prepare" && (
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-10 shadow-xl space-y-6 text-center animate-in fade-in duration-300">
            {/* Alex recepcionando na entrada do saguão */}
            <div className="mx-auto flex justify-center">
              <AlexCharacter pose="hero" size="hero" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block rounded-full bg-amber-400/20 text-amber-900 border border-amber-400/40 px-3.5 py-1 text-xs font-black uppercase tracking-wider">
                Bem-vindo ao Polybot School
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Você não precisa saber inglês para começar.
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Você acabou de entrar no saguão de um hotel internacional na Europa.
                Este é o <strong>Alex</strong>, e ele está vindo na sua direção com um sorriso acolhedor para cumprimentar você.
              </p>
            </div>

            {/* Cartão de Apresentação da Primeira Expressão */}
            <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 to-amber-50/30 p-6 max-w-md mx-auto space-y-3 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block">
                Alex cumprimenta você
              </span>

              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  "Hello!"
                </span>
                <button
                  type="button"
                  onClick={() => speak("Hello!")}
                  className="rounded-full bg-amber-400 hover:bg-amber-500 p-3 text-slate-950 shadow-md transition-all active:scale-95"
                  title="Ouvir a fala de Alex"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-700">
                Significa: <em>"Olá!"</em>
              </p>
            </div>

            <div className="pt-2 max-w-md mx-auto">
              <Button
                onClick={() => setStage("expose")}
                className="w-full py-7 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-400/25 gap-2 transition-all"
              >
                <span>Entrar no saguão com Alex</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 2. EXPOSE — Observação e Reconhecimento de Saudações         */}
        {/* ------------------------------------------------------------ */}
        {stage === "expose" && (
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-10 shadow-xl space-y-6 animate-in fade-in duration-300">
            {/* Header da Fase com Alex orientando */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
              <AlexAvatar className="h-12 w-12 ring-2 ring-amber-400/40 shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block">
                  Alex explica a situação
                </span>
                <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                  "No saguão, estas são as 4 frases mais naturais que você vai ouvir e usar.
                  Toque em cada uma para ouvir minha pronúncia e se familiarizar com o ritmo."
                </p>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Ouça e reconheça as saudações
              </h2>
              <p className="text-xs text-slate-500">
                Toque nos cartões abaixo para ouvir como um nativo pronuncia.
              </p>
            </div>

            {/* 4 Cartões de Saudação Estilizados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { en: "Hello!", pt: "Olá!", desc: "A saudação mais comum e versátil." },
                { en: "Hi!", pt: "Oi!", desc: "Mais casual e descontraída." },
                { en: "Thank you!", pt: "Obrigado(a)!", desc: "Para agradecer gentilmente ao recepcionista." },
                { en: "Goodbye!", pt: "Tchau / Até logo!", desc: "Para se despedir no saguão." },
              ].map((item) => {
                const isHeard = heardGreetings[item.en];
                return (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() => {
                      speak(item.en);
                      setHeardGreetings((prev) => ({ ...prev, [item.en]: true }));
                    }}
                    className={cn(
                      "rounded-3xl border p-5 text-left transition-all flex flex-col justify-between gap-3 group relative overflow-hidden",
                      isHeard
                        ? "border-emerald-300 bg-emerald-50/30 shadow-xs"
                        : "border-slate-200 bg-white hover:border-amber-400 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl font-black text-slate-900 group-hover:text-blue-700 tracking-tight">
                        {item.en}
                      </span>
                      <div className="rounded-full bg-amber-100 group-hover:bg-amber-400 p-2.5 text-slate-900 transition-colors shadow-2xs">
                        <Volume2 className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-800 block">{item.pt}</span>
                      <span className="text-xs text-slate-400 font-medium">{item.desc}</span>
                    </div>

                    {isHeard && (
                      <div className="absolute top-2 right-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 block" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200/70 p-4 text-xs font-semibold text-amber-950 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
              <span>
                <strong>Percepção natural:</strong> Em inglês, <em>"Hello"</em> e <em>"Hi"</em> abrem portas em qualquer lugar do mundo. Agora vamos praticar a sua pronúncia com a técnica oficial do Shadowing!
              </span>
            </div>

            <Button
              onClick={() => setStage("shadow_1")}
              className="w-full py-7 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base gap-2 shadow-lg shadow-amber-400/20 transition-all"
            >
              <span>Praticar o ritmo com Alex (Shadowing)</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 3. SHADOW 1 — Shadowing de "Hello!"                          */}
        {/* ------------------------------------------------------------ */}
        {stage === "shadow_1" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <ShadowingExercise
              targetPhrase="Hello!"
              translationPt="Olá!"
              level="A0"
              suggestedReps={2}
              onComplete={() => setStage("shadow_2")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 3. SHADOW 2 — Shadowing de "My name is Alex."                */}
        {/* ------------------------------------------------------------ */}
        {stage === "shadow_2" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <ShadowingExercise
              targetPhrase="My name is Alex."
              translationPt="Meu nome é Alex."
              level="A0"
              suggestedReps={2}
              onComplete={() => setStage("rehearse")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 4. REHEARSE — Prática Dialogada no Saguão                   */}
        {/* ------------------------------------------------------------ */}
        {stage === "rehearse" && (
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-10 shadow-xl space-y-6 animate-in fade-in duration-300">
            {/* Alex faz a pergunta no saguão */}
            <div className="flex items-start gap-4 p-4 rounded-3xl bg-blue-50/70 border border-blue-100">
              <AlexAvatar className="h-12 w-12 ring-2 ring-amber-400/40 shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">Alex pergunta:</span>
                  <button
                    type="button"
                    onClick={() => speak("What's your name?")}
                    className="p-1 rounded-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                    title="Ouvir pergunta de Alex"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xl font-black text-slate-900 tracking-tight">
                  "What's your name?"
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  (Qual é o seu nome?)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Construa sua resposta com Alex
              </h3>
              <p className="text-xs text-slate-500">
                Toque nas palavras para formar a estrutura <em>"Meu nome é..."</em>:
              </p>
            </div>

            {/* Atividade 1: Ordenação de Blocos */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 space-y-4">
              <div className="min-h-[56px] rounded-2xl border-2 border-dashed border-blue-200 bg-white p-3 flex flex-wrap items-center gap-2">
                {rehearseSelectedOrder.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toque nas palavras abaixo na ordem correta...</span>
                ) : (
                  rehearseSelectedOrder.map((w, i) => (
                    <span
                      key={`${w}-${i}`}
                      className="rounded-xl bg-blue-700 px-3.5 py-1.5 text-sm font-black text-white shadow-xs"
                    >
                      {w}
                    </span>
                  ))
                )}
              </div>

              {/* Blocos de Palavras */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["name", "My", "is"].map((word) => {
                  const isSelected = rehearseSelectedOrder.includes(word);
                  return (
                    <button
                      key={word}
                      type="button"
                      disabled={isSelected}
                      onClick={() => setRehearseSelectedOrder((prev) => [...prev, word])}
                      className={cn(
                        "rounded-xl border px-4 py-2 text-sm font-bold transition-all",
                        isSelected
                          ? "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed"
                          : "border-slate-300 bg-white text-slate-900 hover:border-amber-400 hover:bg-amber-50 shadow-2xs",
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
                    Limpar
                  </button>
                )}
              </div>

              {rehearseSelectedOrder.join(" ") === "My name is" && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Estrutura perfeita! <strong>My (Meu) + name (nome) + is (é)</strong>.</span>
                </div>
              )}
            </div>

            {/* Atividade 2: Inserir o Próprio Nome */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3">
              <label htmlFor="student-name-input" className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Agora personalize com o seu nome real:
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Maria, Carlos, Adriana..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3.5 text-base font-bold text-slate-900 focus:border-amber-400 focus:outline-none shadow-inner"
              />

              {studentName.trim() && (
                <div className="rounded-2xl bg-blue-50/80 border border-blue-100 p-4 text-sm font-bold text-blue-950 flex items-center justify-between">
                  <span>Sua apresentação: <strong>"My name is {studentName.trim()}."</strong></span>
                  <button
                    type="button"
                    onClick={() => speak(`My name is ${studentName.trim()}.`)}
                    className="p-2 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-500 transition-colors shadow-xs"
                    title="Ouvir sua frase com Alex"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <Button
              onClick={() => setStage("conversation")}
              className="w-full py-7 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base gap-2 shadow-lg shadow-amber-400/25 transition-all"
            >
              <span>Conversar com Alex no saguão</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 5. CONVERSATION — Diálogo Autêntico no Saguão                 */}
        {/* ------------------------------------------------------------ */}
        {stage === "conversation" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <ConversationChat
              scenarioTitle="Saguão do Hotel"
              scenarioContextPt="Alex acabou de se aproximar no saguão para conversar com você."
              onComplete={() => setStage("expand")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 6. EXPAND — Expansão: I'm vs My name is                      */}
        {/* ------------------------------------------------------------ */}
        {stage === "expand" && (
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-10 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex items-start gap-4 p-4 rounded-3xl bg-blue-50/70 border border-blue-100">
              <AlexAvatar className="h-12 w-12 ring-2 ring-amber-400/40 shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block">
                  Segredo do Alex
                </span>
                <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed mt-0.5">
                  "No dia a dia e em viagens, falantes nativos adoram atalhos rápidos.
                  Em vez de <em>'My name is'</em>, você vai ouvir muito <em>'I'm'</em>. As duas são perfeitas!"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-blue-200 bg-blue-50/40 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">Forma 1 (Completa)</span>
                <h4 className="text-2xl font-black text-slate-900">My name is...</h4>
                <p className="text-xs text-slate-500 font-medium">"Meu nome é..."</p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-5 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">Forma 2 (Natural e Direta)</span>
                <h4 className="text-2xl font-black text-slate-900">I'm...</h4>
                <p className="text-xs text-slate-500 font-medium">"Eu sou..." (ou "Eu me chamo...")</p>
              </div>
            </div>

            {/* Teste auditivo comparativo */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Experimente ouvir as duas formas com seu nome:
              </span>
              <div className="flex flex-col gap-2.5">
                {[
                  `My name is ${studentName || "Maria"}.`,
                  `I'm ${studentName || "Maria"}.`,
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
                        ? "border-amber-400 bg-amber-50/60 text-slate-950 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 text-slate-800",
                    )}
                  >
                    <span>"{phrase}"</span>
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-slate-700 shadow-xs">
                      <Volume2 className="h-4 w-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStage("consolidate")}
              className="w-full py-7 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base gap-2 shadow-lg shadow-amber-400/25 transition-all"
            >
              <span>Concluir Unidade 1</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 7. CONSOLIDATE — Celebração, Conquistas e Progresso Salvo     */}
        {/* ------------------------------------------------------------ */}
        {stage === "consolidate" && (
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-6 md:p-10 shadow-2xl space-y-6 text-center animate-in fade-in duration-300">
            {/* Alex comemorando */}
            <div className="mx-auto flex justify-center">
              <AlexCharacter pose="celebrating" size="lg" />
            </div>

            <div className="space-y-2">
              <span className="inline-block rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-1 text-xs font-black uppercase tracking-wider">
                🏆 Unidade 1 Concluída com Sucesso!
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
                Você começou sem saber inglês.
              </h1>
              <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                E agora já consegue cumprimentar, se apresentar e manter um diálogo real no saguão de um hotel!
              </p>
            </div>

            {/* Cartão de Conquistas da Unidade */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 md:p-8 text-left space-y-4 max-w-lg mx-auto">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Suas 4 novas competências conquistadas:
              </h4>
              <ul className="space-y-3 text-sm font-bold text-slate-800">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Reconhecer e usar saudações cotidianas (<em>Hello!</em>, <em>Hi!</em>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Dizer o seu próprio nome com naturalidade (<em>My name is...</em> e <em>I'm...</em>)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Compreender a pergunta <em>"What's your name?"</em> no saguão</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Retribuir a cortesia com <em>"Nice to meet you, too."</em></span>
                </li>
              </ul>

              <div className="pt-3 border-t border-slate-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Progresso sincronizado e salvo na sua conta Polybot School!</span>
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
                className="flex-1 py-6 rounded-full border-slate-300 font-bold text-slate-700"
              >
                Revisar Unidade 1
              </Button>
              <Button
                onClick={() => navigate({ to: "/" })}
                className="flex-1 py-6 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-400/25 gap-2"
              >
                <span>Voltar ao Mapa da Jornada</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé Oficial da Unidade */}
      <footer className="border-t border-slate-200/60 bg-white/80 py-4 px-6 text-center text-xs text-slate-400 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <Plane className="h-3.5 w-3.5 text-blue-600" />
          <span>Polybot School · Método Natural de Aquisição de Linguagem · Situações da Vida Real</span>
        </div>
      </footer>
    </div>
  );
}
