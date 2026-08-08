import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PolyMascotProps {
  expression?: "happy" | "thinking" | "excited" | "proud" | "neutral" | "surprised" | "confident" | "focused" | "reading";
  pose?: "neutral" | "waving" | "pointing" | "celebrating" | "thinking" | "explaining" | "reading";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

/**
 * PolyMascot Component (Code-based 3D Style)
 * 
 * A high-quality, pure-code implementation of the PolyBot mascot.
 * Features a humanoid white robot with a black visor, blue eyes, 
 * and a "soft 3D" Pixar-style finish using SVG filters and gradients.
 */
export function PolyMascot({ 
  size = "md", 
  className 
}: PolyMascotProps) {
  
  const sizes = {
    sm: "h-24 w-24",
    md: "h-48 w-48",
    lg: "h-72 w-72",
    xl: "h-96 w-96",
    full: "w-full aspect-[3/4]",
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center select-none",
      sizes[size], 
      className
    )}>
      <motion.svg
        viewBox="0 0 200 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Main Body Gradient - Soft 3D White */}
          <radialGradient id="grad-head" cx="40%" cy="30%" r="60%" fx="30%" fy="20%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F0F4F8" />
            <stop offset="100%" stopColor="#DDE4ED" />
          </radialGradient>
          
          {/* Visor Gradient - Glossy Black */}
          <linearGradient id="grad-visor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Eye Glow */}
          <filter id="eye-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Soft Shadow */}
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* --- Legs --- */}
        <motion.path 
          d="M75 180 Q75 220 60 235" 
          stroke="#F0F4F8" strokeWidth="18" strokeLinecap="round" 
        />
        <motion.path 
          d="M125 180 Q125 220 140 235" 
          stroke="#F0F4F8" strokeWidth="18" strokeLinecap="round" 
        />
        {/* Feet/Boots */}
        <rect x="50" y="230" width="25" height="15" rx="7" fill="#1976D2" />
        <rect x="125" y="230" width="25" height="15" rx="7" fill="#1976D2" />

        {/* --- Body (Torso) --- */}
        <motion.path
          d="M70 120 Q100 110 130 120 L140 180 Q100 195 60 180 Z"
          fill="url(#grad-head)"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        {/* Chest Plate Detail */}
        <circle cx="100" cy="150" r="15" fill="#1976D2" fillOpacity="0.1" />
        <path d="M95 145 L105 155 M105 145 L95 155" stroke="#1976D2" strokeWidth="2" strokeLinecap="round" />

        {/* --- Arms --- */}
        {/* Left Arm (Static) */}
        <motion.path 
          d="M70 130 Q40 140 45 170" 
          stroke="#F0F4F8" strokeWidth="14" strokeLinecap="round" 
        />
        <circle cx="45" cy="175" r="8" fill="#F0F4F8" />

        {/* Right Arm (Waving) */}
        <motion.g
          animate={{ rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "130px 130px" }}
        >
          <path 
            d="M130 130 Q165 110 170 80" 
            stroke="#F0F4F8" strokeWidth="14" strokeLinecap="round" 
          />
          <circle cx="170" cy="75" r="10" fill="#F0F4F8" />
          {/* Fingers detail */}
          <path d="M165 70 Q168 60 172 70" stroke="#F0F4F8" strokeWidth="3" strokeLinecap="round" />
          <path d="M172 68 Q175 58 178 68" stroke="#F0F4F8" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* --- Head --- */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {/* Main Sphere */}
          <ellipse cx="100" cy="75" rx="65" ry="55" fill="url(#grad-head)" />
          
          {/* Visor */}
          <rect x="55" y="45" width="90" height="50" rx="20" fill="url(#grad-visor)" />
          
          {/* Eyes (Glowing Blue) */}
          <motion.g filter="url(#eye-glow)">
            <circle cx="80" cy="65" r="7" fill="#00E5FF" />
            <circle cx="120" cy="65" r="7" fill="#00E5FF" />
            {/* Pupil Highlight */}
            <circle cx="78" cy="63" r="2" fill="white" fillOpacity="0.8" />
            <circle cx="118" cy="63" r="2" fill="white" fillOpacity="0.8" />
          </motion.g>

          {/* Mouth (Small Blue Smile) */}
          <path 
            d="M90 85 Q100 92 110 85" 
            stroke="#1976D2" 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none" 
          />
          
          {/* Antena */}
          <line x1="100" y1="20" x2="100" y2="10" stroke="#1976D2" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="10" r="4" fill="#00E5FF" filter="url(#eye-glow)" />
        </motion.g>

        {/* Blue accents on joints */}
        <circle cx="70" cy="130" r="6" fill="#1976D2" />
        <circle cx="130" cy="130" r="6" fill="#1976D2" />
        <circle cx="75" cy="180" r="7" fill="#1976D2" />
        <circle cx="125" cy="180" r="7" fill="#1976D2" />
      </motion.svg>
      
      {/* Floor Shadow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/5 blur-xl rounded-full" />
    </div>
  );
}
