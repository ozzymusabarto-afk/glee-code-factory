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
  HelpCircle,
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
  | "prepare"      // 1. Chegada e Primeiro Contato
  | "expose"       // 2. Observação
  | "shadow_1"     // 3. Shadowing: Hello!
  | "shadow_2"     // 3. Shadowing: My name is Alex.
  | "rehearse"     // 4. Prática Controlada (Comunicação Real)
  | "conversation" // 5. Conversa na Situação
  | "consolidate"; // 6. Consolidação e Conquistas

export function UnitOnePage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<UnitStage>("prepare");
  const [rehearseInput, setRehearseInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [rehearseValidation, setRehearseValidation] = useState<{
    valid: boolean;
    message: string;
    suggestedPhrase?: string;
  } | null>(null);
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

  const handleValidateRehearse = () => {
    const raw = rehearseInput.trim();
    if (!raw) {
      setRehearseValidation({
        valid: false,
        message: "Digite como você se apresentaria ao Alex.",
      });
      return;
    }

    // Normaliza texto: remove pontuação final
    const clean = raw.replace(/[.!,?]+$/, "").trim();
    const lower = clean.toLowerCase();

    // Aceita variações naturais: "My name is [nome]" ou "I'm [nome]" (incluindo "Im" e "I am")
    const myNameIsMatch = lower.match(/^my name is\s+(.+)$/i);
    const imMatch = lower.match(/^(i'm|im|i am)\s+(.+)$/i);

    if (myNameIsMatch && myNameIsMatch[1]?.trim()) {
      setRehearseValidation({
        valid: true,
        message: "Excelente! Você se apresentou de forma clara e natural.",
      });
      speak(clean);
      return;
    }

    if (imMatch && imMatch[2]?.trim()) {
      setRehearseValidation({
        valid: true,
        message: "Perfeito! Apresentação autêntica, direta e muito natural.",
      });
      speak(clean);
      return;
    }

    // Se o aluno escreveu apenas o nome (ex: "Adriana", "Carlos")
    const words = clean.split(/\s+/).filter(Boolean);
    const hasStructureKeywords =
      lower.includes("name") ||
      lower.includes("i'm") ||
      lower.includes("im") ||
      lower.includes("i am");

    if (!hasStructureKeywords && words.length <= 3) {
      setRehearseValidation({
        valid: false,
        message: "Você disse seu nome. Agora vamos colocar isso em uma frase completa.",
      });
      return;
    }

    // Se esqueceu o "is" (ex: "My name Adriana")
    if (lower.startsWith("my name") && !lower.includes("is")) {
      setRehearseValidation({
        valid: false,
        message: "Quase lá! No inglês acrescentamos 'is': 'My name is...'.",
      });
      return;
    }

    // Outros casos
    setRehearseValidation({
      valid: false,
      message: "Tente estruturar sua frase começando com 'My name is...' ou 'I'm...'.",
    });
  };

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

            {/* Fases da Jornada Unit 1 (Sem gamificação infantil) */}
            <div className="flex items-center gap-1 mt-1.5 overflow-x-auto max-w-full py-0.5 scrollbar-none text-[11px] font-bold">
              {[
                { id: "prepare", label: "1. Chegada" },
                { id: "expose", label: "2. Observação" },
                {
                  id: "shadow",
                  label: "3. Shadowing",
                  isActive: stage === "shadow_1" || stage === "shadow_2",
                },
                { id: "rehearse", label: "4. Prática" },
                { id: "conversation", label: "5. Conversa" },
                { id: "consolidate", label: "6. Conquista" },
              ].map((item, idx, arr) => {
                const active = item.isActive !== undefined ? item.isActive : stage === item.id;
                return (
                  <div key={item.id} className="flex items-center gap-1 shrink-0">
                    <span
                      className={cn(
                        "px-2 sm:px-2.5 py-0.5 rounded-full transition-all text-[10px] uppercase tracking-wider",
                        active
                          ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                          : "bg-white/10 text-slate-400"
                      )}
                    >
                      {item.label}
                    </span>
                    {idx < arr.length - 1 && (
                      <span className="text-slate-600 font-normal">→</span>
                    )}
                  </div>
                );
              })}
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
              <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/60 shadow-md bg-slate-950">
                <img
                  src="/assets/character/alex-avatar.jpg"
                  alt="Alex"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                  Etapa 2 · Observação
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

            {/* Ponte Narrativa para o Shadowing com Alex */}
            <div className="rounded-3xl bg-slate-900/80 backdrop-blur-md border border-amber-400/30 p-6 sm:p-7 space-y-4 text-center shadow-2xl">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Próximo Passo com Alex
                </span>
              </div>
              <div className="space-y-1.5 max-w-lg mx-auto">
                <p className="text-lg font-black text-white">
                  "Agora que você já reconhece algumas palavras, vamos ouvir como elas soam em uma conversa."
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Vamos treinar a melodia e a pronúncia das saudações no método de Shadowing, repetindo juntos no seu tempo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                <Button
                  onClick={() => setStage("shadow_1")}
                  className="py-6 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-400/20 gap-2 transition-all"
                >
                  <span>Praticar no Shadowing com Alex</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setHeardGreetings({});
                    speak("Hello!");
                  }}
                  className="rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-6 px-4 text-xs"
                >
                  <Volume2 className="h-4 w-4 mr-1.5 text-amber-400" />
                  <span>Ouvir saudações de novo</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 3. SHADOW 1 — Shadowing de "Hello!"                          */}
        {/* ------------------------------------------------------------ */}
        {stage === "shadow_1" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Shadowing · Frase 1 de 2: A Saudação
              </span>
              <button
                type="button"
                onClick={() => setStage("expose")}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Voltar à observação</span>
              </button>
            </div>
            <ShadowingExercise
              targetPhrase="Hello!"
              translationPt="Olá!"
              level="A0"
              variant="dark"
              suggestedReps={2}
              nextActionLabel="Próxima frase: Apresentar-se"
              onComplete={() => setStage("shadow_2")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 3. SHADOW 2 — Shadowing de "My name is Alex."                */}
        {/* ------------------------------------------------------------ */}
        {stage === "shadow_2" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Shadowing · Frase 2 de 2: Apresentação
              </span>
              <button
                type="button"
                onClick={() => setStage("shadow_1")}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Voltar à frase anterior</span>
              </button>
            </div>
            <ShadowingExercise
              targetPhrase="My name is Alex."
              translationPt="Meu nome é Alex."
              level="A0"
              variant="dark"
              suggestedReps={2}
              nextActionLabel="Avançar para Prática Controlada"
              onComplete={() => setStage("rehearse")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 4. REHEARSE — Prática Controlada e Escrita Comunicativa      */}
        {/* ------------------------------------------------------------ */}
        {stage === "rehearse" && (
          <div className="rounded-[32px] border border-white/15 bg-[#0B132B]/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 text-white animate-in fade-in duration-300">
            {/* Header com Alex se apresentando */}
            <div className="flex items-start sm:items-center gap-4 p-5 rounded-3xl bg-white/10 border border-white/15">
              <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/60 shadow-md bg-slate-950">
                <img
                  src="/assets/character/alex-avatar.jpg"
                  alt="Alex"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Alex se apresenta a você:
                  </span>
                  <button
                    type="button"
                    onClick={() => speak("My name is Alex. What's your name?")}
                    className="p-1.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-500 transition-colors shadow-xs"
                    title="Ouvir Alex se apresentar"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  "My name is Alex. What's your name?"
                </p>
                <p className="text-xs font-semibold text-slate-300">
                  (Meu nome é Alex. Qual é o seu nome?)
                </p>
              </div>
            </div>

            {/* Orientação Contextual Limpa (Sem revelar antecipadamente a frase) */}
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">
                Apresente-se ao Alex.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Escreva como você falaria.
              </p>
            </div>

            {/* Campo de Escrita — Começa vazio, sem atalhos que entregam a resposta */}
            <div className="rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="rehearse-input"
                  type="text"
                  value={rehearseInput}
                  onChange={(e) => {
                    setRehearseInput(e.target.value);
                    if (rehearseValidation) setRehearseValidation(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleValidateRehearse();
                  }}
                  placeholder="Escreva sua apresentação em inglês..."
                  className="flex-1 rounded-2xl border border-white/20 bg-slate-950/80 px-4 py-3.5 text-base font-bold text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none shadow-inner"
                />
                <Button
                  onClick={handleValidateRehearse}
                  className="py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shrink-0 shadow-md"
                >
                  Conferir frase
                </Button>
              </div>

              {/* Ajuda Progressiva: 1. DICA -> 2. EXEMPLO */}
              <div className="space-y-2 pt-1">
                {!showHint ? (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300/80 hover:text-amber-300 transition-colors"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Preciso de uma dica</span>
                  </button>
                ) : (
                  <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs text-amber-200 space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-black uppercase tracking-wider text-[10px] text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md">
                          Dica
                        </span>
                        <span className="font-semibold text-white">
                          Comece com: <strong className="text-amber-300">My name is...</strong>
                        </span>
                      </div>

                      {!showExample && (
                        <button
                          type="button"
                          onClick={() => setShowExample(true)}
                          className="text-[11px] font-bold text-amber-300 hover:text-white underline transition-colors shrink-0"
                        >
                          Ver exemplo
                        </button>
                      )}
                    </div>

                    {showExample && (
                      <div className="pt-2 border-t border-amber-400/20 text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 animate-in fade-in duration-200">
                        <span>
                          Exemplo: <strong className="text-white">"My name is Adriana."</strong>
                        </span>
                        <span className="text-[11px] text-amber-300/70 italic">
                          (Digite sua própria resposta no campo acima)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Feedback de Validação Claro, Acolhedor e Pedagógico */}
              {rehearseValidation && (
                <div
                  className={cn(
                    "rounded-2xl p-4 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border animate-in fade-in duration-200",
                    rehearseValidation.valid
                      ? "bg-emerald-950/80 text-emerald-200 border-emerald-500/40"
                      : "bg-amber-950/80 text-amber-200 border-amber-500/40"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-black">
                      <CheckCircle2
                        className={cn(
                          "h-5 w-5 shrink-0",
                          rehearseValidation.valid ? "text-emerald-400" : "text-amber-400"
                        )}
                      />
                      <span>{rehearseValidation.message}</span>
                    </div>
                  </div>

                  {rehearseValidation.valid && (
                    <button
                      type="button"
                      onClick={() => speak(rehearseInput.trim())}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-xs shrink-0 self-start sm:self-auto transition-transform active:scale-95"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>Ouvir minha frase</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Ação de Continuidade para a Conversa Real */}
            <div className="pt-2">
              <Button
                onClick={() => setStage("conversation")}
                disabled={!rehearseValidation?.valid}
                className={cn(
                  "w-full py-6 rounded-2xl font-black text-base gap-2 shadow-lg transition-all",
                  rehearseValidation?.valid
                    ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/20"
                    : "bg-white/10 text-slate-500 border border-white/10 cursor-not-allowed"
                )}
              >
                <span>Conversar com Alex no hotel</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              {!rehearseValidation?.valid && (
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Escreva e confira sua frase acima para desbloquear a conversa no saguão.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 5. CONVERSATION — Diálogo Autêntico no Saguão                 */}
        {/* ------------------------------------------------------------ */}
        {stage === "conversation" && (
          <div className="space-y-5 animate-in fade-in duration-300">
            {/* Header da Etapa / Navegação de retorno */}
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Etapa 5 de 6 · Conversa na Situação Real
              </span>
              <button
                type="button"
                onClick={() => setStage("rehearse")}
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Voltar à prática</span>
              </button>
            </div>

            {/* Ponte Narrativa Integrada ao Hotel */}
            <div className="rounded-3xl border border-white/15 bg-[#0B132B]/85 backdrop-blur-md p-5 sm:p-6 shadow-xl flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/60 bg-slate-950 shadow-md">
                <img
                  src="/assets/character/alex-avatar.jpg"
                  alt="Alex"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Alex na recepção do hotel
                  </span>
                </div>
                <p className="text-sm sm:text-base font-bold text-white">
                  "Você já ouviu, repetiu e praticou. Agora é a vez de usar essas palavras comigo aqui no hotel."
                </p>
                <p className="text-xs text-slate-300">
                  Uma conversa curta e real no saguão. Alex começa e você responde.
                </p>
              </div>
            </div>

            <ConversationChat
              scenarioTitle="Saguão do Hotel Internacional"
              scenarioContextPt="Alex está na recepção do hotel pronto para conversar com você."
              variant="dark"
              onComplete={() => setStage("consolidate")}
            />
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 6. CONSOLIDATE — Celebração, Conquistas e Progresso Salvo     */}
        {/* ------------------------------------------------------------ */}
        {stage === "consolidate" && (
          <div className="rounded-[32px] border border-white/15 bg-[#0B132B]/90 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 text-center text-white animate-in fade-in duration-300">
            {/* Alex na recepção comemorando com sobriedade */}
            <div className="mx-auto flex justify-center">
              <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 bg-slate-950 ring-4 ring-amber-400/15 relative">
                <img
                  src="/assets/character/alex-hero.jpg"
                  alt="Alex no Hotel"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-2 text-center">
                  <span className="text-xs font-black text-amber-400 block">Alex</span>
                  <span className="text-[10px] text-slate-300">Seu parceiro de jornada</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="inline-block rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30 px-4 py-1 text-xs font-black uppercase tracking-wider">
                Unit 1 Concluída · Home & Hotel
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Sua primeira conversa em inglês aconteceu aqui.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Você começou observando no saguão, treinou a pronúncia no Shadowing e manteve uma conversa real com Alex.
              </p>
            </div>

            {/* Cartão de Conquistas Reais */}
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-7 text-left space-y-4 max-w-lg mx-auto">
              <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">
                Suas 4 competências conquistadas nesta unidade:
              </h4>
              <ul className="space-y-3 text-sm font-semibold text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Reconhecer e usar saudações cotidianas (<em className="text-amber-300 font-bold">Hello!</em>, <em className="text-amber-300 font-bold">Hi!</em>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Dizer o seu próprio nome com naturalidade (<em className="text-amber-300 font-bold">My name is...</em> e <em className="text-amber-300 font-bold">I'm...</em>)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Compreender a pergunta <em className="text-amber-300 font-bold">"What's your name?"</em> no contexto real do hotel</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Retribuir a cortesia com <em className="text-amber-300 font-bold">"Nice to meet you, too!"</em></span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/10 text-xs text-emerald-400 font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Progresso sincronizado na sua jornada Polybot School!</span>
              </div>
            </div>

            {/* Ponte Narrativa para a Unit 2 */}
            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-5 text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-amber-400" />
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                  Próxima Parada · Unit 2
                </span>
              </div>
              <h4 className="text-base font-black text-white">
                CAFÉ · Ordering Coffee
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Na próxima parada, vamos pedir alguma coisa em um café. Você vai aprender a pedir um café ou bebida com confiança e naturalidade."
              </p>
            </div>

            {/* Ações Finais */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStage("prepare");
                  setRehearseInput("");
                  setShowHint(false);
                  setShowExample(false);
                  setRehearseValidation(null);
                }}
                className="flex-1 py-6 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 font-bold"
              >
                Rever com Alex
              </Button>
              <Button
                onClick={() => navigate({ to: "/" })}
                className="flex-1 py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-400/20 gap-2"
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
