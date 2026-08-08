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
import { useAppStore } from "@/hooks/use-app-store";

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
  const { appMode } = useAppStore();
  const isAdult = appMode === 'adult';

  return (
    <div className={cn(
      "flex min-h-screen flex-col pb-24 md:pb-0 md:pl-24 transition-colors duration-500",
      isAdult ? "bg-[#0F172A]" : "bg-[#F5F7FA]"
    )}>
      <header className={cn(
        "px-8 py-12 border-b transition-colors duration-500",
        isAdult ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"
      )}>
        <div className="flex items-center gap-4 mb-2">
           <PolyMascot size="sm" expression="proud" />
           <span className={cn(
             "poly-badge",
             isAdult ? "bg-cyan-500/10 text-cyan-500" : "bg-poly-green/10 text-poly-green"
           )}>Nível 12</span>
        </div>
        <h1 className={cn(
          "text-5xl font-black tracking-tighter leading-none",
          isAdult ? "text-white" : "text-poly-navy"
        )}>Progresso</h1>
        <p className={cn(
          "text-xl font-bold mt-2",
          isAdult ? "text-slate-400" : "text-muted-foreground/80"
        )}>Você está cada dia mais perto do topo!</p>
      </header>

      <main className="flex flex-col gap-10 px-8 pb-16 max-w-6xl">
        {/* Global Progress Visual Map */}
        <section className={cn(
          "p-12 rounded-[32px] relative overflow-hidden shadow-2xl border-none transition-colors",
          isAdult ? "bg-cyan-600 shadow-cyan-500/10" : "bg-[#0D47A1]"
        )}>
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
            <Trophy className="h-48 w-48" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
             <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className={cn("text-4xl font-black tracking-tight", isAdult ? "text-slate-900" : "text-white")}>VISÃO GERAL</h2>
                  <p className={cn("text-xl font-bold leading-snug", isAdult ? "text-slate-900/70" : "text-white/70")}>
                    Você já domina <span className={cn("font-black", isAdult ? "text-white" : "text-poly-yellow")}>42 frases essenciais</span> e completou 15 missões.
                  </p>
                </div>
                
                <div className="flex gap-4">
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 border border-white/10">
                      <span className="text-[10px] font-black uppercase text-white/40 block mb-1">XP Total</span>
                      <span className="text-3xl font-black text-[#FFD600]">2.450</span>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex-1 border border-white/10">
                      <span className="text-[10px] font-black uppercase text-white/40 block mb-1">Precisão</span>
                      <span className="text-3xl font-black text-[#4CAF50]">92%</span>
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
           <h2 className={cn(
             "text-xs font-black uppercase tracking-[0.3em] px-2",
             isAdult ? "text-cyan-500/50" : "text-poly-navy/40"
           )}>Habilidades Detalhadas</h2>
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
             {stats.map((s, i) => (
               <div key={i} className={cn(
                 "poly-card p-8 flex flex-col gap-6 group hover:shadow-xl transition-all duration-300 border-none",
                 isAdult ? "bg-slate-800" : "bg-white"
               )}>
                 <div className="flex items-center justify-between">
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg",
                      `bg-${s.color} text-white shadow-${s.color}/20`
                    )}>
                      <s.icon className="h-7 w-7" />
                    </div>
                    <span className={cn("text-3xl font-black tracking-tighter", isAdult ? "text-white" : "text-poly-navy")}>{s.value}%</span>
                 </div>
                 
                 <div className="space-y-2">
                     <span className={cn(
                       "text-[10px] font-black uppercase tracking-widest",
                       isAdult ? "text-slate-400" : "text-poly-navy/40"
                     )}>{s.label}</span>
                     <div className={cn("w-full h-2.5 rounded-full overflow-hidden", isAdult ? "bg-slate-900" : "bg-muted/20")}>
                       <div 
                         className={cn(
                           "h-full transition-all duration-1000", 
                           isAdult ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]" : `bg-${s.color}`
                         )} 
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
              <h2 className={cn(
                "text-xs font-black uppercase tracking-[0.3em]",
                isAdult ? "text-cyan-500/50" : "text-poly-navy/40"
              )}>Conquistas Recentes</h2>
              <Trophy className="h-5 w-5 text-poly-yellow fill-poly-yellow" />
           </div>
           
           <div className="flex flex-col gap-4">
             {achievements.map((a, i) => (
               <div key={i} className={cn(
                 "poly-card border-none shadow-sm hover:shadow-md transition-all p-6 flex items-center gap-6",
                 isAdult ? "bg-slate-800" : "bg-white"
               )}>
                 <div className="h-14 w-14 rounded-[1.25rem] bg-poly-yellow/10 flex items-center justify-center text-poly-navy shrink-0 border border-poly-yellow/20">
                   <a.icon className="h-7 w-7" />
                 </div>
                 <div className="flex-1">
                   <h3 className={cn("text-xl font-black tracking-tight", isAdult ? "text-white" : "text-poly-navy")}>{a.title}</h3>
                   <div className="flex items-center gap-3 mt-1">
                      <span className={cn("text-[10px] font-bold uppercase", isAdult ? "text-slate-500" : "text-muted-foreground/60")}>{a.date}</span>
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
