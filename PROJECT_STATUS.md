# PolyBot — Estado Atual do Projeto

Este documento resume o status atual do ecossistema PolyBot.

## ✅ Itens Concluídos
- **Design System:** Implementado em OKLCH/Tailwind, Bento Grid, premium Slate & Blue theme.
- **Mascot:** `PolyMascot.tsx` integrado com Framer Motion (poses: `thinking`, `explaining`, `celebrating`).
- **Global State:** Zustand (`useAppStore`) gerenciando `appMode` (Adulto vs. Kids).
- **Session Timer:** `useDailyTimer` (10 min) com Soft Lock e Overlay de Celebração.
- **Persistência Supabase:** Sincronização automática para `profiles` (streaks, timer, modo) e `chunks` (SRS).
- **Web Speech API:** Integração de `useSpeechRecognition` com threshold de 80% (0.8) e feedback dinâmico.
- **Algoritmo SRS:** Lógica de intervalo de 1-3-7 dias persistida no banco.
- **Segurança (Security Memory):** RLS ativado, validação rigorosa de `profiles` e `user_roles`, funções `SECURITY DEFINER` protegidas.
- **Onboarding:** Fluxo inicial para escolha de modo com persistência automática.
- **Privacidade & Perfil:** Página de Política de Privacidade (LGPD) e Gestão de Dados (Settings) configuradas.

## 🚧 Em Desenvolvimento / Monitoramento
- **Testes de Áudio:** Monitoramento contínuo da fidelidade da Web Speech API.
- **Sincronização Offline:** Garantir que o estado local (`persist` middleware) reconcilie corretamente com o Supabase após reconexão.

## 📋 Próximos Passos (Backlog)
- **Expansão de Conteúdo:** Adicionar novas missões ao banco de dados `chunks` (populado manualmente no Supabase).
- **Otimização de Produção:** Revisar build para minificação (padrão Vite).
- **Monitoramento de Erros:** Manter o monitoramento via `reportLovableError` configurado no `__root.tsx`.
