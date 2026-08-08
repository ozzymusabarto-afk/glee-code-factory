import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione testes de integração para o useDailyTimer cobrindo mudanças de foco da aba e cenários de timeout/pausa para assegurar a contagem correta do tempo em lições ativas.Defina um schema único de eventos para meta do dia e cliques em [Finalizar Dia] e [Revisão Livre], garantindo nomes consistentes, payloads padronizados e testes de validação do formato.Implemente uma barra de progresso com tempo restante estimado da meta do dia, atualizando somente quando a lição estiver em andamento e a aba estiver em foco.Exiba uma mensagem de contexto e ações sugeridas quando [Revisão Livre] estiver bloqueando novos conteúdos, incluindo o motivo e o que o usuário precisa fazer para retomar.Implemente uma máquina de estados para [Revisão Livre] e modo SRS, garantindo que a UI e as regras de bloqueio/retomada fiquem consistentes em todos os cenários.
    </div>
  );
}