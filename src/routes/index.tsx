import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Flame, Star, Plane } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "PolyBot — Aprenda com Missões Reais",
    meta: [
      { name: "description", content: "Aprenda inglês com situações reais e o tutor Poly." },
      { property: "og:title", content: "PolyBot — Seu Tutor de Idiomas" },
      { property: "og:image", content: "https://id-preview--55a5ccfc-0e71-4b0e-8638-7bb09b210ad0.lovable.app/og-home.png" }
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-poly-cream/90 px-6 py-5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <PolyMascot size="sm" />
          <h1 className="text-2xl font-black tracking-tighter text-poly-navy">POLYBOT</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-border/50">
            <Flame className="h-4 w-4 text-poly-orange fill-poly-orange" />
            <span className="text-sm font-black text-poly-navy">7</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-border/50">
            <Star className="h-4 w-4 text-poly-blue fill-poly-blue" />
            <span className="text-sm font-black text-poly-navy">42</span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-2xl border-2 border-white shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-6">
        {/* Welcome Section */}
        <section className="flex flex-col gap-1 relative">
          <h2 className="text-4xl font-black text-poly-navy tracking-tight leading-none">
            Olá, Adriana! 👋
          </h2>
          <p className="text-lg font-bold text-muted-foreground/80">
            Qual será a aventura de hoje?
          </p>
        </section>

        {/* Mission of the Day Card */}
        <div className="relative">
          {/* Poly Speech Bubble */}
          <div className="absolute -top-20 right-0 z-30 flex items-center gap-4 animate-bounce-slow">
            <div className="relative rounded-3xl bg-white p-4 shadow-xl border border-border/50">
              <p className="text-sm font-bold text-poly-navy leading-tight">
                "O aeroporto te espera! Vamos lá?"
              </p>
              <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-r border-b border-border/50 bg-white" />
            </div>
            <PolyMascot size="sm" expression="excited" />
          </div>

          <section className="poly-card-navy min-h-[500px] flex flex-col justify-between">
            {/* Mission Context Illustration - Unsplash */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200" 
                alt="Airport" 
                className="h-full w-full object-cover opacity-60 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-poly-navy via-poly-navy/40 to-transparent" />
            </div>
            
            <div className="relative z-20 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="poly-badge bg-white/20 text-white backdrop-blur-md">Missão do Dia</span>
                <span className="poly-badge bg-poly-yellow text-poly-navy">10 MINUTOS</span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h3 className="text-5xl font-black leading-none tracking-tighter text-white drop-shadow-lg">
                  LOST AT THE AIRPORT
                </h3>
                <p className="text-lg font-bold text-white/90 leading-tight">
                  Você precisa encontrar seu portão antes que seu voo decole.
                </p>
              </div>
            </div>

            <div className="relative z-20 mt-auto flex flex-col gap-6">
              {/* Checklist White Card Overlay */}
              <div className="rounded-[2rem] bg-white p-6 shadow-2xl border border-white/20">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-poly-green flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-poly-green" />
                    </div>
                    <span className="text-base font-black text-poly-navy">Perguntar informações</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-poly-blue flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-poly-blue" />
                    </div>
                    <span className="text-base font-black text-poly-navy">Entender respostas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-poly-orange flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-poly-orange" />
                    </div>
                    <span className="text-base font-black text-poly-navy">Explicar onde precisa chegar</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => navigate({ to: "/missions/airport" })}
                className="poly-button-primary w-full text-xl py-8 shadow-[0_15px_30px_rgba(0,122,255,0.3)]"
              >
                VAMOS COMEÇAR! 🚀
              </Button>
            </div>
          </section>
        </div>

        {/* Quick Stats & Map Visual */}
        <section className="grid grid-cols-2 gap-5">
          <div className="poly-card group hover:border-poly-blue/30 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Habilidades</span>
              <div className="h-8 w-8 rounded-xl bg-poly-blue/10 flex items-center justify-center text-poly-blue">
                <Star className="h-4 w-4 fill-poly-blue" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-poly-navy leading-none">85%</span>
                <span className="text-[10px] font-black text-poly-green uppercase tracking-tighter">+12% hoje</span>
              </div>
              <div className="h-3 w-full bg-poly-blue/10 rounded-full overflow-hidden">
                <div className="h-full bg-poly-blue rounded-full w-[85%] shadow-[0_0_10px_rgba(37,99,235,0.3)]" />
              </div>
            </div>
          </div>
          
          <div className="poly-card group hover:border-poly-orange/30 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Meta Semanal</span>
              <div className="h-8 w-8 rounded-xl bg-poly-orange/10 flex items-center justify-center text-poly-orange">
                <Flame className="h-4 w-4 fill-poly-orange" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-3xl font-black text-poly-navy leading-none">5/7</span>
              <div className="flex gap-1.5 h-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 rounded-full bg-poly-orange shadow-[0_0_5px_rgba(249,115,22,0.3)]" />
                ))}
                {[6, 7].map((i) => (
                  <div key={i} className="flex-1 rounded-full bg-muted/30" />
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <BottomNav active="home" />
    </div>
  );
}
