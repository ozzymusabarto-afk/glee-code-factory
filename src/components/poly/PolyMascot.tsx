import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import mascotAsset from "@/assets/polybot_mascot.png.asset.json";

interface PolyMascotProps {
  expression?: "happy" | "thinking" | "excited" | "proud" | "neutral" | "surprised" | "confident" | "focused" | "reading";
  pose?: "neutral" | "waving" | "pointing" | "celebrating" | "thinking" | "explaining" | "reading";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

/**
 * PolyMascot Component
 * 
 * Displays the official PolyBot mascot using the high-quality 3D reference image.
 * The mascot is a humanoid white robot with a black display visor, blue glowing eyes,
 * and a premium 3D Pixar/Disney style finish.
 */
export function PolyMascot({ 
  expression = "happy", 
  pose = "neutral",
  size = "md", 
  className 
}: PolyMascotProps) {
  
  // Since we have a single reference image containing all poses/expressions,
  // we use background-position and background-size to focus on specific parts
  // of the sprite sheet/reference image.
  // Note: In a real production app, we would have individual transparent PNGs for each pose.
  // For this redesign, we use the main image and frame it correctly to keep the "Pixar" look.
  
  const sizes = {
    sm: "h-16 w-16",
    md: "h-32 w-32",
    lg: "h-56 w-56",
    xl: "h-80 w-80",
    full: "w-full aspect-square",
  };

  // We'll use the main acenando/waving pose (leftmost large one) as default high-quality reference
  // to ensure it never looks "simplified".
  
  return (
    <div className={cn(
      "relative flex items-center justify-center overflow-hidden rounded-[2rem]",
      sizes[size], 
      className
    )}>
      {/* Soft Premium Glow */}
      <div className="absolute inset-0 bg-poly-blue/5 rounded-full blur-3xl" />
      
      {/* The Mascot Image (Pixar Style 3D) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full h-full"
      >
        <img 
          src={mascotAsset.url} 
          alt={`PolyBot - ${pose} ${expression}`}
          className={cn(
            "w-full h-full object-contain object-left-top scale-[1.3] translate-y-[5%] translate-x-[-2%]",
            // Specific poses could be handled with translate/scale if the image was a sprite
            // For now, we prioritize showing the full, high-quality character as requested.
          )}
        />
      </motion.div>

      {/* Interactive visual effects to emphasize "Active" status */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-poly-blue/20 blur-sm rounded-full" />
    </div>
  );
}
