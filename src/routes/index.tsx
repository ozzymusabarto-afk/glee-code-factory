import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Coffee,
  Compass,
  CarTaxiFront,
  Plane,
  Hotel,
  Globe,
  Lock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlexCharacter } from "@/components/character/AlexCharacter";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: PolybotSchoolHome,
  head: () => ({
    title: "Polybot School — Sua jornada começa aqui",
    meta: [
      {
        name: "description",
        content: "Curso completo de inglês em situações cotidianas reais. Você não precisa saber inglês para começar.",
      },
    ],
  }),
});

interface JourneyStep {
  id: string;
  unitNumber?: number | undefined;
  title: string;
  situationPt: string;
  icon: typeof Sparkles;
  status: "active" | "locked" | "completed";
  targetRoute?: string | undefined;
  levelBadge: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "HOME & HOTEL",
    situationPt: "Unit 1: Hello! — Conhecendo Alex no saguão",
    icon: Sparkles,
    status: "active",
    targetRoute: "/unit/1",
    levelBadge: "Iniciante · A0",
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "CAFÉ",
    situationPt: "Unit 2: Ordering Coffee — Pedindo um café e algo para comer",
    icon: Coffee,
    status: "locked",
    levelBadge: "Iniciante · A0",
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "CIDADE",
    situationPt: "Unit 3: Lost in Town — Perguntando direções nas ruas",
    icon: Compass,
    status: "locked",
    levelBadge: "Iniciante · A1",
  },
  {
    id: "unit-4",
    unitNumber: 4,
    title: "TRANSPORTE",
    situationPt: "Unit 4: Taxi & Metro — Pegando transporte com segurança",
    icon: CarTaxiFront,
    status: "locked",
    levelBadge: "Iniciante · A1",
  },
  {
    id: "unit-5",
    unitNumber: 5,
    title: "VIAGEM",
    situationPt: "Unit 5: Airport Gate — Passando pela imigração e portão",
    icon: Plane,
    status: "locked",
    targetRoute: "/missions/airport",
    levelBadge: "Intermediário · A2",
  },
  {
    id: "unit-6",
    unitNumber: 6,
    title: "HOTEL",
    situationPt: "Unit 6: Check-in & Estadia — Resolvendo detalhes do quarto",
    icon: Hotel,
    status: "locked",
    levelBadge: "Intermediário · A2",
  },
  {
    id: "unit-7",
    unitNumber: 7,
    title: "MUNDO",
    situationPt: "Unit 7: Conexões Globais — Conversas livres do dia a dia",
    icon: Globe,
    status: "locked",
    levelBadge: "Fluência Cotidiana",
  },
];

function PolybotSchoolHome() {
  const navigate = useNavigate();
  const displayName = useAppStore((state) => state.displayName);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">
      {/* Barra de Navegação Editorial */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-30 px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              P
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 block leading-none">
                POLYBOT
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">
                School
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/debug"
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Laboratório
            </Link>
            <Link
              to="/profile"
              className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <User className="h-3.5 w-3.5" />
              {displayName || "Perfil"}
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="mx-auto max-w-4xl w-full p-6 md:p-10 space-y-12">
        {/* Cartão Hero Editorial */}
        <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/40 to-amber-50/20 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4 text-left">
              <span className="inline-block rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-800">
                Sua jornada começa aqui
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 leading-[1.15]">
                Você não precisa saber inglês para começar.
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed">
                Aprenda através de situações reais do cotidiano, com prática de fala guiada por Alex, o companheiro humano da sua jornada.
              </p>

              <div className="pt-3">
                <Button
                  onClick={() => navigate({ to: "/unit/1" })}
                  className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg px-8 py-7 shadow-md shadow-blue-600/20 gap-3 hover:gap-4 transition-all"
                >
                  COMEÇAR
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Ilustração Editorial do Alex dando boas-vindas */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="p-4 rounded-3xl bg-white/80 border border-slate-100 shadow-sm">
                <AlexCharacter pose="waving" size="md" />
                <p className="text-center text-xs font-bold text-slate-600 mt-2">
                  Alex · Companheiro de Jornada
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trilha da Jornada: HOME → CAFÉ → CIDADE → TRANSPORTE → VIAGEM → HOTEL → MUNDO */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                Mapa da Jornada
              </h2>
              <p className="text-xl font-black text-slate-900">
                Situações Cotidianas da Vida Real
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              1 de 7 disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JOURNEY_STEPS.map((step) => {
              const Icon = step.icon;
              const isAvailable = step.status === "active";

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    if (isAvailable && step.targetRoute) {
                      navigate({ to: step.targetRoute });
                    }
                  }}
                  className={cn(
                    "rounded-3xl border p-6 transition-all flex flex-col justify-between gap-4 text-left",
                    isAvailable
                      ? "border-blue-300 bg-white hover:border-blue-500 hover:shadow-md cursor-pointer group"
                      : "border-slate-200/70 bg-slate-50/70 opacity-60 cursor-not-allowed",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center",
                        isAvailable
                          ? "bg-blue-600 text-white shadow-sm group-hover:scale-105 transition-transform"
                          : "bg-slate-200 text-slate-400",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {step.levelBadge}
                      </span>
                      {isAvailable ? (
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wider">
                          Disponível
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
                          <Lock className="h-3 w-3" /> Bloqueado
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={cn("text-xl font-black", isAvailable ? "text-slate-900 group-hover:text-blue-700" : "text-slate-500")}>
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {step.situationPt}
                    </p>
                  </div>

                  {isAvailable && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                      <span>Iniciar lição agora</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Rodapé Editorial */}
      <footer className="border-t border-slate-200/70 bg-white py-6 px-8 text-center text-xs text-slate-400">
        Polybot School · Inglês para a vida real · Sem pressão, sem julgamento
      </footer>
    </div>
  );
}
