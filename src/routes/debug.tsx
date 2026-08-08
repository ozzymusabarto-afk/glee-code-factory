import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicionar a exportação de um relatório em HTML ou PDF que consolide o resultado das validações, o timezone detectado, e um resumo das falhas/alertas encontradas na auditoria da timeline.Implementar testes E2E que confirmem que cada passo do modo de auditoria gera exatamente uma atualização relevante no aria-live e que não existem leituras/atualizações duplicadas durante a navegação por passos.Adicionar um modo de perfilagem no debug para medir tempo de renderização, custo de busca e desempenho da paginação/virtualização ao navegar por milhares de eventos.Implementar uma validação de integridade no debug que calcule um checksum/hash do CSV exportado e verifique automaticamente a coerência entre timestamps, transições do [Revisão Livre] e mensagens do aria-live antes de aceitar o arquivo.
    </div>
  );
}