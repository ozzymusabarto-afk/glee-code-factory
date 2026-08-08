import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Globe,
  Smartphone,
  Baby,
  Star,
  Flame,
  Zap
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "Seu Perfil — PolyBot" }],
  }),
});

function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] pb-24 md:pb-0 md:pl-24">
      <header className="px-8 py-12 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
           <PolyMascot size="sm" />
           <div>
             <h1 className="text-5xl font-black text-poly-navy tracking-tighter leading-none">Perfil</h1>
             <p className="text-xl font-bold text-muted-foreground/80 mt-1">Sua jornada personalizada.</p>
           </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 border-2 border-border/50 bg-white shadow-sm hover:bg-poly-blue/5 transition-all">
          <Settings className="h-7 w-7 text-poly-navy" />
        </Button>
      </header>

      <main className="flex flex-col gap-10 px-8 pb-16 max-w-4xl">
        {/* Main User Card */}
        <section className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
              <PolyMascot size="xl" />
           </div>
           
           <div className="relative group">
             <div className="h-32 w-32 rounded-[2.5rem] border-4 border-poly-blue/20 overflow-hidden shadow-2xl relative z-10">
               <img 
                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300" 
                 alt="Profile" 
                 className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500"
               />
             </div>
             <div className="absolute -bottom-2 -right-2 z-20 bg-poly-blue text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <Star className="h-5 w-5 fill-white" />
             </div>
           </div>

           <div className="flex flex-col gap-4 text-center md:text-left flex-1 relative z-10">
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-poly-navy tracking-tight">Adriana Silva</h2>
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-[#1976D2] border border-blue-100">Nível 12</span>
                   <span className="rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-[#FFD600] text-[#0D47A1] shadow-md">Poly Premium</span>
                </div>
              </div>
              
              <div className="flex gap-4 pt-2">
                 <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-poly-orange fill-poly-orange" />
                    <span className="text-sm font-black text-poly-navy">7 Dias</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-poly-blue fill-poly-blue" />
                    <span className="text-sm font-black text-poly-navy">2.450 XP</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Experience Modes */}
        <section className="space-y-6">
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-poly-navy/40 px-2">Modo de Experiência</h2>
           <div className="grid grid-cols-2 gap-6">
             <button className="poly-card bg-white border-[3px] border-poly-blue p-8 flex flex-col gap-5 text-left shadow-xl hover:-translate-y-1 transition-all group">
               <div className="h-14 w-14 rounded-2xl bg-poly-blue text-white flex items-center justify-center shadow-lg shadow-poly-blue/20">
                 <Smartphone className="h-7 w-7" />
               </div>
               <div>
                 <span className="text-2xl font-black text-poly-navy block tracking-tight">Modo Adulto</span>
                 <p className="text-xs font-bold text-muted-foreground/80 mt-1">Aprenda com situações reais de trabalho e viagens.</p>
               </div>
             </button>
             
             <button className="poly-card bg-white/50 border-[3px] border-transparent p-8 flex flex-col gap-5 text-left opacity-60 hover:opacity-80 transition-all grayscale hover:grayscale-0">
               <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                 <Baby className="h-7 w-7" />
               </div>
               <div>
                 <span className="text-2xl font-black text-muted-foreground block tracking-tight">Modo Kids</span>
                 <p className="text-xs font-bold text-muted-foreground/60 mt-1">Aprenda inglês brincando com o Poly e amigos.</p>
               </div>
             </button>
           </div>
        </section>

        {/* Settings Groups */}
        <section className="space-y-4">
           {[
             { label: "Notificações Diárias", icon: Bell, value: "Ativado", color: "poly-blue" },
             { label: "Idioma de Interface", icon: Globe, value: "Português", color: "poly-navy" },
             { label: "Segurança & Dados", icon: Shield, color: "poly-green" },
             { label: "Ajuda & Suporte", icon: HelpCircle, color: "poly-yellow" },
           ].map((item, i) => (
             <button key={i} className="poly-card bg-white border-none shadow-sm hover:shadow-md transition-all p-6 flex items-center gap-6 group">
               <div className={cn(
                 "h-14 w-14 shrink-0 rounded-[1.25rem] flex items-center justify-center border transition-all",
                 `bg-${item.color}/5 border-${item.color}/10 text-${item.color}`
               )}>
                 <item.icon className="h-7 w-7" />
               </div>
               <div className="flex-1 text-left">
                 <span className="text-xl font-black text-poly-navy tracking-tight">{item.label}</span>
               </div>
               {item.value && (
                 <span className="text-sm font-black text-poly-blue mr-2 uppercase tracking-widest">{item.value}</span>
               )}
               <ChevronRight className="h-6 w-6 text-muted-foreground/40 group-hover:text-poly-blue group-hover:translate-x-1 transition-all" />
             </button>
           ))}
        </section>

        <Button variant="ghost" className="w-full py-10 text-destructive font-black uppercase tracking-[0.3em] text-[10px] gap-3 hover:bg-destructive/5 rounded-[2.5rem] mt-4 border-2 border-dashed border-destructive/20">
          <LogOut className="h-5 w-5" />
          Finalizar Sessão
        </Button>
      </main>
      <BottomNav active="profile" />
    </div>
  );
}
