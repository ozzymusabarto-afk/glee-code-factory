import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, Globe, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app-store";

interface BottomNavProps {
  active: "home" | "missions" | "progress" | "profile";
}

export function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();
  const { appMode } = useAppStore();
  const isAdult = appMode === 'adult';

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 z-40 w-full border-t px-6 py-4 backdrop-blur-2xl md:bottom-auto md:left-0 md:top-0 md:h-screen md:w-24 md:flex-col md:border-r md:border-t-0 md:py-10 transition-colors duration-500",
      isAdult 
        ? "bg-slate-900/80 border-slate-800" 
        : "bg-white/80 border-border/50"
    )}>
      <ul className="flex items-center justify-between md:flex-col md:gap-10">
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/" })}
            className={cn(
              "h-16 w-16 rounded-[1.5rem] transition-all duration-300 relative group",
              active === "home" 
                ? isAdult ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" : "bg-[#1976D2] text-white shadow-lg shadow-blue-500/30"
                : isAdult ? "text-slate-500 hover:text-cyan-500 hover:bg-slate-800" : "text-slate-400 hover:text-[#1976D2] hover:bg-blue-50"
            )}
          >
            <Home className="h-8 w-8" />
            {active === "home" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full md:hidden" />
            )}
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/missions" })}
            className={cn(
              "h-16 w-16 rounded-[1.5rem] transition-all duration-300 relative group",
              active === "missions" 
                ? isAdult ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" : "bg-[#1976D2] text-white shadow-lg shadow-blue-500/30"
                : isAdult ? "text-slate-500 hover:text-cyan-500 hover:bg-slate-800" : "text-slate-400 hover:text-[#1976D2] hover:bg-blue-50"
            )}
          >
            <Globe className="h-8 w-8" />
            {active === "missions" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full md:hidden" />
            )}
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/progress" })}
            className={cn(
              "h-16 w-16 rounded-[1.5rem] transition-all duration-300 relative group",
              active === "progress" 
                ? isAdult ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" : "bg-[#1976D2] text-white shadow-lg shadow-blue-500/30"
                : isAdult ? "text-slate-500 hover:text-cyan-500 hover:bg-slate-800" : "text-slate-400 hover:text-[#1976D2] hover:bg-blue-50"
            )}
          >
            <BarChart3 className="h-8 w-8" />
            {active === "progress" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full md:hidden" />
            )}
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/profile" })}
            className={cn(
              "h-16 w-16 rounded-[1.5rem] transition-all duration-300 relative group",
              active === "profile" 
                ? isAdult ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30" : "bg-[#1976D2] text-white shadow-lg shadow-blue-500/30"
                : isAdult ? "text-slate-500 hover:text-cyan-500 hover:bg-slate-800" : "text-slate-400 hover:text-[#1976D2] hover:bg-blue-50"
            )}
          >
            <User className="h-8 w-8" />
            {active === "profile" && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full md:hidden" />
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
