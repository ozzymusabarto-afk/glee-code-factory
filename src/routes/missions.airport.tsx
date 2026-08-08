import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  ArrowRight,
  Plane,
  Star,
  Zap,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { useAppStore } from "@/hooks/use-app-store";
import { useDailyTimer } from "@/hooks/use-daily-timer";
import { motion, AnimatePresence } from "framer-motion";


export const Route = createFileRoute("/missions/airport")({
  component: AirportMission,
  head: () => ({
    meta: [{ title: "Missão: Lost at the Airport — PolyBot" }],
  }),
});

type Step = "learn" | "practice" | "absorb" | "completed";

function AirportMission() {
  const [step, setStep] = useState<Step>("learn");
  const [progress, setProgress] = useState(33);
  const navigate = useNavigate();
  const { appMode } = useAppStore();
  const { isGoalReached, resetGoal, startTimer } = useDailyTimer();
  const isAdult = appMode === 'adult';

  useEffect(() => {
    startTimer();
  }, [startTimer]);


  useEffect(() => {
    switch(step) {
      case "learn": setProgress(33); break;
      case "practice": setProgress(66); break;
      case "absorb": setProgress(90); break;
      case "completed": setProgress(100); break;
    }
  }, [step]);


  return (
    <div className={cn(
      "flex min-h-screen flex-col transition-colors duration-500 overflow-hidden",
      isAdult ? "bg-[#0F172A]" : "bg-[#F5F7FA]"
    )}>
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
      {/* Header */}
      <header className={cn(
        "flex items-center justify-between px-6 py-5 border-b sticky top-0 z-30 shadow-sm transition-colors",
        isAdult ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
      )}>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => step === "learn" ? navigate({ to: "/" }) : setStep(step === "practice" ? "learn" : "practice")}
          className={cn(
            "rounded-2xl transition-colors",
            isAdult ? "text-cyan-500 hover:bg-slate-800" : "text-poly-navy bg-poly-cream/50"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1 px-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-poly-navy/60">
              {step === "learn" ? "Aprender 1/3" : step === "practice" ? "Praticar 2/3" : "Absorver 3/3"}
            </span>
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-sm transition-colors",
              isAdult ? "bg-slate-800 border-slate-700" : "bg-white border-border/50"
            )}>
              <Heart className="h-3 w-3 text-destructive fill-destructive" />
              <span className={cn("text-[10px] font-black", isAdult ? "text-white" : "text-poly-navy")}>5</span>
            </div>
          </div>
          <div className={cn(
            "h-2.5 w-full rounded-full overflow-hidden transition-colors",
            isAdult ? "bg-cyan-500/10" : "bg-poly-blue/10"
          )}>
             <div 
               className={cn(
                 "h-full transition-all duration-700 ease-out",
                 isAdult ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-poly-blue"
               )} 
               style={{ width: `${progress}%` }}
             />
          </div>

        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Content Area */}
      <main className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full relative z-10">
        {step === "learn" && <LearnStep onComplete={() => setStep("practice")} />}
        {step === "practice" && <PracticeStep onComplete={() => setStep("absorb")} />}
        {step === "absorb" && <AbsorbStep onComplete={() => setStep("completed")} />}
        {step === "completed" && <CompletedStep onFinish={() => navigate({ to: "/" })} />}
      </main>
    </div>
  );
}

function LearnStep({ onComplete }: { onComplete: () => void }) {
  const appMode = useAppStore((state) => state.appMode);
  const isAdult = appMode === 'adult';
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const dialogues = [
    { text: "Excuse me, where is gate A12?", audio: true },
    { text: "Go straight and turn right. It's next to the cafe.", audio: true },
    { text: "Thank you so much! Have a nice day.", audio: true },
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="space-y-1">
        <h2 className={cn("text-3xl font-black tracking-tight transition-colors", isAdult ? "text-white" : "text-poly-navy")}>
          {isAdult ? "Analise o diálogo 🧐" : "Ouça o diálogo 👂"}
        </h2>
        <p className={cn("text-lg font-bold leading-tight transition-colors", isAdult ? "text-slate-400" : "text-muted-foreground/80")}>
          {isAdult ? "Toque nas sentenças para ver a tradução e áudio." : "Toque nas frases para entender."}
        </p>

      </div>

      <div className={cn(
        "rounded-[32px] border p-8 relative overflow-hidden transition-all duration-500 shadow-xl",
        isAdult ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
      )}>
        <div className={cn(
          "aspect-[16/9] rounded-[24px] flex items-center justify-center relative overflow-hidden shadow-inner transition-colors",
          isAdult ? "bg-slate-900" : "bg-[#0D47A1]"
        )}>

           {/* Contextual Illustration Mockup */}
           <div className="absolute inset-0 bg-gradient-to-br from-poly-blue/40 to-transparent z-10" />
           <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <Plane className="h-48 w-48 text-white rotate-[15deg] scale-150" />
           </div>
           
           {/* Characters Scene - Replaced with official Mascot */}
           <div className="relative z-20 flex items-end justify-center gap-12 h-full pb-4">
              {/* Character 1 (User) */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full border-2 border-white/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Poly Mascot - Tutoring */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-48 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden">
                   <PolyMascot size="full" pose="explaining" />
                </div>
              </div>
           </div>
           
            <div className={cn(
              "absolute top-6 left-6 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md border transition-colors",
              isAdult ? "bg-cyan-500/20 border-cyan-500/30" : "bg-white/10 border-white/10"
            )}>
              <Star className={cn("h-3 w-3", isAdult ? "text-cyan-400 fill-cyan-400" : "text-poly-yellow fill-poly-yellow")} />
              <span className={cn("text-[10px] font-black uppercase tracking-widest", isAdult ? "text-cyan-400" : "text-white")}>GATE A12</span>
            </div>

        </div>
      </div>

      <div className="flex flex-col gap-4">
        {dialogues.map((d, i) => (
          <button 
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "flex items-center gap-5 p-8 bg-white rounded-[24px] text-left border-2 transition-all duration-300 group shadow-lg",
              activeIndex === i ? "border-[#1976D2] bg-blue-50/30 scale-[1.02]" : "border-slate-50 hover:border-blue-100"
            )}
          >
            <div className={cn(
              "h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300",
              activeIndex === i ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" : "bg-poly-blue/10 text-poly-blue group-hover:bg-poly-blue group-hover:text-white"
            )}>
              <Volume2 className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-xl font-black leading-tight transition-colors duration-300",
              activeIndex === i ? "text-poly-navy" : "text-poly-navy/80"
            )}>{d.text}</span>
          </button>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-white border-t border-slate-100 z-40 md:left-20">
        <div className="max-w-2xl mx-auto">
          <Button onClick={onComplete} className="bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black py-8 text-2xl w-full rounded-2xl shadow-xl shadow-blue-500/20">
            CONTINUAR 🚀
          </Button>
        </div>
      </div>
    </div>
  );
}

function PracticeStep({ onComplete }: { onComplete: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-6 duration-700 pb-20">
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-black text-poly-navy tracking-tight">Agora é sua vez! 🎙️</h2>
        <p className="text-lg font-bold text-muted-foreground/80 leading-tight">Repita a frase com clareza.</p>
      </div>

      <div className="poly-card bg-white border-none shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-10 flex flex-col items-center gap-8 text-center relative overflow-hidden">
        <div className="absolute -top-4 -right-10 opacity-20">
           <PolyMascot size="xl" pose="thinking" />
        </div>
        <div className="h-16 w-16 rounded-[1.5rem] bg-poly-blue/10 flex items-center justify-center text-poly-blue shadow-inner">
          <Volume2 className="h-8 w-8" />
        </div>
        <h3 className="text-4xl font-black text-poly-navy leading-[1.1] tracking-tight max-w-sm">
          "Excuse me, where is gate A12?"
        </h3>
      </div>

      <div className="flex flex-col items-center gap-10 py-4">
        {/* Visual Waveform Mockup with blue/purple gradient */}
        <div className="flex items-center gap-2 h-24 w-full max-w-md px-6">
          {[0.2, 0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9, 1, 0.6, 0.4, 0.3, 0.5, 0.8, 0.6, 0.4].map((h, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-full transition-all duration-500",
                isRecording 
                  ? "bg-gradient-to-t from-poly-blue to-purple-500 animate-pulse" 
                  : "bg-poly-blue/10"
              )}
              style={{ 
                height: `${h * 100}%`, 
                animationDelay: `${i * 0.05}s`,
                opacity: isRecording ? 1 : 0.3
              }}
            />
          ))}
        </div>

        <div className="relative">
           <div className={cn(
             "absolute inset-0 bg-poly-blue rounded-full blur-3xl opacity-0 transition-opacity duration-500",
             isRecording && "opacity-40"
           )} />
           <button 
             onMouseDown={() => setIsRecording(true)}
             onMouseUp={() => { setIsRecording(false); setHasRecorded(true); }}
             className={cn(
               "h-32 w-32 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform active:scale-90 relative z-10",
               isRecording 
                ? "bg-destructive scale-110 shadow-destructive/40" 
                : "bg-poly-blue hover:bg-poly-blue/95 hover:scale-105 shadow-poly-blue/30"
             )}
           >
             {isRecording ? (
               <div className="w-8 h-8 bg-white rounded-lg animate-pulse" />
             ) : (
               <Mic className="h-14 w-14 fill-white" />
             )}
           </button>
        </div>

        <p className="text-base font-black text-poly-navy/40 uppercase tracking-[0.2em]">
           {isRecording ? "Gravando..." : "Segure para falar"}
        </p>

        <div className="flex gap-4 w-full pt-4">
          <Button variant="ghost" className="flex-1 text-muted-foreground/60 font-black uppercase text-xs tracking-widest hover:text-poly-navy hover:bg-transparent">
            PULAR
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground/60 font-black uppercase text-xs tracking-widest hover:text-poly-navy hover:bg-transparent">
            NÃO SEI
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-8 bg-white border-t border-slate-100 z-40 md:left-20">
        <div className="max-w-2xl mx-auto">
          {hasRecorded && (
            <Button 
              onClick={onComplete} 
              className="bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black py-8 text-2xl w-full rounded-2xl shadow-xl shadow-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              AVANÇAR 🚀
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function AbsorbStep({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-poly-navy tracking-tight">Vamos revisar! 🧠</h2>
        <p className="text-lg font-bold text-muted-foreground/80 leading-tight">Escolha a resposta certa.</p>
      </div>

      <div className="poly-card bg-poly-blue/5 border-2 border-poly-blue/10 p-8 flex items-center gap-6 shadow-none">
        <div className="h-14 w-14 rounded-2xl bg-poly-blue text-white flex items-center justify-center shadow-lg shadow-poly-blue/20 shrink-0">
          <Volume2 className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-black text-poly-navy leading-tight">
          "Where is the gate?"
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {[
          "It's next to the cafe.",
          "I don't know.",
          "Yes, it is."
        ].map((ans, i) => (
          <button 
            key={i}
            onClick={() => setSelected(i)}
            disabled={selected !== null}
            className={cn(
              "p-8 text-left border-[3px] rounded-[2.5rem] transition-all duration-300 group relative",
              selected === i 
                ? i === 0 
                  ? "bg-poly-green/10 border-poly-green shadow-lg shadow-poly-green/10" 
                  : "bg-destructive/10 border-destructive shadow-lg shadow-destructive/10"
                : "bg-white border-transparent hover:border-poly-blue/20 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            )}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-xl font-black",
                selected === i ? "text-poly-navy" : "text-poly-navy/80"
              )}>{ans}</span>
              {selected === i && (
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-white",
                  i === 0 ? "bg-poly-green" : "bg-destructive"
                )}>
                  {i === 0 ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-4 w-1 bg-white rounded-full rotate-45 relative before:content-[''] before:absolute before:inset-0 before:bg-white before:rounded-full before:-rotate-90" />}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="animate-in zoom-in-95 duration-500">
           <section className="poly-card bg-white border-none shadow-xl flex items-center gap-6 py-6 px-8 relative overflow-visible mt-6">
             <div className="absolute -top-24 -left-10 w-44 h-44 drop-shadow-xl">
                <PolyMascot size="full" pose={selected === 0 ? "celebrating" : "thinking"} />
             </div>
             <div className="pl-20">
               <p className="text-lg font-black text-poly-navy leading-tight">
                 {selected === 0 
                   ? "Isso aí! Você está lembrando muito bem. 🌟" 
                   : "Não foi dessa vez, mas Poly te ajuda a tentar de novo!"}
               </p>
             </div>
           </section>

           <Button 
             onClick={onComplete} 
             className={cn(
               "py-8 text-xl w-full mt-8 shadow-2xl font-black uppercase tracking-widest rounded-[2rem]",
               selected === 0 ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white" : "bg-slate-200 text-slate-400"
             )}
           >
             {selected === 0 ? "CONCLUIR MISSÃO 🏆" : "CONTINUAR"}
           </Button>
        </div>
      )}
    </div>
  );
}

function CompletedStep({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="flex flex-col gap-10 animate-in zoom-in-95 duration-700 text-center py-6">
      <div className="relative mx-auto h-56 w-56 flex items-center justify-center">
        <div className="absolute inset-0 bg-poly-yellow/20 rounded-full animate-ping duration-[2000ms]" />
        <div className="absolute inset-4 bg-poly-yellow/30 rounded-full animate-pulse" />
        <div className="relative z-10 w-64 h-64 drop-shadow-2xl">
           <PolyMascot size="full" pose="celebrating" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-5xl font-black text-poly-navy tracking-tighter leading-none">VOCÊ CONSEGUIU! 🎉</h2>
        <p className="text-xl font-bold text-muted-foreground/80">Missão cumprida com sucesso.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10 flex flex-col items-center gap-10 relative overflow-hidden">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/10" />
            <circle cx="80" cy="80" r="72" stroke="url(#progressGradient)" strokeWidth="12" fill="transparent" strokeDasharray={452} strokeDashoffset={452 * (1 - 0.85)} className="transition-all duration-[1500ms] ease-out drop-shadow-md" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-poly-navy tracking-tighter">85%</span>
            <span className="text-[10px] font-black uppercase text-poly-green tracking-widest mt-1">Excelente!</span>
          </div>
        </div>

        <div className="w-full space-y-4">
          {[
            { label: "Estrutura", stars: 4 },
            { label: "Pronúncia", stars: 5 },
            { label: "Fluência", stars: 4 }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-poly-navy/60 uppercase tracking-widest">{item.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={cn("h-4 w-4", s <= item.stars ? "text-poly-yellow fill-poly-yellow" : "text-muted/20")} />
                  ))}
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                 <div className="h-full bg-poly-blue/40 rounded-full" style={{ width: `${(item.stars/5)*100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Poly Feedback Bubble */}
        <div className="flex items-center gap-4 bg-poly-blue/5 p-4 rounded-3xl border border-poly-blue/10 w-full mt-2">
          <div className="shrink-0">
            <PolyMascot size="sm" expression="proud" />
          </div>
          <p className="text-sm font-bold text-poly-navy leading-tight text-left">
            "Quase perfeito! Tente pronunciar o 'where' com o 'r' mais leve."
          </p>
        </div>
      </div>

      {/* Progress Map (Radar Chart Mockup) */}
      <div className="poly-card bg-poly-navy border-none p-6 text-white overflow-hidden relative">
        <h4 className="text-xs font-black uppercase tracking-widest text-white/60 mb-6 text-left">MEU MAPA DE PROGRESSO</h4>
        <div className="aspect-square w-full max-w-[240px] mx-auto relative">
          {/* Hexagon Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
             <div className="w-full h-full border border-white/40 clip-path-hexagon scale-100" />
             <div className="absolute w-full h-full border border-white/20 clip-path-hexagon scale-75" />
             <div className="absolute w-full h-full border border-white/20 clip-path-hexagon scale-50" />
             <div className="absolute w-full h-full border border-white/20 clip-path-hexagon scale-25" />
          </div>
          
          {/* Radar Labels */}
          <div className="absolute inset-0 text-[8px] font-black tracking-tighter uppercase opacity-80">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">Falar</span>
            <span className="absolute top-1/4 right-0 translate-x-4">Compreender</span>
            <span className="absolute bottom-1/4 right-0 translate-x-4">Conversar</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">Trabalho</span>
            <span className="absolute bottom-1/4 left-0 -translate-x-4">Vida Real</span>
            <span className="absolute top-1/4 left-0 -translate-x-4">Viajar</span>
          </div>

          {/* Radar Data Polygon Mockup */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3/4 h-3/4 bg-poly-blue/40 border-2 border-poly-blue clip-path-radar-mockup" />
          </div>
        </div>
      </div>

      <Button onClick={onFinish} className="bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black py-8 text-2xl w-full rounded-2xl shadow-xl shadow-blue-500/20">
        VOLTAR AO INÍCIO 🏠
      </Button>
    </div>
  );
}

// Add these to src/styles.css if not exists, but for now using inline styles approach or assuming global utilities

