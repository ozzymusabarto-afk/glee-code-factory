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
      { id: "hotel", title: "Checking In", icon: Briefcase, status: "locked", level: "Iniciante", color: "poly-navy" },
    ]
  },
  {
    title: "Vida Real",
    missions: [
      { id: "coffee", title: "Ordering Coffee", icon: Coffee, status: "completed", level: "Iniciante", color: "poly-orange" },
      { id: "shopping", title: "At the Mall", icon: ShoppingBag, status: "locked", level: "Intermediário", color: "poly-purple" },
      { id: "doctor", title: "At the Doctor", icon: Stethoscope, status: "locked", level: "Intermediário", color: "poly-green" },
    ]
  }
];

function MissionsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-24">
      <header className="px-8 py-10">
        <div className="flex items-center gap-4 mb-2">
           <PolyMascot size="sm" />
           <span className="poly-badge bg-poly-blue/10 text-poly-blue">Sua Jornada</span>
        </div>
        <h1 className="text-5xl font-black text-poly-navy tracking-tighter leading-none">Missões</h1>
        <p className="text-xl font-bold text-muted-foreground/80 mt-2">Escolha seu próximo desafio real.</p>
      </header>

      <main className="flex flex-col gap-12 px-8 pb-16 max-w-5xl">
        {categories.map((cat, i) => (
          <section key={i} className="flex flex-col gap-6">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-poly-navy/40 px-2">{cat.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.missions.map((m) => (
                <button 
                  key={m.id}
                  onClick={() => m.status !== "locked" && navigate({ to: `/missions/${m.id}` })}
                  disabled={m.status === "locked"}
                  className={cn(
                    "poly-card p-8 flex flex-col gap-6 text-left transition-all duration-300 relative overflow-hidden group border-none",
                    m.status === "available" && "bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer",
                    m.status === "completed" && "bg-poly-green/5 opacity-80",
                    m.status === "locked" && "bg-muted/30 opacity-40 grayscale cursor-not-allowed"
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
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{m.level}</span>
                    <h3 className="text-2xl font-black text-poly-navy leading-tight">{m.title}</h3>
                  </div>
                  
                  {m.status === "available" && (
                     <div className="flex items-center gap-2 text-poly-blue font-black text-xs uppercase tracking-widest mt-2 group-hover:gap-3 transition-all">
                        Começar Missão <div className="h-1 w-4 bg-poly-blue rounded-full" />
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
