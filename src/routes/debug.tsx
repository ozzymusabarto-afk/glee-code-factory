import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione um painel no debug com um resumo executivo do job de lembretes (sucessos, falhas, tempo médio, top erros) para os últimos N dias.
      Adicione filtros avançados no histórico de execuções para eu buscar rapidamente por tipo de erro, mensagem e ID da execução.
      Implemente atualizações em tempo real do status e logs do job na página de debug usando streaming (ex: SSE ou WebSocket).
    </div>
  );
}