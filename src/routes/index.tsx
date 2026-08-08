import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, BarChart3, User, Zap, Flame, Star, Plane } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "PolyBot — Seu tutor de idiomas para a vida real",
    meta: [
      { name: "description", content: "Transforme sua vida com 10 minutos por dia. Aprenda inglês com situações reais e o tutor Poly." },
      { property: "og:title", content: "PolyBot — Tutor de Idiomas" },
      { property: "og:description", content: "Aprenda inglês com missões reais de 10 minutos." },
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-20">
      {/* Top Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-poly-cream/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-poly-blue text-white shadow-lg">
            <span className="text-xl font-black">P</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-poly-navy">PolyBot</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-sm border border-border">
            <Flame className="h-4 w-4 text-poly-orange fill-poly-orange" />
            <span className="text-sm font-bold text-poly-navy">7</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-sm border border-border">
            <Star className="h-4 w-4 text-poly-blue fill-poly-blue" />
            <span className="text-sm font-bold text-poly-navy">42</span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-4">
        {/* Welcome Section */}
        <section className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-poly-navy leading-tight">
            Olá, Adriana! 👋
          </h2>
          <p className="text-lg font-medium text-muted-foreground">
            Pronto para sua missão de hoje?
          </p>
        </section>

        {/* Mission of the Day Card */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-poly-navy p-8 text-white shadow-2xl">
          {/* Mission Image/Illustration Mockup */}
          <div className="absolute top-0 right-0 h-full w-1/2 opacity-20 md:opacity-40">
            <Plane className="h-full w-full rotate-12 scale-125" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-poly-yellow">Missão de hoje</span>
              <span className="rounded-full bg-poly-yellow px-3 py-1 text-[10px] font-black uppercase text-poly-navy">10 minutos</span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-4xl font-black leading-tight">Lost at the Airport</h3>
              <p className="text-lg font-medium text-white/80">
                Você precisa encontrar seu portão e não perder seu voo.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-poly-blue/20 text-poly-blue">
                  <Zap className="h-3 w-3 fill-poly-blue" />
                </div>
                <span className="text-sm font-bold">Perguntar informações</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-poly-green/20 text-poly-green">
                  <Zap className="h-3 w-3 fill-poly-green" />
                </div>
                <span className="text-sm font-bold">Entender respostas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-poly-orange/20 text-poly-orange">
                  <Zap className="h-3 w-3 fill-poly-orange" />
                </div>
                <span className="text-sm font-bold">Explicar onde precisa chegar</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate({ to: "/missions/airport" })}
              className="poly-button-secondary w-full text-lg"
            >
              VAMOS COMEÇAR! 🚀
            </Button>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="grid grid-cols-2 gap-4">
          <div className="poly-card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase">Habilidades</span>
              <BarChart3 className="h-5 w-5 text-poly-blue" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black text-poly-navy">85%</span>
              <Progress value={85} className="h-2" />
            </div>
          </div>
          <div className="poly-card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase">Meta Semanal</span>
              <Zap className="h-5 w-5 text-poly-orange" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black text-poly-navy">5/7</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-2 flex-1 rounded-full bg-poly-orange" />
                ))}
                {[6, 7].map((i) => (
                  <div key={i} className="h-2 flex-1 rounded-full bg-muted" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tutor Section Mockup */}
        <section className="poly-card bg-poly-blue/5 border-poly-blue/10 flex items-center gap-6">
          <div className="relative h-20 w-20 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-poly-blue/20" />
            <img 
              src="https://api.dicebear.com/7.x/bottts/svg?seed=Poly&backgroundColor=transparent" 
              alt="Poly" 
              className="relative z-10 h-full w-full scale-110 drop-shadow-xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-widest text-poly-blue">Poly diz:</span>
            <p className="text-lg font-bold leading-snug text-poly-navy">
              "Boa! Essa missão do aeroporto é fundamental para sua próxima viagem."
            </p>
          </div>
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
