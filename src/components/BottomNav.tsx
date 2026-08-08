import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Home, Globe, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  active: "home" | "missions" | "progress" | "profile";
}

export function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-border/50 bg-white/80 px-6 py-4 backdrop-blur-2xl md:bottom-auto md:left-0 md:top-0 md:h-screen md:w-24 md:flex-col md:border-r md:border-t-0 md:py-10">
      <ul className="flex items-center justify-between md:flex-col md:gap-10">
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/" })}
            className={cn(
              "h-16 w-16 rounded-[1.5rem] transition-all duration-300 relative group",
              active === "home" 
                ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" 
                : "text-poly-navy/40 hover:text-poly-blue hover:bg-poly-blue/5"
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
                ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" 
                : "text-poly-navy/40 hover:text-poly-blue hover:bg-poly-blue/5"
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
                ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" 
                : "text-poly-navy/40 hover:text-poly-blue hover:bg-poly-blue/5"
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
                ? "bg-poly-blue text-white shadow-lg shadow-poly-blue/30" 
                : "text-poly-navy/40 hover:text-poly-blue hover:bg-poly-blue/5"
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
