import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    title: "Política de Privacidade — PolyBot",
    meta: [
      { name: "description", content: "Política de Privacidade do PolyBot em conformidade com a LGPD." },
    ],
  }),
});

function PrivacyPage() {
  const { appMode } = useAppStore();
  const isAdult = appMode === 'adult';

  return (
    <div className={cn(
      "min-h-screen p-8 md:p-20 font-jakarta",
      isAdult ? "bg-[#0F172A] text-slate-100" : "bg-[#FFFDE7] text-blue-900"
    )}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-12"
      >
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Política de Privacidade</h1>
          <p className="text-lg opacity-70">Última atualização: 8 de agosto de 2026</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. Introdução</h2>
          <p className="leading-relaxed">
            O PolyBot valoriza a sua privacidade. Esta política explica como coletamos, usamos e protegemos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <h2 className="text-2xl font-bold">2. Coleta de Dados</h2>
          <p className="leading-relaxed">
            Coletamos apenas as informações necessárias para personalizar sua experiência de aprendizado, como:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nome e e-mail (via autenticação);</li>
            <li>Preferências de modo (Adulto ou Kids);</li>
            <li>Progresso de aprendizado e estatísticas de uso;</li>
            <li>Dados de voz processados localmente ou via APIs seguras de reconhecimento de fala.</li>
          </ul>

          <h2 className="text-2xl font-bold">3. Uso das Informações</h2>
          <p className="leading-relaxed">
            Seus dados são usados exclusivamente para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Manter seu progresso e streak diário;</li>
            <li>Ajustar o nível de dificuldade via algoritmo SRS;</li>
            <li>Melhorar o sistema de reconhecimento de voz.</li>
          </ul>

          <h2 className="text-2xl font-bold">4. Seus Direitos</h2>
          <p className="leading-relaxed">
            Sob a LGPD, você tem direito a acessar, corrigir ou excluir seus dados a qualquer momento através das configurações do aplicativo ou entrando em contato com nosso suporte.
          </p>

          <h2 className="text-2xl font-bold">5. Segurança</h2>
          <p className="leading-relaxed">
            Utilizamos tecnologias de ponta e criptografia para garantir que seus dados permaneçam seguros e protegidos contra acessos não autorizados.
          </p>
        </section>

        <footer className="pt-10 border-t border-current border-opacity-10">
          <p className="opacity-60 text-sm">PolyBot — Transformando o aprendizado de idiomas.</p>
        </footer>
      </motion.div>
    </div>
  );
}
