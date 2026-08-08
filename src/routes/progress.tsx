import { createFileRoute } from "@tanstack/react-router";
import { 
  MessageSquare, 
  Ear, 
  Plane, 
  Coffee, 
  Briefcase,
  Trophy,
  Zap,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
  head: () => ({
    meta: [{ title: "Seu Progresso Visual — PolyBot" }],
  }),
});

const stats = [
  { label: "Falar", value: 72, icon: MessageSquare, color: "poly-blue" },
  { label: "Compreender", value: 85, icon: Ear, color: "poly-green" },
  { label: "Conversar", value: 45, icon: Users, color: "poly-navy" },
  { label: "Viajar", value: 60, icon: Plane, color: "poly-yellow" },
  { label: "Vida Real", value: 90, icon: Coffee, color: "poly-orange" },
  { label: "Trabalho", value: 30, icon: Briefcase, color: "poly-blue" },
];

const achievements = [
  { title: "Explorador de Aeroporto", date: "Ontem", icon: Award, xp: "+50 XP" },
  { title: "Viciado em Café", date: "3 dias atrás", icon: Coffee, xp: "+30 XP" },
  { title: "Primeiros Passos", date: "1 semana atrás", icon: Zap, xp: "+20 XP" },
];

function ProgressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-24">
      <header className="px-8 py-10">
        <div className="flex items-center gap-4 mb-2">
           <PolyMascot size="sm" expression="proud" />
           <span className="poly-badge bg-poly-green/10 text-poly-green">Nível 12</span>
        </div>
        <h1 className="text-5xl font-black text-poly-navy tracking-tighter leading-none">Progresso</h1>
        <p className="text-xl font-bold text-muted-foreground/80 mt-2">Você está cada dia mais perto do topo!</p>
      </header>

      <main className="flex flex-col gap-10 px-8 pb-16 max-w-6xl">
        {/* Global Progress Visual Map */}
        <section className="poly-card bg-poly-navy text-white p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
            <Trophy className="h-48 w-48" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
             <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tight">VISÃO GERAL</h2>
                  <p className="text-xl font-bold text-white/70 leading-snug">
                    Você já domina <span className="text-poly-yellow font-black">42 frases essenciais</span> e completou 15 missões.
                  </p>
                </div>
                
                <div className="flex gap-4">
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                      <span className="text-[10px] font-black uppercase text-white/40 block mb-1">XP Total</span>
                      <span className="text-2xl font-black text-poly-yellow">2.450</span>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                      <span className="text-[10px] font-black uppercase text-white/40 block mb-1">Precisão</span>
                      <span className="text-2xl font-black text-poly-green">92%</span>
                   </div>
                </div>
             </div>

             <div className="flex gap-3 h-48 items-end justify-between px-4">
               {[30, 55, 35, 70, 95, 50, 85].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-full bg-white/5 rounded-full overflow-hidden relative h-full flex flex-col justify-end">
                       <div 
                         className="w-full bg-poly-blue group-hover:bg-poly-yellow transition-all duration-700 ease-out rounded-t-full shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                         style={{ height: `${h}%` }}
                       />
                    </div>
                    <span className="text-[8px] font-black uppercase text-white/30">SEG</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Radar/Grid Stats */}
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-poly-navy/40 px-2">Habilidades Detalhadas</h2>
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
             {stats.map((s, i) => (
               <div key={i} className="poly-card bg-white p-8 flex flex-col gap-6 group hover:shadow-xl transition-all duration-300 border-none">
                 <div className="flex items-center justify-between">
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg",
                      `bg-${s.color} text-white shadow-${s.color}/20`
                    )}>
                      <s.icon className="h-7 w-7" />
                    </div>
                    <span className="text-3xl font-black text-poly-navy tracking-tighter">{s.value}%</span>
                 </div>
                 
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-poly-navy/40">{s.label}</span>
                    <div className="w-full bg-muted/20 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full transition-all duration-1000", `bg-${s.color}`)} 
                        style={{ width: `${s.value}%` }} 
                      />
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Achievements Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-poly-navy/40">Conquistas Recentes</h2>
              <Trophy className="h-5 w-5 text-poly-yellow fill-poly-yellow" />
           </div>
           
           <div className="flex flex-col gap-4">
             {achievements.map((a, i) => (
               <div key={i} className="poly-card bg-white border-none shadow-sm hover:shadow-md transition-all p-6 flex items-center gap-6">
                 <div className="h-14 w-14 rounded-[1.25rem] bg-poly-yellow/10 flex items-center justify-center text-poly-navy shrink-0 border border-poly-yellow/20">
                   <a.icon className="h-7 w-7" />
                 </div>
                 <div className="flex-1">
                   <h3 className="text-xl font-black text-poly-navy tracking-tight">{a.title}</h3>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">{a.date}</span>
                      <div className="h-1 w-1 bg-muted/40 rounded-full" />
                      <span className="text-[10px] font-black text-poly-green uppercase tracking-widest">{a.xp}</span>
                   </div>
                 </div>
                 <div className="bg-poly-green/10 p-2.5 rounded-full">
                   <CheckCircle2 className="h-6 w-6 text-poly-green" />
                 </div>
               </div>
             ))}
           </div>
        </section>
      </main>
      
      <BottomNav active="progress" />
    </div>
  );
}
