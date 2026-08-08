import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  const { appMode, setAppMode, skillLevel, setSkillLevel, displayName, setDisplayName, syncProfile } = useAppStore();
  const [step, setStep] = useState<'auth' | 'checkin' | 'tutorial' | 'ready'>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAuthenticated(false);
        setStep('auth');
      } else {
        setIsAuthenticated(true);
        await syncProfile();
        // Determine step based on profile completeness
        const { data: profile } = await supabase
          .from('profiles')
          .select('app_mode, display_name, skill_level')
          .eq('id', session.user.id)
          .single();

        if (profile?.display_name && profile?.app_mode) {
          setStep('ready');
        } else {
          setStep('checkin');
        }
      }
    };
    checkAuth();
  }, [syncProfile]);

  const { isListening, transcript, startListening, stopListening, supported } = useSpeechRecognition({
    lang: 'en-US',
  });

  useEffect(() => {
    if (step === 'tutorial' && transcript.toLowerCase().includes('hello')) {
      toast.success("Voz validada! Bem-vindo à Sala Principal.");
      setTimeout(() => setStep('ready'), 1500);
    }
  }, [transcript, step]);

  if (isAuthenticated === null) return null;

  if (step === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-6 font-jakarta">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 space-y-8 text-center"
        >
          <div className="w-20 h-20 bg-[#1976D2] rounded-3xl mx-auto flex items-center justify-center shadow-lg mb-6">
             <PolyMascot size="sm" pose="neutral" />
          </div>
          <h1 className="text-4xl font-black text-[#0D47A1] tracking-tight uppercase font-space">Hall de Entrada</h1>
          <p className="text-slate-500 font-medium">Conecte-se para começar seu Método Natural.</p>
          <Button 
            onClick={() => navigate({ to: "/auth" })}
            className="w-full py-8 rounded-2xl bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3"
          >
            ENTRAR / CADASTRAR
            <ArrowRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (step === 'checkin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FA] p-8 font-jakarta">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-lg w-full bg-white p-12 rounded-[40px] shadow-xl"
        >
          <div className="w-24 h-24 mx-auto mb-4">
            <PolyMascot size="full" pose="explaining" />
          </div>
          
          {!displayName ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-[#0D47A1]">Como devo te chamar?</h2>
              <Input 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome"
                className="py-8 px-6 text-xl rounded-2xl border-2 border-slate-100 focus:border-blue-500 transition-all text-center font-bold"
              />
              <Button 
                onClick={() => setDisplayName(userName)}
                disabled={!userName.trim()}
                className="w-full py-8 text-xl font-black rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                CONFIRMAR
              </Button>
            </div>
          ) : !appMode ? (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#0D47A1]">Olá {displayName}! Qual seu estilo?</h2>
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => setAppMode('adult')}
                  className="poly-card flex flex-col items-center gap-4 p-8 hover:border-cyan-500 bg-slate-900 text-white"
                >
                  <User size={32} className="text-cyan-500" />
                  <div className="text-center">
                    <span className="text-xl font-black block">Adulto</span>
                    <span className="text-[10px] opacity-60">Premium / Dark</span>
                  </div>
                </button>
                <button 
                  onClick={() => setAppMode('kids')}
                  className="poly-card flex flex-col items-center gap-4 p-8 hover:border-green-500 bg-yellow-400 text-blue-900"
                >
                  <Baby size={32} />
                  <div className="text-center">
                    <span className="text-xl font-black block">Kids</span>
                    <span className="text-[10px] opacity-60">Vibrante / Roblox</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#0D47A1]">Qual seu nível inicial?</h2>
              <div className="grid gap-4">
                <Button 
                  onClick={() => { setSkillLevel(1); setStep('tutorial'); }}
                  className="py-10 rounded-[28px] bg-slate-50 hover:bg-white text-[#0D47A1] border-2 border-slate-100 flex flex-col items-start px-8"
                >
                  <span className="text-xl font-black">Nível 1: Sobrevivência</span>
                  <span className="text-xs font-medium opacity-60">Frases básicas e saudações</span>
                </Button>
                <Button 
                  onClick={() => { setSkillLevel(2); setStep('tutorial'); }}
                  className="py-10 rounded-[28px] bg-slate-50 hover:bg-white text-[#0D47A1] border-2 border-slate-100 flex flex-col items-start px-8"
                >
                  <span className="text-xl font-black">Nível 2: Prática Ativa</span>
                  <span className="text-xs font-medium opacity-60">Aeroporto, Hotel e Situações</span>
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (step === 'tutorial') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-8 font-jakarta text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-10 max-w-md w-full"
        >
          <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
            <PolyMascot size="full" pose="neutral" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight">Tutorial Invisível</h1>
            <p className="text-blue-100 font-medium text-lg">
              Para entrar na Sala Principal, segure o microfone e diga <span className="text-white font-black italic">"Hello"</span>.
            </p>
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <button 
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                isListening ? "bg-white text-blue-600 scale-110" : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Mic size={40} className={cn(isListening && "animate-pulse")} />
            </button>
            <p className="text-xs font-black uppercase tracking-widest opacity-60">
              {isListening ? "PROCESSANDO..." : "SEGURE PARA FALAR"}
            </p>
            {transcript && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 p-4 rounded-xl backdrop-blur-sm"
              >
                "{transcript}"
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return <MainApp />;
}

function MainApp() {
  const { appMode, displayName } = useAppStore();
  const navigate = useNavigate();
  const isAdult = appMode === 'adult';

  const rooms = [
    { id: 'survival', title: 'Sobrevivência', desc: 'Saudações e o básico', level: 1, color: 'poly-blue' },
    { id: 'airport', title: 'Aeroporto', desc: 'Imigração e passaporte', level: 2, color: 'poly-navy' },
    { id: 'restaurant', title: 'Restaurante', desc: 'Pedindo comida', level: 2, color: 'poly-green' },
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-jakarta",
      isAdult ? "bg-[#0F172A] text-slate-100" : "bg-[#F5F7FA] text-[#0D47A1]"
    )}>
      <header className={cn(
        "p-8 sticky top-0 z-30 flex items-center justify-between border-b backdrop-blur-md",
        isAdult ? "bg-[#0F172A]/80 border-slate-800" : "bg-white/80 border-slate-100"
      )}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10">
            <PolyMascot size="full" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase font-space tracking-tighter">Sala Principal</h1>
            <p className="text-[10px] font-bold opacity-60">Olá, {displayName}!</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate({ to: '/profile' })}
          className="rounded-2xl p-2"
        >
          <User size={24} />
        </Button>
      </header>

      <main className="p-8 max-w-4xl mx-auto space-y-8">
        <section className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Situações Disponíveis</h2>
          <div className="grid gap-6">
            {rooms.map((room) => (
              <button 
                key={room.id}
                onClick={() => navigate({ to: `/chat/${room.id}` })}
                className={cn(
                  "poly-card flex items-center justify-between group text-left border-none",
                  isAdult ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:shadow-2xl"
                )}
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-[1.25rem] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                    isAdult ? "bg-cyan-600" : "bg-blue-600"
                  )}>
                    <MessageSquare size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{room.title}</h3>
                    <p className="text-sm font-medium opacity-60">{room.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    isAdult ? "bg-cyan-500/10 text-cyan-500" : "bg-blue-100 text-blue-600"
                  )}>Nível {room.level}</span>
                  <ArrowRight size={24} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Keeping the existing Onboarding function but redirecting or hiding it if we moved logic to AppEntry
function Onboarding() {
  return null; // Logic handled in AppEntry
}




function Onboarding() {
  const navigate = useNavigate();
  const { appMode, setAppMode, syncProfile } = useAppStore();

  useEffect(() => {
    syncProfile();
  }, [syncProfile]);
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

      <footer className="w-full py-8 px-8 flex justify-center items-center">
        <button 
          onClick={() => navigate({ to: "/privacy" })}
          className={cn(
            "text-sm font-bold opacity-50 hover:opacity-100 transition-opacity",
            isAdult ? "text-slate-400" : "text-slate-500"
          )}
        >
          POLÍTICA DE PRIVACIDADE
        </button>
      </footer>

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

      <button 
        onClick={() => navigate({ to: "/profile" })}
        className={cn(
          "fixed top-8 left-8 z-50 p-3 rounded-2xl border transition-all active:scale-95",
          isAdult ? "bg-slate-800 border-slate-700 text-cyan-500" : "bg-white border-slate-200 text-[#1976D2]"
        )}
      >
        <User size={24} />
      </button>

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

