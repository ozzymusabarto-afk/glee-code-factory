import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  MessageSquare, 
  Ear, 
  Plane, 
  Coffee, 
  Briefcase,
  Trophy,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
  head: () => ({
    meta: [{ title: "Meu Progresso — PolyBot" }],
  }),
});

const stats = [
  { label: "Falar", value: 72, icon: MessageSquare, color: "poly-blue" },
  { label: "Compreender", value: 85, icon: Ear, color: "poly-green" },
  { label: "Conversar", value: 45, icon: Users, color: "poly-purple" },
  { label: "Viajar", value: 60, icon: Plane, color: "poly-navy" },
  { label: "Vida Real", value: 90, icon: Coffee, color: "poly-orange" },
  { label: "Trabalho", value: 30, icon: Briefcase, color: "poly-yellow" },
];

const achievements = [
  { title: "Explorador de Aeroporto", date: "Ontem", icon: Award },
  { title: "Viciado em Café", date: "3 dias atrás", icon: Coffee },
  { title: "Primeiros Passos", date: "1 semana atrás", icon: Zap },
];

import { Users } from "lucide-react";

function ProgressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-20">
      <header className="px-6 py-8">
        <h1 className="text-4xl font-black text-poly-navy">Meu Progresso</h1>
        <p className="text-muted-foreground font-medium">Veja o quanto você evoluiu hoje.</p>
      </header>

      <main className="flex flex-col gap-8 px-6 pb-12 max-w-4xl">
        {/* Radar/Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="poly-card flex flex-col items-center gap-4 text-center p-6 bg-white">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center",
                `bg-${s.color}/10 text-${s.color}`
              )}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase opacity-40 mb-1">{s.label}</span>
                <span className="text-2xl font-black text-poly-navy">{s.value}%</span>
              </div>
              <div className="w-full bg-muted/30 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", `bg-${s.color}`)} 
                  style={{ width: `${s.value}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity / Achievements */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-poly-navy">Conquistas Recentes</h2>
            <Trophy className="h-5 w-5 text-poly-yellow fill-poly-yellow" />
          </div>
          <div className="flex flex-col gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="poly-card flex items-center gap-4 p-4 bg-white/50 border-dashed">
                <div className="h-10 w-10 rounded-full bg-poly-yellow/20 flex items-center justify-center text-poly-navy">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-poly-navy">{a.title}</h3>
                  <span className="text-xs text-muted-foreground font-medium">{a.date}</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-poly-green" />
              </div>
            ))}
          </div>
        </section>

        {/* Global Progress Chart Mockup */}
        <section className="poly-card bg-poly-navy text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="h-32 w-32" />
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-black">Visão Geral</h2>
            <p className="text-white/70 font-medium">Você já domina <span className="text-poly-yellow font-black">42 frases</span> e está no caminho certo para a fluência.</p>
            <div className="flex gap-2 h-24 items-end mt-8">
              {[30, 45, 25, 60, 85, 40, 75].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-white/20 rounded-t-lg hover:bg-poly-yellow transition-colors cursor-pointer group relative"
                  style={{ height: `${h}%` }}
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-poly-navy text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     {h}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
