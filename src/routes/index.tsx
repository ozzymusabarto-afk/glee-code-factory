import { useState, useRef } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Volume2,
  Settings,
  Plane,
  Sparkles,
  MapPin,
  Headphones,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebSpeechAudioService } from "@/lib/scenario-engine/AudioService";
import { ScenarioCard, ScenarioCardProps } from "@/components/scenario/ScenarioCard";
import { useAppStore } from "@/hooks/use-app-store";

export const Route = createFileRoute("/")({
  component: PolybotSchoolHome,
  head: () => ({
    title: "Polybot School — Your journey into English starts here",
    meta: [
      {
        name: "description",
        content: "Curso completo de inglês em situações cotidianas reais com Alex. Você não precisa saber inglês para começar.",
      },
    ],
  }),
});

interface ScenarioDefinition extends Omit<ScenarioCardProps, "onClick"> {
  targetRoute?: string | undefined;
}

const SCENARIOS_LIST: ScenarioDefinition[] = [
  {
    number: 1,
    id: "unit-1",
    title: "HOME & HOTEL",
    situationPt: "Unit 1: Hello! — Conhecendo Alex no saguão.",
    imageSrc: "/assets/scenarios/scenario-1-hotel.jpg",
    levelBadge: "Iniciante · A0",
    status: "active",
    targetRoute: "/unit/1",
  },
  {
    number: 2,
    id: "unit-2",
    title: "CAFÉ",
    situationPt: "Unit 2: Ordering Coffee — Pedindo um café e algo para comer.",
    imageSrc: "/assets/scenarios/scenario-2-cafe.jpg",
    levelBadge: "Iniciante · A1",
    status: "locked",
  },
  {
    number: 3,
    id: "unit-3",
    title: "CIDADE",
    situationPt: "Unit 3: Lost in Town — Perguntando direções nas ruas.",
    imageSrc: "/assets/scenarios/scenario-3-cidade.jpg",
    levelBadge: "Iniciante · A1",
    status: "locked",
  },
  {
    number: 4,
    id: "unit-4",
    title: "TRANSPORTE",
    situationPt: "Unit 4: Taxi & Metro — Pegando transporte com segurança.",
    imageSrc: "/assets/scenarios/scenario-4-transporte.jpg",
    levelBadge: "Intermediário · A2",
    status: "locked",
  },
  {
    number: 5,
    id: "unit-5",
    title: "VIAGEM",
    situationPt: "Unit 5: Airport Gate — Passando pela imigração e portão.",
    imageSrc: "/assets/scenarios/scenario-5-viagem.jpg",
    levelBadge: "Intermediário · A2",
    status: "locked",
    targetRoute: "/missions/airport",
  },
  {
    number: 6,
    id: "unit-6",
    title: "HOTEL",
    situationPt: "Unit 6: Check-in & Estadia — Resolvendo detalhes do quarto.",
    imageSrc: "/assets/scenarios/scenario-6-room.jpg",
    levelBadge: "Fluência Cotidiana",
    status: "locked",
  },
  {
    number: 7,
    id: "unit-7",
    title: "MUNDO",
    situationPt: "Unit 7: Conexões Globais — Conversas livres do dia a dia.",
    imageSrc: "/assets/scenarios/scenario-7-mundo.jpg",
    levelBadge: "Fluência Cotidiana",
    status: "locked",
  },
];

function PolybotSchoolHome() {
  const navigate = useNavigate();
  const displayName = useAppStore((state) => state.displayName);
  const audioServiceRef = useRef<WebSpeechAudioService | null>(null);
  const [isPlayingGreeting, setIsPlayingGreeting] = useState(false);

  if (!audioServiceRef.current) {
    audioServiceRef.current = new WebSpeechAudioService();
  }

  const handlePlayAlexGreeting = () => {
    if (!audioServiceRef.current) return;
    setIsPlayingGreeting(true);
    audioServiceRef.current.speak(
      "Hi! I'm Alex. Nice to meet you! Let's start with a very simple conversation.",
      {
        rate: 0.95,
        pitch: 0.95,
      },
    );
    setTimeout(() => setIsPlayingGreeting(false), 4500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">
      {/* ============================================================ */}
      {/* 1. HEADER SERENO E ELEGANTE (SEM GAMIFICAÇÃO INFANTIL)      */}
      {/* ============================================================ */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* Logo Polybot School Oficial */}
          <Link to="/" className="flex items-center gap-3 select-none group">
            <div className="h-10 w-10 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6l-4 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Polybot
                </span>
                <span className="text-xl font-black tracking-tight text-amber-500">
                  School
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block -mt-1">
                Inglês para a vida real
              </span>
            </div>
          </Link>

          {/* Painel do Aluno: Ponto Atual e Perfil Limpo */}
          <div className="hidden sm:flex items-center gap-6">
            {/* Indicador do Ponto Atual */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/60">
              <MapPin className="h-3.5 w-3.5 text-amber-600" />
              <span>Ponto de partida: Saguão do Hotel</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">Nível Inicial A0</span>
            </div>

            {/* Perfil do Estudante */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 text-left hover:opacity-90 transition-opacity"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-700 to-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {(displayName || "M").charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  {displayName ? `Olá, ${displayName}` : "Olá, Estudante"}
                </span>
                <span className="text-[10px] font-medium text-slate-400 block">
                  Meu perfil
                </span>
              </div>
              <Settings className="h-4 w-4 text-slate-400 hover:text-slate-700 ml-1" />
            </Link>
          </div>

          {/* Acesso rápido mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/profile"
              className="p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. O ENCONTRO COM ALEX NO SAGUÃO DO HOTEL (HERO CONTÍNUO)   */}
      {/* ============================================================ */}
      <main className="mx-auto max-w-7xl w-full p-4 md:p-8 space-y-12">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#16203D] text-white p-6 sm:p-10 md:p-12 shadow-2xl border border-slate-800">
          {/* Efeitos suaves de luz ambiente */}
          <div className="absolute -top-28 -left-28 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-12 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Lado Esquerdo: Alex Esperando o Aluno e o Convite Pessoal */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-left">
              {/* Modelo Visual Oficial do Alex em Meio-Corpo */}
              <div className="shrink-0 relative group">
                <div className="w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-slate-900 ring-4 ring-amber-400/10 transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src="/assets/character/alex-hero.jpg"
                    alt="Alex — Companheiro Oficial do Polybot School"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-2.5 text-center">
                    <span className="text-xs font-black text-amber-400 block">Alex</span>
                    <span className="text-[10px] text-slate-300">Seu companheiro de jornada</span>
                  </div>
                </div>
              </div>

              {/* O Convite Direto do Alex em formato de balão real */}
              <div className="flex-1 w-full relative">
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 text-white shadow-lg space-y-2">
                  {/* Rabicho do balão apontando para o Alex */}
                  <div className="hidden sm:block absolute -left-2.5 top-8 w-0 h-0 border-t-8 border-t-transparent border-r-[11px] border-r-white/20 border-b-8 border-b-transparent" />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      "Hi! I'm Alex."
                    </span>
                    <button
                      type="button"
                      onClick={handlePlayAlexGreeting}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 px-3 py-1.5 rounded-full border border-amber-400/30 transition-all shrink-0"
                      title="Ouvir a voz de Alex"
                    >
                      <Volume2 className={`h-4 w-4 ${isPlayingGreeting ? "animate-pulse text-amber-400" : ""}`} />
                      <span>{isPlayingGreeting ? "Ouvindo..." : "Ouvir Alex"}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                    Que bom que você chegou. Vamos começar com uma conversa bem simples?
                  </p>
                </div>
              </div>
            </div>

            {/* Lado Direito: A Situação Atual (Home & Hotel) Naturalmente Conectada */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white text-slate-900 shadow-2xl p-6 sm:p-7 border border-slate-100 flex flex-col justify-between gap-5">
                {/* Imagem do Saguão do Hotel */}
                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner group">
                  <img
                    src="/assets/scenarios/hotel-lobby.jpg"
                    alt="Saguão do Hotel Internacional"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold drop-shadow-sm">Saguão do Hotel</span>
                  </div>
                </div>

                {/* Título e Subtítulo Essenciais (Sem excesso de texto) */}
                <div className="space-y-0.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block">
                    Primeira Situação
                  </span>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tight">
                    HOME & HOTEL
                  </h3>
                  <p className="text-sm font-medium text-slate-600">
                    Seu primeiro encontro em inglês.
                  </p>
                </div>

                {/* Ação Primária Direta e Convidativa */}
                <Button
                  onClick={() => navigate({ to: "/unit/1" })}
                  className="w-full rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base py-6 shadow-md transition-all gap-2 hover:gap-3"
                >
                  <span>Entrar no hotel com Alex</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. A ROTA PELO MUNDO: ONDE O INGLÊS ACONTECE                  */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="pb-2 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-blue-600" />
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Sua Rota Pelo Mundo
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Onde o inglês acontece com você e Alex
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Você começa hoje no hotel e, passo a passo, descobre como se comunicar em cafés, ruas, transportes e viagens pelo mundo.
            </p>
          </div>

          {/* Grid dos 7 Cenários da Jornada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {SCENARIOS_LIST.map((scen) => (
              <ScenarioCard
                key={scen.id}
                number={scen.number}
                id={scen.id}
                title={scen.title}
                situationPt={scen.situationPt}
                imageSrc={scen.imageSrc}
                levelBadge={scen.levelBadge}
                status={scen.status}
                onClick={() => {
                  if (scen.targetRoute) {
                    navigate({ to: scen.targetRoute });
                  }
                }}
              />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. ACOLHIMENTO E ORIENTAÇÃO (SUBORDINADA, SEGURANÇA P/ ADULTOS)*/}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-black uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Como nós vamos praticar juntos</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Um método tranquilo e feito para adultos
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sem testes de decoreba, sem notas punitivas e sem sensação de aplicativo infantil. Aqui o foco é você se sentir seguro para falar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1 w-full">
              <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <Headphones className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>1. No seu ritmo</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Ouça Alex no ritmo natural e repita quantas vezes precisar (Shadowing).
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>2. Situação real</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Responda diretamente ao que Alex pergunta, usando voz ou escrita.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                  <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>3. Sem punições</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sem vidas perdidas nem pressa. Cada tentativa aproxima você da fluência.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 5. RODAPÉ SÉRIO E EDITORIAL                                  */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-200/80 bg-white py-8 px-6 mt-12 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-serif italic text-slate-600 text-sm">
            <Plane className="h-4 w-4 text-blue-600 transform -rotate-45" />
            <span>"Small conversations. Big dreams."</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Polybot School</span>
            <span>·</span>
            <span>Inglês para a vida real</span>
            <span>·</span>
            <Link to="/debug" className="text-blue-600 hover:underline">
              Laboratório de Testes
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

