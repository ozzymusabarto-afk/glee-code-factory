import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Flame, Star, Plane, ChevronRight, LayoutGrid } from "lucide-react";
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
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] pb-32 md:pb-0 md:pl-20 font-jakarta selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header - Premium Clean */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white px-8 py-6 border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1976D2] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
             <LayoutGrid className="text-white h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#0D47A1] font-space">PolyBot</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-2xl border border-orange-100">
            <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
            <span className="text-lg font-black text-orange-700">7</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
            <Star className="h-5 w-5 text-[#1976D2] fill-[#1976D2]" />
            <span className="text-lg font-black text-[#1976D2]">42</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-12 w-12 overflow-hidden rounded-2xl border-2 border-white shadow-md cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-8 py-12">
        {/* Welcome Section - Focused on official Mascot */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[32px] shadow-2xl shadow-blue-900/5 relative overflow-hidden border border-slate-50">
           <div className="flex flex-col gap-6 relative z-10 max-w-lg">
             <div className="space-y-2">
               <motion.span 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-poly-blue font-black uppercase tracking-[0.2em] text-sm"
               >
                 Tutor Inteligente
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="text-6xl font-black text-[#0D47A1] tracking-tighter leading-none"
               >
                 Olá, Adriana! 👋
               </motion.h2>
             </div>
             <p className="text-xl font-medium text-slate-500 leading-relaxed">
               Vamos continuar nossa jornada? O PolyBot preparou uma missão incrível para você hoje!
             </p>
             <div className="flex gap-4 mt-2">
                <Button className="bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black px-10 py-8 rounded-2xl text-xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                  CONTINUAR MISSÃO
                </Button>
             </div>
           </div>
           
           {/* Official Mascot - 70% area focus */}
           <div className="relative z-10 w-full md:w-[450px] flex justify-center items-center">
              <PolyMascot size="full" pose="waving" className="drop-shadow-2xl" />
              {/* Voice bubble from Poly */}
              <div className="absolute -top-4 -right-4 bg-poly-blue text-white px-6 py-4 rounded-3xl rounded-br-none font-bold shadow-xl border-4 border-white animate-bounce-slow">
                Ready to start? 🚀
              </div>
           </div>

           {/* Decorative background shape */}
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
        </section>

        {/* Mission of the Day */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between px-4">
             <h3 className="text-2xl font-black text-[#0D47A1] tracking-tight uppercase tracking-widest text-sm">Missão do Dia</h3>
             <span className="text-[#1976D2] font-bold text-sm">Ver todas</span>
          </div>
          
          <motion.div 
            whileHover={{ y: -8 }}
            className="relative overflow-hidden rounded-[32px] min-h-[550px] flex flex-col justify-end p-12 group cursor-pointer shadow-2xl border border-slate-100"
            onClick={() => navigate({ to: "/missions/airport" })}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200" 
                alt="Airport" 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D47A1] via-[#0D47A1]/40 to-transparent" />
            </div>
            
            <div className="relative z-20 flex flex-col gap-8 w-full max-w-xl">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full px-5 py-2 bg-white/20 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
                    SITUAÇÃO REAL
                  </span>
                  <span className="flex items-center gap-2 rounded-full px-5 py-2 bg-yellow-400 text-[#0D47A1] text-xs font-black uppercase tracking-widest shadow-lg">
                    <Plane className="h-4 w-4" /> 10 MIN
                  </span>
                </div>
                <h4 className="text-6xl font-black leading-[0.9] tracking-tighter text-white font-space">
                  LOST AT THE AIRPORT
                </h4>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mt-2">
                   <h5 className="text-white font-black mb-3 uppercase tracking-widest text-xs opacity-60">O que você vai aprender:</h5>
                   <ul className="space-y-3">
                      {["Perguntar informações", "Entender direções", "Explicar onde precisa ir"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-bold text-lg">
                           <div className="h-2 w-2 rounded-full bg-yellow-400" />
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>

              <Button className="bg-white hover:bg-slate-50 text-[#1976D2] font-black py-10 rounded-2xl text-2xl shadow-2xl active:scale-95 transition-all group-hover:scale-105">
                VAMOS COMEÇAR! 🚀
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Weekly Stats Bento-ish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-50 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                 <h4 className="text-xl font-black text-[#0D47A1]">META SEMANAL</h4>
                 <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
              </div>
              <div className="flex flex-col gap-4">
                 <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-[#0D47A1] tracking-tighter">5/7</span>
                    <span className="text-xl font-bold text-slate-400 uppercase tracking-widest text-sm">Dias</span>
                 </div>
                 <div className="flex gap-3 h-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex-1 rounded-full bg-orange-500 shadow-md shadow-orange-200" />
                    ))}
                    {[6, 7].map(i => (
                      <div key={i} className="flex-1 rounded-full bg-slate-100" />
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-[#1976D2] p-10 rounded-[32px] shadow-xl shadow-blue-500/20 flex items-center justify-between relative overflow-hidden group cursor-pointer" onClick={() => navigate({ to: "/progress" })}>
              <div className="flex flex-col gap-2 relative z-10">
                 <h4 className="text-white/60 font-black text-xs uppercase tracking-[0.2em]">Sua evolução</h4>
                 <span className="text-5xl font-black text-white tracking-tighter">NÍVEL 12</span>
                 <p className="text-blue-100 font-medium">Veja seu mapa de habilidades</p>
              </div>
              <div className="relative z-10 bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/20 group-hover:rotate-12 transition-transform">
                 <ChevronRight className="h-10 w-10 text-white" />
              </div>
              {/* Decorative Mascot in BG */}
              <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                 <PolyMascot size="xl" />
              </div>
           </div>
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}
