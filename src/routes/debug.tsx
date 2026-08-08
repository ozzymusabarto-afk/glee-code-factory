import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente o sistema de 'Perfis de Usuário' (Modo Adulto vs. Modo Kids) com persistência no Supabase e alteração dinâmica de tema (UI/UX).

      Tela de Onboarding: Crie uma tela de boas-vindas que pergunte: 'Quem vai dominar um novo idioma hoje?'. Exiba dois cards grandes e clicáveis: [Modo Adulto] e [Modo Kids].

      Lógica de Estado: Utilize um Context API ou Zustand para gerenciar o estado global appMode.

      Identidade Visual (Temas):

      Se Modo Adulto: Aplique globalmente uma paleta Dark Mode (Fundo: Slate-900, Texto: Slate-100, Destaques: Cyan-500). O Tutor-Bot deve usar uma linguagem formal e motivacional (ex: 'Foco total na meta, vamos começar?').

      Se Modo Kids: Aplique globalmente uma paleta vibrante (Fundo: Amarelo-50, Texto: Azul-900, Destaques: Verde-500). O Tutor-Bot deve usar linguagem lúdica e emojis (ex: 'Oi amiguinho! Pronto para uma nova aventura? 🚀').

      Persistência no Banco de Dados: Salve a escolha do usuário na tabela profiles do Supabase, no campo tutor_mode. Garanta que, ao fazer login novamente, o app recupere essa preferência e aplique o tema correto automaticamente.

      Interface: Adicione um botão pequeno nas configurações para que o usuário possa trocar de modo manualmente depois, caso deseje.
    </div>
  );
}