import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plane,
  MapPin,
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
    <div className="min-h-screen bg-[#0B132B] text-white font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Camada de Cenário Real: Saguão do Hotel em profundidade suave com gradiente dark navy */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/scenarios/hotel-lobby.jpg"
          alt=""
          className="w-full h-full object-cover object-center filter blur-[1px] opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/85 via-[#0F172A]/90 to-[#0B132B]/95" />
      </div>

      {/* Efeitos sutis de iluminação ambiente */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-12 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================ */}
      {/* HEADER EDITORIAL CONTÍNUO (AZUL-MARINHO & OURO)              */}
      {/* ============================================================ */}
      <header className="border-b border-white/10 bg-[#0B132B]/85 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Voltar ao Mapa</span>
            <span className="sm:hidden">Voltar</span>
          </Link>

          {/* Indicador Central da Situação & Estágio Atual */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                HOME & HOTEL
              </span>
              <span className="text-xs font-bold text-slate-300 hidden md:inline">
                · Situação 1
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-white mt-0.5">
              Saguão do Hotel Internacional
            </span>

            {/* Fases da Entrada Controlada (Sem gamificação infantil) */}
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-bold">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full transition-all text-[10px] uppercase tracking-wider",
                  stage === "prepare"
                    ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                    : "bg-white/10 text-slate-300"
                )}
              >
                1. Primeiro Contato
              </span>
              <span className="text-slate-500 font-normal">→</span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full transition-all text-[10px] uppercase tracking-wider",
                  stage === "expose"
                    ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                    : "bg-white/10 text-slate-400"
                )}
              >
                2. Observação
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Nível Inicial A0</span>
              <span className="sm:hidden">A0</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* CONTEÚDO NARRATIVO DINÂMICO DA ETAPA                         */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center relative z-10">
        {/* ------------------------------------------------------------ */}
        {/* 1. ENTRADA NO HOTEL & PRIMEIRO CONTATO COM ALEX              */}
        {/* ------------------------------------------------------------ */}
        {stage === "prepare" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-in fade-in duration-300">
            {/* Alex presente em destaque na cena com modelo visual oficial */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-84 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 bg-slate-950 ring-4 ring-amber-400/15 relative group">
                <img
                  src="/assets/character/alex-hero.jpg"
                  alt="Alex no Saguão do Hotel"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 text-center">
                  <span className="text-xs font-black text-amber-400 block">Alex</span>
                  <span className="text-[10px] text-slate-300">Recepção do Hotel</span>
                </div>
              </div>
            </div>

            {/* Primeiro Contato: Fala do Alex, Balão Real e Pequena Vitória */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-amber-300 font-bold">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                <span>Você acabou de entrar no saguão do hotel</span>
              </div>

              {/* Balão de Fala do Alex */}
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-7 text-white shadow-2xl space-y-4">
                {/* Rabicho apontando para o Alex em telas médias/grandes */}
                <div className="hidden lg:block absolute -left-2.5 top-12 w-0 h-0 border-t-8 border-t-transparent border-r-[11px] border-r-white/20 border-b-8 border-b-transparent" />

                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                      Alex cumprimenta você
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                      "Hello!"
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => speak("Hello!")}
                    className="flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm px-4 py-3 shadow-md transition-all active:scale-95 shrink-0"
                    title="Ouvir Alex falar Hello!"
                  >
                    <Volume2 className="h-5 w-5" />
                    <span>Ouvir</span>
                  </button>
                </div>

                {/* Significado direto e acolhimento */}
                <div className="space-y-1.5">
                  <p className="text-lg font-bold text-amber-300">
                    Significa: <span className="text-white underline decoration-amber-400 decoration-2">"Olá!"</span>
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Você acabou de ouvir e entender sua primeira palavra em inglês dentro de uma situação real.
                    Sem regras complicadas, sem nenhuma pressão.
                  </p>
                </div>
              </div>

              {/* Ação de Continuidade da Jornada */}
              <Button
                onClick={() => setStage("expose")}
                className="w-full py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-400/20 gap-2 transition-all hover:gap-3"
              >
                <span>Conhecer as palavras da recepção</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 2. EXPOSE — FASE 2 · OBSERVAÇÃO (OUVIR E PERCEBER)           */}
        {/* ------------------------------------------------------------ */}
        {stage === "expose" && (
          <div className="max-w-3xl w-full mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Header da Fase com Alex orientando */}
            <div className="flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xl">
              <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/60 shadow-md">
                <img
                  src="/assets/character/alex-avatar.jpg"
                  alt="Alex"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  Fase 2 · Observação
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                  "Agora vamos ouvir e perceber antes de falar."
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No saguão do hotel, estas são 4 palavras que você provavelmente vai ouvir nesta situação.
                  Toque em cada uma para escutar o som e se acostumar com o ritmo.
                </p>
              </div>
            </div>

            {/* Grid das 4 Palavras Limpas e Elegantes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { en: "Hello!", pt: "Olá!", context: "A saudação mais comum ao chegar." },
                { en: "Hi!", pt: "Oi!", context: "Mais rápida, amigável e descontraída." },
                { en: "Thank you!", pt: "Obrigado(a)!", context: "Para agradecer pela chave ou ajuda." },
                { en: "Goodbye!", pt: "Tchau / Até logo!", context: "Para se despedir ao sair do saguão." },
              ].map((item) => {
                const isHeard = heardGreetings[item.en];
                return (
                  <div
                    key={item.en}
                    onClick={() => {
                      speak(item.en);
                      setHeardGreetings((prev) => ({ ...prev, [item.en]: true }));
                    }}
                    className={cn(
                      "cursor-pointer rounded-3xl p-5 sm:p-6 transition-all border flex flex-col justify-between gap-4 group relative overflow-hidden select-none",
                      isHeard
                        ? "bg-white/15 border-amber-400/70 shadow-lg ring-2 ring-amber-400/20"
                        : "bg-white/10 hover:bg-white/15 border-white/15 hover:border-amber-400/50 shadow-md",
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-3xl font-black text-white group-hover:text-amber-300 tracking-tight transition-colors">
                        {item.en}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(item.en);
                          setHeardGreetings((prev) => ({ ...prev, [item.en]: true }));
                        }}
                        className="rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 p-3 shadow-md transition-transform active:scale-95 group-hover:scale-105"
                        title={`Ouvir ${item.en}`}
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div>
                      <span className="text-base font-bold text-amber-300 block">
                        {item.pt}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {item.context}
                      </span>
                    </div>

                    {isHeard ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 pt-2 border-t border-white/10">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Ouvido com atenção</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 pt-2 border-t border-white/10">
                        <span>Toque para escutar</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bloco de Conclusão da Observação & Pausa Controlada para Avaliação Visual */}
            <div className="rounded-3xl bg-slate-900/80 backdrop-blur-md border border-white/15 p-6 sm:p-7 space-y-4 text-center">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  Etapa de Observação Concluída
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  Você percebeu e reconheceu as 4 saudações essenciais do saguão do hotel.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                <Button
                  variant="outline"
                  onClick={() => {
                    setHeardGreetings({});
                    speak("Hello!");
                  }}
                  className="rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold py-6 px-6"
                >
                  <Volume2 className="h-4 w-4 mr-2 text-amber-400" />
                  <span>Ouvir de novo</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStage("prepare")}
                  className="rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-6 px-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span>Rever primeiro contato</span>
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Fase 2 pausada aqui para sua avaliação visual antes de avançarmos para as próximas etapas (Shadowing).
              </p>
            </div>
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
      <footer className="border-t border-white/10 bg-[#0B132B]/80 py-4 px-6 text-center text-xs text-slate-400 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <Plane className="h-3.5 w-3.5 text-amber-400" />
          <span>Polybot School · Home & Hotel · Saguão do Hotel</span>
        </div>
      </footer>
    </div>
  );
}
