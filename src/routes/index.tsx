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
        <section className="flex flex-col gap-1">
          <h2 className="text-4xl font-black text-poly-navy tracking-tight leading-none">
            Olá, Adriana! 👋
          </h2>
          <p className="text-lg font-bold text-muted-foreground/80">
            Qual será a aventura de hoje?
          </p>
        </section>

        {/* Mission of the Day Card */}
        <section className="poly-card-navy">
          {/* Mission Context Illustration */}
          <div className="absolute top-0 right-0 h-full w-[60%] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-poly-navy to-transparent z-10" />
            <Plane className="h-full w-full rotate-[15deg] scale-125 translate-x-1/4" />
          </div>
          
          <div className="relative z-20 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <span className="poly-badge bg-poly-yellow/20 text-poly-yellow">Missão do Dia</span>
              <span className="poly-badge bg-white/10 text-white/80 backdrop-blur-md">10 min</span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-5xl font-black leading-[0.9] tracking-tighter">
                ✈️ LOST AT THE AIRPORT
              </h3>
              <p className="text-xl font-bold text-white/90 leading-tight">
                "Você precisa encontrar seu portão antes que seu voo decole."
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-[2rem] bg-white/5 p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-poly-blue/30 text-poly-blue shadow-inner">
                  <Zap className="h-4 w-4 fill-poly-blue" />
                </div>
                <span className="text-base font-black">Ask for information</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-poly-green/30 text-poly-green shadow-inner">
                  <Zap className="h-4 w-4 fill-poly-green" />
                </div>
                <span className="text-base font-black">Understand directions</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-poly-orange/30 text-poly-orange shadow-inner">
                  <Zap className="h-4 w-4 fill-poly-orange" />
                </div>
                <span className="text-base font-black">Explain where you need to go</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate({ to: "/missions/airport" })}
              className="poly-button-secondary w-full text-xl py-8"
            >
              VAMOS COMEÇAR! 🚀
            </Button>
            
            <div className="flex items-center justify-center gap-2 pt-2">
               <PolyMascot size="sm" className="opacity-60" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Poly está te esperando</span>
            </div>
          </div>
        </section>

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

        {/* Tutor Interaction (Poly) */}
        <section className="poly-card bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-visible mt-4">
          <div className="absolute -top-12 -left-4">
             <PolyMascot size="md" expression="excited" />
          </div>
          <div className="pl-24 py-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-poly-blue block mb-2">Poly Tutor</span>
            <p className="text-xl font-bold leading-tight text-poly-navy">
              "Essa missão do aeroporto é fundamental para sua próxima viagem, Adriana. Você vai arrasar!"
            </p>
          </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
