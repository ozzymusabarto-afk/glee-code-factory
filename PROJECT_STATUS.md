# PolyBot - Project Status

## 🚀 MVP 2.0: Método Natural (Concluído)

### Concluído
- **Hall de Entrada**: Novo fluxo de login/cadastro com recepção do mascote Poly.
- **Check-in Interativo**: Captura de nome, escolha de modo (Adulto/Kids) e seleção de nível (Sobrevivência/Prática Ativa).
- **Tutorial Invisível**: Validação de áudio ("Hello") antes de entrar na Sala Principal.
- **Sala Principal (Dashboard)**: Listagem de situações de chat baseadas no nível do usuário.
- **Interface de Chat (WhatsApp Style)**: 
  - Diálogos automáticos via Web Speech Synthesis.
  - Reconhecimento de voz em tempo real.
  - Threshold de 80% para validação de frases.
  - Feedback visual dinâmico (Sucesso/Erro).
  - Cronômetro de 10 min persistente.
- **Persistência Supabase**: 
  - Tabela `lessons` para roteiros multi-nível.
  - Campos `skill_level` e `display_name` em `profiles`.
  - Persistência de streaks e progresso diário.

### Em Desenvolvimento
- **IA Generativa**: Refinamento de dicas de pronúncia dinâmicas baseadas no erro.
- **Expansão de Conteúdo**: Inclusão de mais 10 categorias de "Sobrevivência".

### Próximos Passos
- **Suporte Multilíngue**: Implementar suporte para Espanhol e Italiano no mesmo motor.
- **Gamificação Kids**: Acúmulo de medalhas e novos acessórios para o Poly.
