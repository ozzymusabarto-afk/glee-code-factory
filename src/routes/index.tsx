import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, Mic, ArrowRight } from "lucide-react";
import { PolyMascot } from "@/components/poly/PolyMascot";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Onboarding,
  head: () => ({
    title: "PolyBot — Aprenda inglês para a vida real",
    meta: [
      { name: "description", content: "Missões curtas, conversas reais e progresso diário com o seu tutor PolyBot." },
      { property: "og:title", content: "PolyBot — Aprenda inglês para a vida real" },
      { property: "og:description", content: "Aprenda inglês com situações reais e o tutor Poly." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Onboarding() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-[#1976D2]" />,
      text: "10 minutos por dia",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#1976D2]" />,
      text: "Situações do cotidiano",
    },
    {
      icon: <Mic className="h-6 w-6 text-[#1976D2]" />,
      text: "Pronúncia e conversação",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] font-jakarta overflow-hidden selection:bg-blue-100">
      {/* Top Logo */}
      <header className="pt-10 pb-6 flex justify-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-[#1976D2] rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
             <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-3 h-3 bg-[#1976D2] rounded-full" />
             </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-[#0D47A1] font-space uppercase">PolyBot</h1>
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col px-8 relative z-10 max-w-2xl mx-auto w-full py-20">
        {/* Title Section */}
        <section className="mt-12 space-y-4 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-black text-[#0D47A1] tracking-tighter leading-[1.1]"
          >
            Aprenda inglês <br className="hidden md:block" />
            para a vida real
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto md:mx-0"
          >
            Missões curtas, conversas reais e progresso diário.
          </motion.p>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 space-y-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="flex items-center gap-6 p-6 bg-white rounded-[28px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-2xl">
                {benefit.icon}
              </div>
              <span className="text-xl font-bold text-[#0D47A1]">{benefit.text}</span>
            </motion.div>
          ))}
        </section>

        {/* Spacer with gap between list and button */}
        <div className="h-24" />
        
        {/* Centralized Action Button */}
        <div className="flex justify-center w-full mb-20">
          <Button 
            onClick={() => navigate({ to: "/missions" })}
            className="bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black py-10 rounded-[28px] text-2xl shadow-2xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4 w-full max-w-[300px]"
          >
            COMEÇAR AGORA
            <ArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </main>

      {/* Mascot Positioned Bottom Right - Adjusted for right-side offset */}
      <div className="fixed bottom-0 right-[-2%] md:right-[2%] w-[45%] md:w-[35%] max-w-[450px] pointer-events-none z-0">
        <PolyMascot size="full" className="origin-bottom" />
      </div>

      {/* Decorative background shapes */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/2 -right-24 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10" />
    </div>
  );
}
