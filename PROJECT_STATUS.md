# Relatório de Status do Projeto PolyBot

## 🚀 O que já foi feito (Concluído)

### Design & Identidade Visual
- **Mascote PolyBot**: Implementado como um robô humanoide 3D (estilo Pixar) usando SVG e Framer Motion. Possui poses (acenando, pensando, celebrando) e expressões.
- **Sistema de Design**: Paleta de cores baseada em Slate e Poly Blue (#1976D2), tipografia premium (Space Grotesk e Plus Jakarta Sans), bordas arredondadas (28px-32px) e estética "Bento Grid".
- **Animações**: Feedback visual com bounce, pulse e transições suaves entre estados.
- **Modos de Perfil (Adulto vs Kids)**: Implementação de temas dinâmicos. Modo Adulto (Dark/Formal) e Modo Kids (Vibrante/Lúdico) com alteração de tom de voz e interface.

### Funcionalidades de Interface (UI)
- **Onboarding**: Tela de boas-vindas com seleção de perfil (Adulto/Kids) e persistência de escolha.
- **Dashboard de Missões**: Listagem de categorias com cards interativos e estados de progresso.
- **Fluxo de Missão Completo**: Etapas de Aprender, Praticar, Absorver e Resultados 100% integradas.
- **Soft Lock de 10 Minutos**: Sistema `useDailyTimer` que monitora o tempo de estudo diário e exibe overlay de celebração/bloqueio ao atingir a meta.

### Inteligência & Backend (Cérebro de Dados)
- **Integração Lovable Cloud (Supabase)**: Persistência real de perfis, progresso, streaks e timer no banco de dados.
- **Reconhecimento de Voz Real**: Integração com Web Speech API para prática de Shadowing.
- **Validação de Pronúncia**: Algoritmo de similaridade com threshold de 80% para avanço nas lições.
- **Sistema SRS (Spaced Repetition)**: Algoritmo de repetição espaçada (1-3-7 dias) integrado ao fluxo de "Absorção" para garantir a retenção de longo prazo.
- **Estado Global (Zustand)**: Gerenciamento centralizado de `appMode`, `dailyTimer` e dados do usuário com sincronização cloud/local.

### Infraestrutura & Debug
- **Página de Debug (`/debug`)**: Ferramentas de diagnóstico para banco de dados, áudio e reset de progresso.
- **Configuração TanStack**: Roteamento v1, loaders e head metadata otimizados.

---

## 🛠️ O que está em desenvolvimento / Planejado
- **Refinamento de UX**: Ajustes finos em micro-interações e feedbacks sonoros.
- **Expansão de Conteúdo**: Criação de novas trilhas de aprendizado (Business English, Slangs, etc.).

---

## 📋 O que falta (Próximos Passos)
1. **QA Final**: Testes de ponta a ponta em diferentes navegadores para garantir estabilidade da Web Speech API.
2. **Dashboard de Métricas Avançado**: Visualização detalhada do domínio de vocabulário via SRS.
3. **Publicação**: Lançamento da versão MVP estável.
