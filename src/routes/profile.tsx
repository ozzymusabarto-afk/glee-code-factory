import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";
import { User, ShieldCheck, Database, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { appMode } = useAppStore();
  const isAdult = appMode === 'adult';

  return (
    <div className={cn(
      "min-h-screen p-8 md:p-20 font-jakarta transition-colors duration-500",
      isAdult ? "bg-[#0F172A] text-slate-100" : "bg-[#FFFDE7] text-blue-900"
    )}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <header className="flex items-center gap-6 mb-12">
          <div className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg",
            isAdult ? "bg-cyan-500 text-slate-900" : "bg-[#1976D2] text-white"
          )}>
            <User size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Configurações</h1>
            <p className="opacity-70">Gerencie sua conta e o cérebro do PolyBot</p>
          </div>
        </header>

        <div className="grid gap-6">
          <section className={cn(
            "poly-card border-none p-8 space-y-6",
            isAdult ? "bg-slate-800" : "bg-white"
          )}>
            <div className="flex items-center gap-3 text-cyan-500">
              <ShieldCheck size={24} />
              <h2 className="text-xl font-black uppercase tracking-wider">Gestão de Dados (Cérebro)</h2>
            </div>
            
            <p className="opacity-70 leading-relaxed">
              Para garantir máxima integridade e segurança, a gestão de novos <strong>Chunks</strong> (lições) e o controle avançado de <strong>usuários</strong> são realizados diretamente através do Painel Administrativo Cloud.
            </p>
            
            <div className={cn(
              "p-6 rounded-2xl border flex items-start gap-4",
              isAdult ? "bg-slate-900 border-slate-700" : "bg-blue-50 border-blue-100"
            )}>
              <Database className="shrink-0 mt-1 opacity-50" size={20} />
              <div className="text-sm space-y-2">
                <p className="font-bold">Status do Servidor: Operacional</p>
                <p className="opacity-70">Todas as regras de RLS e políticas de segurança estão ativas e monitoradas em tempo real.</p>
              </div>
            </div>
          </section>

          <section className={cn(
            "poly-card border-none p-8 space-y-6",
            isAdult ? "bg-slate-800" : "bg-white"
          )}>
            <div className="flex items-center gap-3 text-green-500">
              <MessageSquare size={24} />
              <h2 className="text-xl font-black uppercase tracking-wider">Modo de Aprendizado</h2>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-current border-opacity-20">
              <span className="font-bold">Modo Atual</span>
              <span className={cn(
                "px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest",
                isAdult ? "bg-cyan-500 text-slate-900" : "bg-yellow-400 text-blue-900"
              )}>
                {isAdult ? "Adulto / Profissional" : "Kids / Aventura"}
              </span>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
