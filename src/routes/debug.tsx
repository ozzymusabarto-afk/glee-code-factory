import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Configure alertas automáticos no centro de notificações quando o job de lembretes falhar ou atingir retry máximo, com links para detalhes no debug.
      Adicione exportação em CSV e JSON do histórico de execuções do job de lembretes para eu analisar falhas por período e erro.
      Crie um audit trail para quando eu marcar notificações como tratadas, registrando quem fez, data/hora e o motivo em uma trilha de auditoria consultável.
      Implemente uma ação no debug para eu reexecutar manualmente o job de lembretes e acompanhar o novo status e logs em tempo real.
      Adicione uma busca e paginação no histórico de execuções do job de lembretes para eu localizar rapidamente status e erros específicos.
    </div>
  );
}