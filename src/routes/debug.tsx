import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Configure o job em segundo plano para disparar lembretes (email ou notificação) quando existirem frases “devidas” para revisão no SRS.
      Crie um dashboard com gráficos do SRS mostrando contagem de frases por estágio, taxa de acerto por intervalo e tendência de previsões de revisão.
      Adicione autenticação e permissões para restringir o acesso à tela de debug, auditoria e exportação do SRS.
      Implemente testes unitários e E2E para validar transições de estágio, cálculo do próximo intervalo do SRS e atualização após acertar/errar.
    </div>
  );
}