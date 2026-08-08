import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, User } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    title: "PolyBot — Entrar / Cadastrar",
    meta: [{ name: "description", content: "Acesse sua conta PolyBot para aprender inglês." }],
  }),
});

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      } else {
        const { error, data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              display_name: name,
              app_mode: 'kids', // Default to kids for safety/fun first
            }
          }
        });
        if (error) throw error;
        
        if (data.user) {
          toast.success("Conta criada com sucesso!");
        }
      }
      navigate({ to: "/" });
    } catch (error: any) {
      toast.error(error.message || "Erro na autenticação");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback',
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Erro no login com Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-6 font-jakarta">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#1976D2] rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-200 mb-4">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-[#1976D2] rounded-full" />
             </div>
          </div>
          <h1 className="text-3xl font-black text-[#0D47A1] tracking-tight uppercase font-space">PolyBot</h1>
          <p className="text-slate-500 font-medium">
            {isLogin ? "Entre para continuar seu progresso" : "Comece sua jornada hoje"}
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-7 rounded-2xl border-2 border-slate-100 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
          >
            {isGoogleLoading ? <Loader2 className="animate-spin" /> : (
              <>
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                ENTRAR COM GOOGLE
              </>
            )}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">ou e-mail</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12 py-7 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-7 rounded-2xl bg-[#1976D2] hover:bg-[#0D47A1] text-white font-black text-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>
                  {isLogin ? "ENTRAR" : "CRIAR CONTA"}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-500 hover:text-[#1976D2] transition-colors"
          >
            {isLogin ? (
              <>Não tem conta? <span className="text-[#1976D2]">Cadastre-se grátis</span></>
            ) : (
              <>Já tem uma conta? <span className="text-[#1976D2]">Entre aqui</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
