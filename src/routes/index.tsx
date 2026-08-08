import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flame, Star, Plane, ChevronRight } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-[#f8fafc] pb-32 md:pb-0 md:pl-20 font-jakarta selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header - Glassmorphism */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/70 px-8 py-6 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <PolyMascot size="sm" />
          <h1 className="text-xl font-bold tracking-[-0.05em] text-slate-900 font-space">PolyBot</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-100/50 px-4 py-2 border border-slate-200/50">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-bold text-slate-900">7</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-100/50 px-4 py-2 border border-slate-200/50">
            <Star className="h-4 w-4 text-blue-500 fill-blue-500" />
            <span className="text-sm font-bold text-slate-900">42</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 shadow-sm cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-8 py-16">
        {/* Welcome Section - Minimalist */}
        <section className="flex flex-col gap-2">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-[#0f172a] tracking-[-0.05em] font-space"
          >
            Olá, Adriana.
          </motion.h2>
          <p className="text-xl font-medium text-slate-400 max-w-md leading-relaxed">
            Sua jornada de hoje está pronta. Dez minutos para o próximo nível.
          </p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-stretch">
          
          {/* Main Mission Card - Spans 4 columns */}
          <motion.section 
            whileHover={{ y: -5 }}
            className="md:col-span-4 relative overflow-hidden rounded-[32px] min-h-[500px] flex flex-col justify-end p-10 group cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            onClick={() => navigate({ to: "/missions/airport" })}
          >
            {/* Background with subtle zoom on hover */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200" 
                alt="Airport" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>
            
            <div className="relative z-20 flex flex-col gap-8 w-full max-w-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full px-4 py-1.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20">
                    Destaque
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-[#0ea5e9] text-white text-[10px] font-bold uppercase tracking-widest">
                    <Plane className="h-3 w-3" /> 10 MIN
                  </span>
                </div>
                <h3 className="text-5xl font-bold leading-[0.9] tracking-[-0.05em] text-white font-space">
                  LOST AT THE AIRPORT
                </h3>
                <p className="text-lg font-medium text-white/70 leading-relaxed">
                  Aprenda a navegar em terminais internacionais com confiança.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button className="poly-button-apple group/btn">
                  VAMOS COMEÇAR
                  <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    +12k
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Side Stats Column - Bento style */}
          <div className="md:col-span-2 flex flex-col gap-8">
            
            {/* Mascot Tip Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="poly-card border-none bg-[#f0f9ff] flex flex-col items-center text-center gap-4 p-10"
            >
              <div className="relative">
                <PolyMascot size="lg" expression="proud" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full border-4 border-blue-50"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 tracking-[-0.03em] font-space">Nível Mestre</h4>
                <p className="text-sm font-medium text-slate-500 mt-1">Sua pronúncia melhorou 15% esta semana!</p>
              </div>
            </motion.div>

            {/* Weekly Goal Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="poly-card p-10 flex flex-col justify-between min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meta</span>
                <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-950 tracking-[-0.05em] font-space">5/7</span>
                  <span className="text-sm font-bold text-slate-400">dias</span>
                </div>
                <div className="flex gap-2 h-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex-1 rounded-full bg-[#f97316]" />
                  ))}
                  {[6, 7].map(i => (
                    <div key={i} className="flex-1 rounded-full bg-slate-100" />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Bento Row */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 poly-card p-10 flex items-center gap-8"
          >
            <div className="h-16 w-16 rounded-3xl bg-[#ecfdf5] flex items-center justify-center text-[#10b981]">
              <Star className="h-8 w-8 fill-[#10b981]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total de Pontos</span>
              <span className="text-4xl font-bold text-slate-950 tracking-[-0.05em] font-space">12,450</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 poly-card p-10 flex items-center justify-between bg-slate-950 text-white border-none"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-bold tracking-[-0.03em] font-space">Próxima Missão</h4>
              <p className="text-slate-400 text-sm font-medium">Ordering Coffee in Paris</p>
            </div>
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center">
              <ChevronRight className="h-6 w-6 text-white" />
            </div>
          </motion.div>

        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
