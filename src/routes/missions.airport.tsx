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

  useEffect(() => {
    switch(step) {
      case "learn": setProgress(33); break;
      case "practice": setProgress(66); break;
      case "absorb": setProgress(90); break;
      case "completed": setProgress(100); break;
    }
  }, [step]);

  return (
    <div className="flex min-h-screen flex-col bg-poly-cream overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-30">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => step === "learn" ? navigate({ to: "/" }) : setStep(step === "practice" ? "learn" : "practice")}
          className="rounded-2xl text-poly-navy bg-poly-cream/50"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1 px-8 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-poly-navy/60">
              {step === "learn" ? "Aprender 1/3" : step === "practice" ? "Praticar 2/3" : "Absorver 3/3"}
            </span>
            <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full border border-border/50 shadow-sm">
              <Heart className="h-3 w-3 text-destructive fill-destructive" />
              <span className="text-[10px] font-black text-poly-navy">5</span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-poly-blue/10 rounded-full overflow-hidden">
             <div 
               className="h-full bg-poly-blue transition-all duration-700 ease-out" 
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
  const dialogues = [
    { text: "Excuse me, where is gate A12?", audio: true, emphasis: true },
    { text: "Go straight and turn right. It's next to the cafe.", audio: true },
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-poly-navy tracking-tight">Ouça o diálogo 👂</h2>
        <p className="text-lg font-bold text-muted-foreground/80 leading-tight">Preste atenção na pronúncia.</p>
      </div>

      <div className="poly-card bg-poly-navy/5 border-none p-4 relative overflow-hidden group">
        <div className="aspect-[16/10] rounded-[2rem] bg-poly-navy flex items-center justify-center relative overflow-hidden shadow-2xl">
           {/* Contextual Illustration Mockup */}
           <div className="absolute inset-0 bg-gradient-to-br from-poly-blue/40 to-transparent z-10" />
           <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <Plane className="h-48 w-48 text-white rotate-[15deg] scale-150" />
           </div>
           
           {/* Characters Scene */}
           <div className="relative z-20 flex items-end justify-center gap-12 h-full pb-8">
              <div className="w-16 h-28 bg-white/10 rounded-t-full border-t-2 border-white/20 backdrop-blur-sm" />
              <div className="w-20 h-36 bg-poly-blue rounded-t-[2.5rem] shadow-[0_0_30px_rgba(37,99,235,0.4)] border-t-4 border-white/30 flex flex-col items-center pt-6">
                 <div className="w-12 h-1 bg-white/20 rounded-full mb-4" />
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
              </div>
           </div>
           
           <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <Star className="h-3 w-3 text-poly-yellow fill-poly-yellow" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">GATE A12</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {dialogues.map((d, i) => (
          <button 
            key={i}
            className={cn(
              "flex items-center gap-5 p-6 bg-white rounded-[2rem] text-left border-2 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.02)]",
              d.emphasis ? "border-poly-blue/30 bg-poly-blue/5" : "border-transparent hover:border-poly-blue/20"
            )}
          >
            <div className={cn(
              "h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300",
              d.emphasis ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" : "bg-poly-blue/10 text-poly-blue group-hover:bg-poly-blue group-hover:text-white"
            )}>
              <Volume2 className="h-6 w-6" />
            </div>
            <span className={cn(
              "text-xl font-black leading-tight",
              d.emphasis ? "text-poly-navy" : "text-poly-navy/80"
            )}>{d.text}</span>
          </button>
        ))}
      </div>

      <Button onClick={onComplete} className="poly-button-primary py-8 text-xl mt-4">
        CONTINUAR 🚀
      </Button>
    </div>
  );
}

function PracticeStep({ onComplete }: { onComplete: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-6 duration-700">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-poly-navy tracking-tight">Agora é sua vez! 🎙️</h2>
        <p className="text-lg font-bold text-muted-foreground/80 leading-tight">Repita a frase com clareza.</p>
      </div>

      <div className="poly-card bg-white border-none shadow-[0_30px_60px_rgba(0,0,0,0.05)] p-10 flex flex-col items-center gap-8 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5">
           <PolyMascot size="lg" />
        </div>
        <div className="h-16 w-16 rounded-[1.5rem] bg-poly-blue/10 flex items-center justify-center text-poly-blue shadow-inner">
          <Volume2 className="h-8 w-8" />
        </div>
        <h3 className="text-4xl font-black text-poly-navy leading-[1.1] tracking-tight max-w-sm">
          "Excuse me, where is gate A12?"
        </h3>
      </div>

      <div className="flex flex-col items-center gap-10 py-4">
        {/* Visual Waveform Mockup */}
        <div className="flex items-center gap-1.5 h-20 w-full max-w-sm px-6">
          {[0.2, 0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9, 1, 0.6, 0.4, 0.3, 0.5, 0.8, 0.6, 0.4].map((h, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-full transition-all duration-500",
                isRecording ? "bg-poly-blue animate-pulse" : "bg-poly-blue/20"
              )}
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.05}s` }}
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
             {isRecording ? <div className="w-8 h-8 bg-white rounded-lg animate-pulse" /> : <Mic className="h-14 w-14" />}
           </button>
        </div>

        <p className="text-base font-black text-poly-navy/40 uppercase tracking-[0.2em]">
           {isRecording ? "Gravando..." : "Segure para falar"}
        </p>

        <div className="flex gap-4 w-full pt-4">
          <Button variant="ghost" className="flex-1 text-muted-foreground/60 font-black uppercase text-[10px] tracking-widest border border-border/50 rounded-[1.25rem] py-8 bg-white/50">
            PULAR
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground/60 font-black uppercase text-[10px] tracking-widest border border-border/50 rounded-[1.25rem] py-8 bg-white/50">
            NÃO SEI
          </Button>
        </div>
      </div>

      {hasRecorded && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <Button onClick={onComplete} className="poly-button-primary py-8 text-xl w-full shadow-2xl">
             AVANÇAR 🚀
           </Button>
        </div>
      )}
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
             <div className="absolute -top-14 -left-6">
                <PolyMascot size="md" expression={selected === 0 ? "excited" : "thinking"} />
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
               selected === 0 ? "poly-button-primary bg-poly-green" : "bg-muted text-muted-foreground/60"
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
        <div className="relative z-10 scale-125">
           <PolyMascot size="lg" expression="excited" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-5xl font-black text-poly-navy tracking-tighter leading-none">VOCÊ CONSEGUIU! 🎉</h2>
        <p className="text-xl font-bold text-muted-foreground/80">Missão cumprida com sucesso.</p>
      </div>

      <div className="poly-card bg-white border-none shadow-2xl p-10 flex flex-col items-center gap-10">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/10" />
            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={452} strokeDashoffset={452 * (1 - 0.85)} className="text-poly-green transition-all duration-[1500ms] ease-out shadow-lg" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-poly-navy tracking-tighter">85%</span>
            <span className="text-[10px] font-black uppercase text-poly-green tracking-widest mt-1">Ecxelente!</span>
          </div>
        </div>

        <div className="w-full space-y-5">
          {[
            { label: "🗣️ Ask for directions", stars: 5 },
            { label: "👂 Understand directions", stars: 4 },
            { label: "💬 Real-world context", stars: 5 }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-poly-navy/60 uppercase tracking-widest">{item.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={cn("h-4 w-4", s <= item.stars ? "text-poly-yellow fill-poly-yellow shadow-sm" : "text-muted/20")} />
                  ))}
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                 <div className="h-full bg-poly-blue/40 rounded-full" style={{ width: `${(item.stars/5)*100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onFinish} className="poly-button-primary py-8 text-xl shadow-2xl">
        VOLTAR AO INÍCIO 🏠
      </Button>
    </div>
  );
}
