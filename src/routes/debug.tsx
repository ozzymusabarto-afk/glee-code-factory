import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Incluir um ID de correlação em cada solicitação ao Supabase para eu rastrear facilmente quais sessões e tentativas geraram cada falha de sync. Adicionar atualização em tempo real na aba de diagnóstico para eu ver novas falhas e consultas ao Supabase sem precisar recarregar a página.Implementar um botão para eu copiar os detalhes de cada falha de sync (código de erro, mensagem e contexto) para compartilhar com suporte.
    </div>
  );
}
