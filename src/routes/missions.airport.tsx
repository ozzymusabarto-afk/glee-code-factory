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
  Coffee,
  MapPin,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/missions/airport")({
  component: AirportMission,
  head: () => ({
    title: "Missão: Lost at the Airport — PolyBot",
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
      <header className="flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => step === "learn" ? navigate({ to: "/" }) : setStep(step === "practice" ? "learn" : "practice")}
          className="rounded-xl text-poly-navy"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex-1 px-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-poly-navy opacity-40">
              {step === "learn" ? "Aprender 1/3" : step === "practice" ? "Praticar 2/3" : "Absorver 3/3"}
            </span>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-destructive fill-destructive" />
              <span className="text-[10px] font-black text-poly-navy">5</span>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
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
    { text: "Excuse me, where is gate A12?", audio: true },
    { text: "Go straight and turn right. It's next to the cafe.", audio: true },
    { text: "Thank you so much!", audio: true }
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-poly-navy">Ouça o diálogo</h2>
        <p className="text-muted-foreground font-medium italic text-sm">Toque nas frases para entender.</p>
      </div>

      <div className="poly-card p-4 overflow-hidden relative">
        <div className="aspect-video rounded-2xl bg-poly-blue/5 flex items-center justify-center relative overflow-hidden">
           {/* Mock Illustration */}
           <div className="absolute inset-0 bg-gradient-to-br from-poly-blue/20 to-poly-purple/10" />
           <div className="relative z-10 flex gap-4 items-end justify-center h-full pt-8 px-4">
             {/* Simple shapes representing characters */}
             <div className="w-16 h-24 bg-poly-navy/20 rounded-t-full border-t-2 border-poly-navy/30" />
             <div className="w-20 h-32 bg-poly-blue rounded-t-full border-t-4 border-white/20 shadow-lg flex flex-col items-center pt-4">
                <div className="w-12 h-1 bg-white/20 rounded-full mb-2" />
                <div className="w-8 h-8 rounded-full bg-white/10" />
             </div>
           </div>
           <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-poly-navy/10 px-2 py-1">
             <Star className="h-3 w-3 text-poly-yellow fill-poly-yellow" />
             <span className="text-[10px] font-black text-poly-navy uppercase">Info</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {dialogues.map((d, i) => (
          <button 
            key={i}
            className="flex items-center gap-4 p-4 bg-white border border-border rounded-2xl text-left hover:border-poly-blue transition-colors group"
          >
            <div className="h-10 w-10 shrink-0 rounded-full bg-poly-blue/10 flex items-center justify-center text-poly-blue group-hover:bg-poly-blue group-hover:text-white transition-colors">
              <Volume2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-poly-navy">{d.text}</span>
          </button>
        ))}
      </div>

      <Button onClick={onComplete} className="poly-button-primary mt-4 py-6 text-xl">
        CONTINUAR
      </Button>
    </div>
  );
}

function PracticeStep({ onComplete }: { onComplete: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-poly-navy">Agora é sua vez!</h2>
        <p className="text-muted-foreground font-medium italic text-sm">Repita a frase abaixo</p>
      </div>

      <div className="poly-card p-6 flex flex-col items-center gap-6 text-center">
        <div className="h-12 w-12 rounded-full bg-poly-blue/10 flex items-center justify-center text-poly-blue">
          <Volume2 className="h-6 w-6" />
        </div>
        <h3 className="text-3xl font-black text-poly-navy leading-tight">
          Excuse me, where is gate A12?
        </h3>
      </div>

      <div className="flex flex-col items-center gap-8 py-8">
        {/* Visual Waveform Mockup */}
        <div className="flex items-center gap-1 h-16 w-full max-w-xs px-4">
          {[0.2, 0.4, 0.8, 0.6, 1, 0.7, 0.5, 0.9, 1, 0.6, 0.4, 0.3, 0.5, 0.8, 0.6, 0.4].map((h, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 bg-poly-blue/20 rounded-full transition-all duration-300",
                isRecording && "animate-pulse bg-poly-blue"
              )}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>

        <p className="text-sm font-bold text-muted-foreground italic">Toque no microfone e fale</p>

        <button 
          onMouseDown={() => setIsRecording(true)}
          onMouseUp={() => { setIsRecording(false); setHasRecorded(true); }}
          className={cn(
            "h-24 w-24 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform active:scale-90",
            isRecording ? "bg-destructive scale-110 shadow-destructive/50" : "bg-poly-blue hover:bg-poly-blue/90"
          )}
        >
          {isRecording ? <Mic className="h-10 w-10 animate-pulse" /> : <Mic className="h-10 w-10" />}
        </button>

        <div className="flex gap-4 w-full">
          <Button variant="ghost" className="flex-1 text-muted-foreground font-black uppercase text-xs tracking-widest border border-border rounded-xl py-6">
            PULAR
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground font-black uppercase text-xs tracking-widest border border-border rounded-xl py-6">
            NÃO SEI
          </Button>
        </div>
      </div>

      {hasRecorded && (
        <Button onClick={onComplete} className="poly-button-primary py-6 text-xl">
          CONTINUAR
        </Button>
      )}
    </div>
  );
}

function AbsorbStep({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-poly-navy">Vamos revisar!</h2>
        <p className="text-muted-foreground font-medium italic text-sm">Escolha a melhor resposta</p>
      </div>

      <div className="poly-card p-6 flex items-center gap-4 bg-poly-blue/5 border-poly-blue/20">
        <div className="h-10 w-10 rounded-full bg-poly-blue/10 flex items-center justify-center text-poly-blue shrink-0">
          <Volume2 className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-poly-navy">
          Where is the gate?
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {[
          "It's next to the cafe.",
          "I don't know.",
          "Yes, it is."
        ].map((ans, i) => (
          <button 
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "p-6 text-left border-2 rounded-2xl font-bold transition-all",
              selected === i 
                ? i === 0 
                  ? "bg-poly-green/10 border-poly-green text-poly-navy" 
                  : "bg-destructive/10 border-destructive text-poly-navy"
                : "bg-white border-border hover:border-poly-blue"
            )}
          >
            <div className="flex items-center justify-between">
              <span>{ans}</span>
              {selected === i && i === 0 && <CheckCircle2 className="h-5 w-5 text-poly-green" />}
            </div>
          </button>
        ))}
      </div>

      <section className="poly-card bg-poly-blue/5 border-poly-blue/10 flex items-center gap-4 py-4 px-6 mt-4">
        <div className="relative h-12 w-12 shrink-0">
          <img 
            src="https://api.dicebear.com/7.x/bottts/svg?seed=Poly&backgroundColor=transparent" 
            alt="Poly" 
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold text-poly-navy">
            Isso aí! Você está lembrando muito bem.
          </p>
        </div>
      </section>

      <Button 
        onClick={onComplete} 
        disabled={selected === null}
        className={cn(
          "py-6 text-xl transition-all font-black rounded-2xl uppercase tracking-widest",
          selected === 0 ? "bg-poly-green text-white" : "bg-muted text-muted-foreground"
        )}
      >
        FINALIZAR MISSÃO
      </Button>
    </div>
  );
}

function CompletedStep({ onFinish }: { onFinish: () => void }) {
  return (
    <div className="flex flex-col gap-8 animate-in zoom-in duration-500 text-center py-8">
      <div className="relative mx-auto w-48 h-48">
        <div className="absolute inset-0 bg-poly-yellow/20 rounded-full animate-ping" />
        <div className="relative z-10 w-full h-full bg-poly-yellow rounded-full flex items-center justify-center shadow-2xl">
           <Zap className="h-24 w-24 text-poly-navy fill-poly-navy" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black text-poly-navy">Muito bom, Adriana! 🎉</h2>
        <p className="text-lg font-bold text-muted-foreground">Você mandou super bem!</p>
      </div>

      <div className="poly-card p-8 flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364} strokeDashoffset={364 * (1 - 0.85)} className="text-poly-green transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-poly-navy">85%</span>
            <span className="text-[10px] font-black uppercase text-poly-green">Muito bom!</span>
          </div>
        </div>

        <div className="w-full space-y-4">
          {[
            { label: "Estrutura", stars: 5 },
            { label: "Pronúncia", stars: 4 },
            { label: "Fluência", stars: 4 }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase">{item.label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={cn("h-4 w-4", s <= item.stars ? "text-poly-yellow fill-poly-yellow" : "text-muted/20")} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onFinish} className="poly-button-primary py-6 text-xl">
        VOLTAR AO INÍCIO
      </Button>
    </div>
  );
}
