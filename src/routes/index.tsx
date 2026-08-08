import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Mic, 
  MessageSquare, 
  User, 
  Baby, 
  BookOpen, 
  Layout, 
  Settings, 
  History 
} from "lucide-react";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/hooks/use-app-store";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: AppEntry,
  head: () => ({
    title: "PolyBot — Hall de Entrada",
    meta: [
      { name: "description", content: "Check-in interativo e acesso à Sala Principal do PolyBot." },
      { property: "og:title", content: "PolyBot — Hall de Entrada" },
      { property: "og:description", content: "Conecte-se e aprenda inglês com o Método Natural." },
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

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
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
