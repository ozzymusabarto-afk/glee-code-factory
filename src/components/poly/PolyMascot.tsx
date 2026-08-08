import { cn } from "@/lib/utils";

interface PolyMascotProps {
  expression?: "happy" | "thinking" | "excited" | "proud" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PolyMascot({ expression = "happy", size = "md", className }: PolyMascotProps) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-24 w-24",
    lg: "h-40 w-40",
    xl: "h-64 w-64",
  };

  const getSeed = () => {
    switch(expression) {
      case "happy": return "Poly-Happy";
      case "thinking": return "Poly-Think";
      case "excited": return "Poly-Excited";
      case "proud": return "Poly-Proud";
      default: return "Poly-Neutral";
    }
  };

  return (
    <div className={cn("relative transition-transform hover:scale-105 duration-300 flex items-center justify-center", sizes[size], className)}>
      <div className="absolute inset-0 bg-poly-blue/5 rounded-full blur-2xl animate-pulse" />
      {/* Visual representation of Poly - rounded blue robot */}
      <div className={cn(
        "relative z-10 w-full h-full bg-poly-blue rounded-[35%] shadow-xl border-4 border-white/20 flex flex-col items-center justify-center overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent"
      )}>
        {/* Face Display */}
        <div className="w-[70%] h-[40%] bg-poly-navy/90 rounded-2xl flex items-center justify-around px-2 shadow-inner">
          <div className={cn(
            "w-3 h-3 bg-poly-yellow rounded-full shadow-[0_0_10px_rgba(255,235,59,0.8)]",
            expression === "thinking" && "animate-pulse"
          )} />
          <div className={cn(
            "w-3 h-3 bg-poly-yellow rounded-full shadow-[0_0_10px_rgba(255,235,59,0.8)]",
            expression === "thinking" && "animate-pulse delay-150"
          )} />
        </div>
        {/* Antenna */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-3 bg-poly-blue-400 border-x border-white/20" />
        <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-2 h-2 bg-poly-yellow rounded-full shadow-[0_0_5px_rgba(255,235,59,0.5)]" />
      </div>
    </div>
  );
}
