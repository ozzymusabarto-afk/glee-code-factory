import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente uma ação de confirmação direta na lista de notificações para eu marcar lembretes como tratados e registrar o motivo.
      Melhore o dashboard para eu filtrar e agrupar métricas por intervalo de revisão (1 dia/3 dias/7 dias) e ordenar por tendência.
      Crie uma página no debug para eu ver o histórico completo de execuções do job de lembretes com status, tempo de execução e mensagens de erro.
    </div>
  );
}