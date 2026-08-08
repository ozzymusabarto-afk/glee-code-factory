# Relatório de Status do Projeto PolyBot

## 🚀 O que já foi feito (Concluído)

### Design & Identidade Visual
- **Mascote PolyBot**: Implementado como um robô humanoide 3D (estilo Pixar) usando SVG e Framer Motion. Possui poses (acenando, pensando, celebrando) e expressões.
- **Sistema de Design**: Paleta de cores baseada em Slate e Poly Blue (#1976D2), tipografia premium (Space Grotesk e Plus Jakarta Sans), bordas arredondadas (28px-32px) e estética "Bento Grid".
- **Animações**: Feedback visual com bounce, pulse e transições suaves entre estados.

### Funcionalidades de Interface (UI)
- **Onboarding**: Tela de boas-vindas com lista de benefícios e botão de ação principal.
- **Dashboard de Missões**: Listagem de categorias (Viagem, Vida Real) com cards interativos, estados de "disponível", "bloqueado" e "concluído".
- **Fluxo de Missão ("Airport")**: Implementação completa de 4 etapas:
  1. **Aprender**: Diálogo interativo com áudio simulado e ilustrações.
  2. **Praticar**: Interface de reconhecimento de voz com animação de waveform e botão de microfone "hold-to-talk".
  3. **Absorver**: Quiz de revisão com feedback imediato do mascote.
  4. **Resultados**: Resumo com gráfico circular de progresso (85%) e detalhamento de habilidades.
- **Navegação**: Bottom Navigation funcional para acesso rápido.

### Infraestrutura & Debug
- **Página de Debug (`/debug`)**: Central de especificações e testes para novas funcionalidades.
- **Configuração TanStack**: Roteamento v1, loaders e head metadata para SEO.

---

## 🛠️ O que está em desenvolvimento / Planejado

### Persistência & Backend (Cérebro de Dados)
- **Integração Supabase**: Tabelas `profiles` e `user_srs` mapeadas.
- **Sistema de Timer**: Lógica de 10 minutos diários (`useDailyTimer`) com resets por fuso horário.
- **Sincronização Offline**: Fila de retentativa para salvar progresso quando a conexão falha.

### Sistema de Aprendizado Inteligente
- **SRS (Spaced Repetition)**: Algoritmo de 1-3-7 dias para a etapa de "Absorção".
- **Reconhecimento de Voz**: Integração com Web Speech API e lógica de 80% de similaridade para validação.

### Personalização (Novo)
- **Modos de Perfil**: Implementação dos modos **Adulto** (Dark/Formal) vs **Kids** (Vibrante/Lúdico) com troca dinâmica de tema.

---

## 📋 O que falta (Próximos Passos)

1. **Ativar Lovable Cloud**: Necessário para persistir dados reais dos usuários e habilitar o sistema de perfis.
2. **Implementar Global State**: Configurar Zustand ou Context para gerenciar o `appMode` (Adulto/Kids) em todo o app.
3. **Refinar Speech-to-Text**: Conectar a interface de microfone à lógica de processamento real.
4. **Dashboard de Métricas**: Criar visualizações para o progresso de longo prazo (SRS) e tempo de estudo.
