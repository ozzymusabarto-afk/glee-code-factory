import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Globe,
  Smartphone,
  Baby
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "Perfil — PolyBot" }],
  }),
});

function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-poly-cream pb-24 md:pb-0 md:pl-20">
      <header className="px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-poly-navy">Perfil</h1>
          <p className="text-muted-foreground font-medium">Configure sua experiência.</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 border border-border">
          <Settings className="h-6 w-6 text-poly-navy" />
        </Button>
      </header>

      <main className="flex flex-col gap-6 px-6 pb-12 max-w-2xl">
        {/* User Card */}
        <div className="poly-card bg-white flex items-center gap-6 p-6">
          <div className="h-24 w-24 rounded-full border-4 border-poly-blue/20 overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-poly-navy">Adriana Silva</h2>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-poly-blue/10 px-3 py-1 text-[10px] font-black uppercase text-poly-blue">Nível 12</span>
              <span className="rounded-full bg-poly-yellow/20 px-3 py-1 text-[10px] font-black uppercase text-poly-navy">Premium</span>
            </div>
          </div>
        </div>

        {/* Mode Toggles */}
        <div className="grid grid-cols-2 gap-4">
          <button className="poly-card bg-white border-2 border-poly-blue p-4 flex flex-col gap-3 text-left">
            <div className="h-10 w-10 rounded-xl bg-poly-blue/10 flex items-center justify-center text-poly-blue">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-black text-poly-navy">Modo Adulto</span>
              <p className="text-[10px] font-medium text-muted-foreground">Foco e resultados</p>
            </div>
          </button>
          <button className="poly-card bg-white border-border p-4 flex flex-col gap-3 text-left opacity-60">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
              <Baby className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-black text-muted-foreground">Modo Kids</span>
              <p className="text-[10px] font-medium text-muted-foreground">Diversão e descoberta</p>
            </div>
          </button>
        </div>

        {/* Settings List */}
        <div className="flex flex-col gap-2">
          {[
            { label: "Notificações", icon: Bell, value: "Ativado" },
            { label: "Idioma de Interface", icon: Globe, value: "Português" },
            { label: "Privacidade", icon: Shield },
            { label: "Ajuda & Suporte", icon: HelpCircle },
          ].map((item, i) => (
            <button key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border hover:bg-muted/30 transition-colors">
              <div className="h-10 w-10 shrink-0 rounded-full bg-poly-navy/5 flex items-center justify-center text-poly-navy">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-base font-bold text-poly-navy">{item.label}</span>
              </div>
              {item.value && <span className="text-sm font-bold text-poly-blue">{item.value}</span>}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        <Button variant="ghost" className="w-full py-8 text-destructive font-black uppercase tracking-widest text-xs gap-2">
          <LogOut className="h-4 w-4" />
          Sair da Conta
        </Button>
      </main>
    </div>
  );
}
