import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flame, Star } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { motion } from "framer-motion";

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
    <div className="flex min-h-screen flex-col bg-[#f8fafc] pb-24 md:pb-0 md:pl-20 font-jakarta">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center gap-2">
          <PolyMascot size="sm" />
          <h1 className="text-xl font-black tracking-tighter text-slate-900 font-space">POLYBOT</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-2xl bg-orange-50 px-3 py-1.5 border border-orange-100">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-black text-slate-900">7</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-blue-50 px-3 py-1.5 border border-blue-100">
            <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
            <span className="text-sm font-black text-slate-900">42</span>
          </div>
          <div className="h-9 w-9 overflow-hidden rounded-xl border-2 border-white shadow-sm ml-1">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-8">
        {/* Welcome Section */}
        <section className="flex flex-col gap-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight font-space">
            Olá, Adriana! 👋
          </h2>
          <p className="text-base font-medium text-slate-500">
            Qual será a aventura de hoje?
          </p>
        </section>

        {/* Mission of the Day Card */}
        <div className="relative">
          {/* Poly Mascot Floating */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 right-4 z-30 flex items-center gap-3"
          >
            <div className="relative rounded-2xl bg-white p-3 shadow-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                "O aeroporto te espera!"
              </p>
              <div className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 border-r border-b border-slate-100 bg-white" />
            </div>
            <PolyMascot size="sm" expression="excited" />
          </motion.div>

          <section className="relative overflow-hidden rounded-[24px] min-h-[520px] flex flex-col justify-between p-8 shadow-2xl shadow-blue-900/10">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200" 
                alt="Airport" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
            </div>
            
            <div className="relative z-20 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
                  Missão do Dia
                </span>
                <span className="rounded-full px-3 py-1 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-widest">
                  10 MINUTOS
                </span>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <h3 className="text-4xl font-black leading-none tracking-tighter text-white font-space uppercase">
                  LOST AT THE AIRPORT
                </h3>
                <p className="text-base font-bold text-white/80 leading-snug">
                  Encontre seu portão antes que seu voo decole.
                </p>
              </div>
            </div>

            <div className="relative z-20 mt-auto flex flex-col gap-6">
              {/* Glassmorphism Checklist Card */}
              <div className="rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-md border border-white">
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Perguntar informações", color: "bg-emerald-500" },
                    { label: "Entender respostas", color: "bg-blue-500" },
                    { label: "Explicar onde precisa chegar", color: "bg-orange-500" }
                  ].map((goal, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-1 cursor-pointer group"
                    >
                      <div className={`h-5 w-5 rounded-full ${goal.color} flex items-center justify-center shadow-lg shadow-black/5`}>
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {goal.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => navigate({ to: "/missions/airport" })}
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-lg shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] border-b-4 border-blue-700 active:border-b-0"
              >
                VAMOS COMEÇAR! 🚀
              </Button>
            </div>
          </section>
        </div>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progresso</span>
              <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                <Star className="h-3.5 w-3.5 fill-blue-500" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black text-slate-900 leading-none">85%</span>
                <span className="text-[9px] font-bold text-emerald-500">+12% hoje</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-orange-200 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Semanal</span>
              <div className="h-7 w-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                <Flame className="h-3.5 w-3.5 fill-orange-500" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-black text-slate-900 leading-none">5/7</span>
              <div className="flex gap-1 h-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 rounded-full bg-orange-500" />
                ))}
                {[6, 7].map((i) => (
                  <div key={i} className="flex-1 rounded-full bg-slate-100" />
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
