import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Melhore o tratamento de erros do Supabase com mensagens mais específicas e botões de ação (tentar novamente, recarregar, diagnosticar) para eu recuperar mais rápido quando falhar.Implemente uma fila de sincronização offline/failed para eu reenviar sessões e tentativas ao Supabase automaticamente quando a conexão voltar.Construa gráficos e resumos automáticos na página de depuração para eu visualizar evolução por idioma e limiar do medidor ao longo do tempo.Adicione a opção de exportar tentativas filtradas para CSV (incluindo idioma, limiar, score de similaridade e data) para eu analisar em outro lugar.Implemente paginação ou infinite scroll na página de depuração para eu consultar muitas tentativas sem travar.
    </div>
  );
}
