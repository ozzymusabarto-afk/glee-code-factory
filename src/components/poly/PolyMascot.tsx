import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
        "relative z-10 w-full h-full bg-white rounded-[35%] shadow-xl border-4 border-slate-100 flex flex-col items-center justify-center overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/50 before:to-transparent"
      )}>
        {/* Face Display - Black with Blue Glowing Eyes */}
        <div className="w-[75%] h-[45%] bg-[#1A1A1A] rounded-[2rem] flex items-center justify-around px-4 shadow-2xl relative">
          <motion.div 
            animate={expression === "thinking" ? { opacity: [1, 0.4, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={cn(
              "w-4 h-4 rounded-full shadow-[0_0_15px_#00E5FF] transition-all duration-300",
              expression === "excited" ? "h-6 bg-[#00E5FF]" : "bg-[#00E5FF]"
            )} 
          />
          <motion.div 
            animate={expression === "thinking" ? { opacity: [1, 0.4, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className={cn(
              "w-4 h-4 rounded-full shadow-[0_0_15px_#00E5FF] transition-all duration-300",
              expression === "excited" ? "h-6 bg-[#00E5FF]" : "bg-[#00E5FF]"
            )} 
          />
          
          {/* Mouth/Expression indicator */}
          {expression === "happy" && (
            <div className="absolute bottom-2 w-8 h-1 bg-[#00E5FF]/40 rounded-full blur-[1px]" />
          )}
        </div>
        
        {/* Blue Details (Premium Finish) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-[#1976D2]/10 border-t border-[#1976D2]/20" />
        <div className="absolute top-1/2 -left-1 w-2 h-6 bg-[#1976D2] rounded-r-full" />
        <div className="absolute top-1/2 -right-1 w-2 h-6 bg-[#1976D2] rounded-l-full" />

        {/* Antenna */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1.5 h-4 bg-[#1976D2] shadow-sm" />
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
      </div>
    </div>
  );
}
