import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Mic, ArrowRight, User, Baby } from "lucide-react";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/hooks/use-app-store";
import { useDailyTimer } from "@/hooks/use-daily-timer";

export const Route = createFileRoute("/")({
  component: AppEntry,
  head: () => ({
    title: "PolyBot — Aprenda inglês para a vida real",
    meta: [
      { name: "description", content: "Missões curtas, conversas reais e progresso diário com o seu tutor PolyBot." },
      { property: "og:title", content: "PolyBot — Aprenda inglês para a vida real" },
      { property: "og:description", content: "Aprenda inglês com situações reais e o tutor Poly." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AppEntry() {
  const { appMode, setAppMode } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F7FA] p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-md w-full"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-[#0D47A1] tracking-tight">
              Quem vai dominar um novo idioma hoje?
            </h1>
            <p className="text-slate-500 font-medium">Escolha seu modo de estudo</p>
          </div>

          <div className="grid gap-6">
            <button 
              onClick={() => { setAppMode('adult'); setShowOnboarding(false); }}
              className="poly-card group flex flex-col items-center gap-4 p-10 hover:border-cyan-500 transition-colors"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-900 text-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <User size={40} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-900">Modo Adulto</h3>
                <p className="text-sm text-slate-500">Foco e performance</p>
              </div>
            </button>

            <button 
              onClick={() => { setAppMode('kids'); setShowOnboarding(false); }}
              className="poly-card group flex flex-col items-center gap-4 p-10 hover:border-green-500 transition-colors"
            >
              <div className="w-20 h-20 rounded-3xl bg-yellow-400 text-blue-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Baby size={40} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black text-blue-900">Modo Kids</h3>
                <p className="text-sm text-slate-500">Diversão e aventura</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <Onboarding />;
}



function Onboarding() {
  const navigate = useNavigate();
  const { appMode } = useAppStore();
  const { isGoalReached, resetGoal, startTimer } = useDailyTimer();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const isAdult = appMode === 'adult';


  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-[#1976D2]" />,
      text: "10 minutos por dia",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#1976D2]" />,
      text: "Situações do cotidiano",
    },
    {
      icon: <Mic className="h-6 w-6 text-[#1976D2]" />,
      text: "Pronúncia e conversação",
    },
  ];

  return (
    <div className={cn(
      "flex min-h-screen flex-col transition-colors duration-500 font-jakarta overflow-hidden",
      isAdult ? "bg-[#0F172A] selection:bg-cyan-900" : "bg-[#FFFDE7] selection:bg-blue-100"
    )}>
      {/* Top Logo */}
      <header className="pt-10 pb-6 flex justify-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
            isAdult ? "bg-cyan-500 shadow-cyan-500/20" : "bg-[#1976D2] shadow-blue-200"
          )}>
             <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <div className={cn("w-3 h-3 rounded-full", isAdult ? "bg-cyan-500" : "bg-[#1976D2]")} />
             </div>
          </div>
          <h1 className={cn(
            "text-2xl font-black tracking-tight font-space uppercase",
            isAdult ? "text-cyan-500" : "text-[#0D47A1]"
          )}>PolyBot</h1>
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col px-8 relative z-10 max-w-2xl mx-auto w-full py-20">
        {/* Title Section */}
        <section className="mt-12 space-y-4 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-5xl md:text-6xl font-black tracking-tighter leading-[1.1]",
              isAdult ? "text-white" : "text-[#0D47A1]"
            )}
          >
            {isAdult ? "Foco total na meta, vamos começar?" : "Oi amiguinho! Pronto para uma nova aventura? 🚀"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "text-xl md:text-2xl font-medium leading-relaxed max-w-lg mx-auto md:mx-0",
              isAdult ? "text-slate-400" : "text-slate-500"
            )}
          >
            Missões curtas, conversas reais e progresso diário.
          </motion.p>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 space-y-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className={cn(
                "flex items-center gap-6 p-6 rounded-[28px] shadow-sm border transition-all",
                isAdult 
                  ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" 
                  : "bg-white border-slate-100 text-[#0D47A1] hover:shadow-md"
              )}
            >
              <div className={cn(
                "w-12 h-12 flex items-center justify-center rounded-2xl",
                isAdult ? "bg-cyan-500/10 text-cyan-500" : "bg-blue-50 text-[#1976D2]"
              )}>
                {benefit.icon}
              </div>
              <span className="text-xl font-bold">{benefit.text}</span>
            </motion.div>
          ))}
        </section>

        {/* Spacer */}
        <div className="h-24" />
        
        {/* Centralized Action Button */}
        <div className="flex justify-center w-full mb-20">
          <Button 
            onClick={() => navigate({ to: "/missions" })}
            className={cn(
              "text-white font-black py-10 rounded-[28px] text-2xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 w-full max-w-[300px]",
              isAdult ? "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20" : "bg-[#1976D2] hover:bg-[#0D47A1] shadow-blue-500/20"
            )}
          >
            COMEÇAR AGORA
            <ArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </main>

      {/* Mascot */}
      <div className="fixed bottom-0 right-[-2%] md:right-[2%] w-[45%] md:w-[35%] max-w-[450px] pointer-events-none z-0">
        <PolyMascot size="full" className="origin-bottom" expression={isAdult ? "focused" : "excited"} />
      </div>

      <AnimatePresence>
        {isGoalReached && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn(
                "w-full max-w-md poly-card p-10 flex flex-col items-center text-center gap-8",
                isAdult ? "bg-slate-900 border-cyan-500/50" : "bg-white border-blue-500/50"
              )}
            >
              <div className="w-32 h-32">
                <PolyMascot size="full" pose="celebrating" />
              </div>
              <div className="space-y-4">
                <h2 className={cn(
                  "text-4xl font-black tracking-tight",
                  isAdult ? "text-white" : "text-[#0D47A1]"
                )}>Meta Diária Atingida! 🏆</h2>
                <p className={cn(
                  "text-lg font-medium",
                  isAdult ? "text-slate-400" : "text-slate-500"
                )}>
                  Parabéns! Você completou seus 10 minutos de treino hoje.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <Button 
                  onClick={() => navigate({ to: "/missions" })}
                  className={cn(
                    "w-full py-8 text-xl font-black rounded-2xl",
                    isAdult ? "bg-cyan-600 hover:bg-cyan-500 text-white" : "bg-poly-blue hover:bg-poly-navy text-white"
                  )}
                >
                  FINALIZAR DIA
                </Button>
                <Button 
                  variant="ghost"
                  onClick={resetGoal}
                  className={cn(
                    "w-full py-6 font-bold",
                    isAdult ? "text-cyan-500 hover:bg-cyan-500/10" : "text-poly-blue hover:bg-blue-50"
                  )}
                >
                  REVISÃO LIVRE
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Switcher Button (Config) */}
      <button 
        onClick={() => setAppMode(isAdult ? 'kids' : 'adult')}
        className={cn(
          "fixed top-8 right-8 z-50 p-3 rounded-2xl border transition-all active:scale-95",
          isAdult ? "bg-slate-800 border-slate-700 text-cyan-500" : "bg-white border-slate-200 text-[#1976D2]"
        )}
      >
        {isAdult ? <Baby size={24} /> : <User size={24} />}
      </button>

      {/* Decorative background shapes */}
      <div className={cn(
        "fixed -top-24 -left-24 w-96 h-96 rounded-full blur-3xl -z-10",
        isAdult ? "bg-cyan-900/20" : "bg-blue-100/30"
      )} />
      <div className={cn(
        "fixed top-1/2 -right-24 w-64 h-64 rounded-full blur-3xl -z-10",
        isAdult ? "bg-cyan-950/30" : "bg-blue-50/50"
      )} />
    </div>
  );
}

