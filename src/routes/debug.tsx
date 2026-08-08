import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione testes E2E que validem o conteúdo do CSV exportado, confirmando as colunas, a ordem por timestamp e a coerência entre transições de estado do [Revisão Livre] e os eventos registrados.Garanta que os filtros, busca e ordenação do debug sejam persistidos entre recarregamentos e que a paginação/virtualização mantenha a posição correta da timeline.Implemente no modo de auditoria do debug marcadores visuais por passo para destacar qual transição de estado do [Revisão Livre] foi executada e qual mensagem do aria-live corresponde a cada passo.Adicione no debug a opção de exportar a timeline sincronizada em CSV incluindo também as mensagens do aria-live e o timezone detectado em colunas separadas.
    </div>
  );
}