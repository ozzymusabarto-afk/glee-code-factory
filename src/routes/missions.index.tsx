import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  MapPin, 
  Plane, 
  Coffee, 
  ShoppingBag, 
  TaxiFront, 
  Stethoscope, 
  Briefcase, 
  Users,
  CheckCircle2,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/missions")({
  component: MissionsPage,
  head: () => ({
    meta: [{ title: "Missões — PolyBot" }],
  }),
});

const categories = [
  {
    title: "Viagem & Transporte",
    missions: [
      { id: "airport", title: "Lost at the Airport", icon: Plane, status: "available", level: "Iniciante" },
      { id: "taxi", title: "Calling a Taxi", icon: TaxiFront, status: "locked", level: "Iniciante" },
      { id: "hotel", title: "Checking In", icon: MapPin, status: "locked", level: "Iniciante" },
    ]
  },
  {
    title: "Vida Real",
    missions: [
      { id: "coffee", title: "Ordering Coffee", icon: Coffee, status: "completed", level: "Iniciante" },
      { id: "shopping", title: "At the Mall", icon: ShoppingBag, status: "locked", level: "Intermediário" },
      { id: "doctor", title: "At the Doctor", icon: Stethoscope, status: "locked", level: "Intermediário" },
    ]
  },
  {
    title: "Trabalho",
    missions: [
      { id: "meeting", title: "Business Meeting", icon: Users, status: "locked", level: "Avançado" },
      { id: "interview", title: "Job Interview", icon: Briefcase, status: "locked", level: "Avançado" },
    ]
  }
];

function MissionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-20">
      <header className="px-6 py-8">
        <h1 className="text-4xl font-black text-poly-navy">Missões</h1>
        <p className="text-muted-foreground font-medium">Escolha seu próximo desafio real.</p>
      </header>

      <main className="flex flex-col gap-10 px-6 pb-12">
        {categories.map((cat, i) => (
          <section key={i} className="flex flex-col gap-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-poly-navy/40 px-2">{cat.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {cat.missions.map((m) => (
                <button 
                  key={m.id}
                  disabled={m.status === "locked"}
                  className={cn(
                    "poly-card p-6 flex items-center gap-5 text-left transition-all border-2",
                    m.status === "available" && "border-poly-blue hover:scale-[1.02] shadow-md",
                    m.status === "completed" && "border-poly-green/30 bg-poly-green/5",
                    m.status === "locked" && "opacity-60 grayscale border-border cursor-not-allowed"
                  )}
                >
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0",
                    m.status === "available" && "bg-poly-blue text-white",
                    m.status === "completed" && "bg-poly-green text-white",
                    m.status === "locked" && "bg-muted text-muted-foreground"
                  )}>
                    <m.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase tracking-tighter opacity-50">{m.level}</span>
                      {m.status === "completed" && <CheckCircle2 className="h-4 w-4 text-poly-green" />}
                      {m.status === "locked" && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <h3 className="text-xl font-black text-poly-navy leading-tight">{m.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Reusing common navigation would be better in __root or a layout, 
          but for the prototype we'll keep it simple or implement it in root later. */}
    </div>
  );
}
