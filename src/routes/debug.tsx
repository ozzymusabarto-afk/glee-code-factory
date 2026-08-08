import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione alertas e logs detalhados para falhas do job de lembretes, incluindo tentativas de retry e um status visível no debug.
      Adicione filtros de período (ex.: últimos 7/30 dias) e por estágio no dashboard para eu analisar contagem e taxa de acerto com mais precisão.
      Implemente regras de autenticação e permissões (RBAC) por função para restringir acesso à tela de debug, auditoria e exportação do SRS.
      Implemente um centro de notificações no app para eu ver e marcar como lidas as mensagens de lembretes do SRS.
    </div>
  );
}