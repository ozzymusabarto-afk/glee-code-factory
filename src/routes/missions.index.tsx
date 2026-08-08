import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Coffee, 
  ShoppingBag, 
  CarTaxiFront, 
  Stethoscope, 
  Briefcase, 
  Users,
  CheckCircle2,
  Lock,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/BottomNav";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { useAppStore } from "@/hooks/use-app-store";

export const Route = createFileRoute("/missions/")({
  component: MissionsPage,
  head: () => ({
    meta: [{ title: "Missões Reais — PolyBot" }],
  }),
});

const categories = [
  {
    title: "Viagem & Transporte",
    missions: [
      { id: "airport", title: "Lost at the Airport", icon: Plane, status: "available", level: "Iniciante", color: "poly-blue" },
      { id: "taxi", title: "Calling a Taxi", icon: CarTaxiFront, status: "locked", level: "Iniciante", color: "poly-yellow" },
    ]
  },
  {
    title: "Dia a Dia & Social",
    missions: [
      { id: "coffee", title: "Ordering Coffee", icon: Coffee, status: "available", level: "Iniciante", color: "poly-orange" },
      { id: "restaurant", title: "At the Restaurant", icon: Users, status: "locked", level: "Iniciante", color: "poly-green" },
    ]
  },
  {
    title: "Profissional & Saúde",
    missions: [
      { id: "hotel", title: "Hotel Check-in", icon: Briefcase, status: "locked", level: "Intermediário", color: "poly-navy" },
      { id: "doctor", title: "At the Doctor", icon: Stethoscope, status: "locked", level: "Intermediário", color: "poly-green" },
    ]
  }
];

function MissionsPage() {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "flex min-h-screen flex-col pb-24 md:pb-0 md:pl-24 transition-colors duration-500",
      useAppStore.getState().appMode === 'adult' ? "bg-[#0F172A]" : "bg-poly-cream"
    )}>
      <header className="px-8 py-10">
        <div className="flex items-center gap-4 mb-2">
           <PolyMascot size="sm" />
           <span className={cn(
             "poly-badge", 
             useAppStore.getState().appMode === 'adult' ? "bg-cyan-500/10 text-cyan-500" : "bg-poly-blue/10 text-poly-blue"
           )}>Sua Jornada</span>
        </div>
        <h1 className={cn(
          "text-5xl font-black tracking-tighter leading-none",
          useAppStore.getState().appMode === 'adult' ? "text-white" : "text-poly-navy"
        )}>Missões</h1>
        <p className={cn(
          "text-xl font-bold mt-2",
          useAppStore.getState().appMode === 'adult' ? "text-slate-400" : "text-muted-foreground/80"
        )}>Escolha seu próximo desafio real.</p>
      </header>

      <main className="flex flex-col gap-12 px-8 pb-16 max-w-5xl">
        {categories.map((cat, i) => (
          <section key={i} className="flex flex-col gap-6">
            <h2 className={cn(
              "text-xs font-black uppercase tracking-[0.3em] px-2",
              useAppStore.getState().appMode === 'adult' ? "text-cyan-500/50" : "text-poly-navy/40"
            )}>{cat.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.missions.map((m) => (
                <button 
                  key={m.id}
                  onClick={() => m.status !== "locked" && navigate({ to: `/missions/${m.id}` })}
                  disabled={m.status === "locked"}
                  className={cn(
                    "poly-card p-8 flex flex-col gap-6 text-left transition-all duration-300 relative overflow-hidden group border-none",
                    m.status === "available" && (
                      useAppStore.getState().appMode === 'adult' 
                        ? "bg-slate-800 shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer" 
                        : "bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    ),
                    m.status === "completed" && (
                      useAppStore.getState().appMode === 'adult' ? "bg-cyan-500/5 opacity-80" : "bg-poly-green/5 opacity-80"
                    ),
                    m.status === "locked" && (
                      useAppStore.getState().appMode === 'adult' ? "bg-slate-900/50 opacity-40 grayscale" : "bg-muted/30 opacity-40 grayscale cursor-not-allowed"
                    )
                  )}
                >
                  {m.status === "available" && (
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <m.icon className="h-24 w-24 rotate-12" />
                    </div>
                  )}

                  <div className="flex items-center justify-between w-full">
                    <div className={cn(
                      "h-16 w-16 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-lg",
                      m.status === "available" && `bg-${m.color} text-white shadow-${m.color}/20`,
                      m.status === "completed" && "bg-poly-green text-white",
                      m.status === "locked" && "bg-muted text-muted-foreground"
                    )}>
                      <m.icon className="h-8 w-8" />
                    </div>
                    {m.status === "completed" ? (
                      <div className="bg-poly-green/20 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-poly-green" />
                      </div>
                    ) : m.status === "locked" ? (
                      <Lock className="h-5 w-5 text-poly-navy/20" />
                    ) : (
                      <div className="flex items-center gap-1 bg-poly-yellow/20 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 text-poly-yellow fill-poly-yellow" />
                        <span className="text-[10px] font-black text-poly-navy">10 XP</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest opacity-40",
                      useAppStore.getState().appMode === 'adult' ? "text-slate-400" : "text-poly-navy"
                    )}>{m.level}</span>
                    <h3 className={cn(
                      "text-2xl font-black leading-tight",
                      useAppStore.getState().appMode === 'adult' ? "text-white" : "text-poly-navy"
                    )}>{m.title}</h3>
                  </div>
                  
                  {m.status === "available" && (
                     <div className={cn(
                        "flex items-center gap-2 font-black text-xs uppercase tracking-widest mt-2 group-hover:gap-3 transition-all",
                        useAppStore.getState().appMode === 'adult' ? "text-cyan-500" : "text-poly-blue"
                      )}>
                        Começar Missão <div className={cn(
                          "h-1 w-4 rounded-full",
                          useAppStore.getState().appMode === 'adult' ? "bg-cyan-500" : "bg-poly-blue"
                        )} />
                     </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>

      <BottomNav active="missions" />
    </div>
  );
}
