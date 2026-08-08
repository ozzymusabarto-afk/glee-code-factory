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
    <nav className="fixed bottom-0 left-0 z-20 w-full border-t border-border bg-white/80 px-4 py-3 backdrop-blur-xl md:bottom-auto md:left-0 md:top-0 md:h-screen md:w-20 md:flex-col md:border-r md:border-t-0 md:py-8">
      <ul className="flex items-center justify-around md:flex-col md:gap-8">
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/" })}
            className={cn(
              "h-14 w-14 rounded-2xl transition-all",
              active === "home" ? "bg-poly-blue/10 text-poly-blue shadow-inner" : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Home className="h-7 w-7" />
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/missions" })}
            className={cn(
              "h-14 w-14 rounded-2xl transition-all",
              active === "missions" ? "bg-poly-blue/10 text-poly-blue shadow-inner" : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Globe className="h-7 w-7" />
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/progress" })}
            className={cn(
              "h-14 w-14 rounded-2xl transition-all",
              active === "progress" ? "bg-poly-blue/10 text-poly-blue shadow-inner" : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <BarChart3 className="h-7 w-7" />
          </Button>
        </li>
        <li>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/profile" })}
            className={cn(
              "h-14 w-14 rounded-2xl transition-all",
              active === "profile" ? "bg-poly-blue/10 text-poly-blue shadow-inner" : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <User className="h-7 w-7" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}
