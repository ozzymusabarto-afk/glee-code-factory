import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Sistema de Repetição Espaçada (SRS)

No estágio 'Absorver', o app deve mostrar frases de lições passadas.

Ação: Implementar um algoritmo simples de intervalo (1 dia, 3 dias, 7 dias).

Prompt Sugerido: "No estágio Absorver, recupere frases que o usuário aprendeu há 2 dias. Se ele acertar agora, agende para daqui a 5 dias. Se errar, mostre novamente amanhã."
    </div>
  );
}