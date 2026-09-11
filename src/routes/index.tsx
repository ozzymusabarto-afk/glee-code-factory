import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Flame,
  Star,
  BookOpen,
  Trophy,
  Crown,
  Settings,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlexCharacter, AlexAvatar, AlexCompanionCard, AlexDicaCard } from "@/components/character/AlexCharacter";
import { ScenarioCard, ScenarioCardProps } from "@/components/scenario/ScenarioCard";
import { CharacterRoster, InterfaceElementsShowcase } from "@/components/character/CharacterRoster";
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">
      {/* ============================================================ */}
      {/* 1. HEADER DA APLICAÇÃO (CONFORME REFERÊNCIA VISUAL)          */}
      {/* ============================================================ */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 shadow-xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* Logo Polybot School Oficial */}
          <Link to="/" className="flex items-center gap-3 select-none group">
            <div className="h-10 w-10 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
              {/* Ícone estilizado do balão de fala */}
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

          {/* Painel do Aluno: Status, Jornada, Conquistas e Dica */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Dica do Alex */}
            <AlexDicaCard className="py-2 px-3.5" />

            {/* Progresso da Jornada */}
            <div className="flex flex-col gap-1 w-36">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-500">Sua jornada</span>
                <span className="text-blue-700 font-black">1 de 7</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[14%]" />
              </div>
            </div>

            {/* Conquistas (Medalhas) */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="h-7 w-7 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center" title="Primeira Conquista">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="h-7 w-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center" title="Foco diário">
                <Flame className="h-4 w-4" />
              </div>
              <div className="h-7 w-7 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center" title="Vocabulário ativo">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="h-7 w-7 rounded-xl bg-slate-200/60 text-slate-400 flex items-center justify-center" title="Troféu desbloqueável">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="h-7 w-7 rounded-xl bg-slate-200/60 text-slate-400 flex items-center justify-center" title="Fluência total">
                <Crown className="h-4 w-4" />
              </div>
            </div>

            {/* Perfil do Usuário */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 text-left hover:opacity-90"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                {(displayName || "M").charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block leading-tight">
                  {displayName ? `Olá, ${displayName}` : "Olá, Estudante"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 block">
                  Iniciante · A0
                </span>
              </div>
              <Settings className="h-4 w-4 text-slate-400 hover:text-slate-700 ml-1" />
            </Link>
          </div>

          {/* Acesso rápido mobile */}
          <div className="flex lg:hidden items-center gap-2">
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
      {/* 2. HERO BANNER CINEMATOGRÁFICO COM ALEX E DESTAQUE DA UNIT 1 */}
      {/* ============================================================ */}
      <main className="mx-auto max-w-7xl w-full p-4 md:p-8 space-y-10">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] text-white p-6 md:p-12 shadow-2xl border border-slate-800">
          {/* Efeito de luz ambiente e partículas suaves de fundo */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Lado Esquerdo do Hero: Apresentação, Alex e CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider">
                  Sua jornada começa aqui
                </span>
                <span className="text-xs text-slate-400">
                  · Método Natural A0
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.12]">
                  Your journey into English{" "}
                  <span className="text-amber-400 font-serif italic block md:inline font-bold">
                    starts here.
                  </span>
                </h1>
                <p className="text-sm md:text-base text-slate-300 font-medium max-w-lg leading-relaxed">
                  Mais do que um app. Uma jornada para o seu mundo.
                  Você não precisa saber inglês para começar: Alex acompanha cada fala com você.
                </p>
              </div>

              {/* Botão Primário "Começar →" em Amarelo/Dourado Oficial */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={() => navigate({ to: "/unit/1" })}
                  className="rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-base md:text-lg px-8 py-7 shadow-lg shadow-amber-400/25 gap-3 hover:gap-4 transition-all"
                >
                  <span>Começar</span>
                  <ArrowRight className="h-5 w-5 text-slate-950" />
                </Button>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <AlexAvatar className="h-9 w-9 border border-amber-400/60" />
                  <div>
                    <span className="font-bold text-white block">Alex</span>
                    <span className="text-slate-400 text-[11px]">Seu companheiro de jornada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito do Hero: Card de Destaque da Unit 1 (Conforme Referência) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white text-slate-900 shadow-2xl p-6 border-2 border-amber-400/80 ring-4 ring-amber-400/15 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      📍
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Mapa da Jornada
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        Situações Cotidianas da Vida Real
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    1 de 7 disponíveis
                  </span>
                </div>

                {/* Imagem do Saguão do Hotel */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <img
                    src="/assets/scenarios/hotel-lobby.jpg"
                    alt="Saguão do Hotel"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-black border border-white/20">
                      Iniciante · A0
                    </span>
                    <span className="text-xs font-bold drop-shadow-sm">
                      Hotel Lobby
                    </span>
                  </div>
                </div>

                {/* Título e Chamada da Unidade 1 */}
                <div>
                  <h3 className="text-xl font-black text-slate-950 tracking-tight">
                    HOME & HOTEL
                  </h3>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">
                    Unit 1: Hello!
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Conhecendo Alex no saguão de um hotel internacional.
                  </p>
                </div>

                {/* Botão de Ação do Card */}
                <Button
                  onClick={() => navigate({ to: "/unit/1" })}
                  className="w-full rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm py-6 shadow-md transition-colors gap-2"
                >
                  <span>Iniciar lição agora</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. TRILHA DA JORNADA: 7 SITUAÇÕES DA VIDA REAL               */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                  Mapa da Jornada
                </h2>
              </div>
              <p className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Situações Cotidianas da Vida Real
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>1 de 7 disponíveis</span>
            </div>
          </div>

          {/* Grid dos 7 Cenários da Referência */}
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
        {/* 4. SEÇÕES INFERIORES: COMPANHEIRO, PERSONAGENS E INTERFACE   */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card do Companheiro Alex */}
          <div className="lg:col-span-4 flex">
            <AlexCompanionCard className="w-full" />
          </div>

          {/* Os Personagens */}
          <div className="lg:col-span-5 flex">
            <CharacterRoster className="w-full" />
          </div>

          {/* Elementos da Interface */}
          <div className="lg:col-span-3 flex">
            <InterfaceElementsShowcase className="w-full" />
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* 5. RODAPÉ DA MARCA (CONFORME REFERÊNCIA VISUAL)              */}
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

