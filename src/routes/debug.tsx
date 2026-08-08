import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicionar testes de robustez para garantir que o localStorage funcione corretamente em cenários de privacidade/bloqueio de armazenamento, mostrando um comportamento alternativo e coberturas de teste.Aprimorar o fallback do aria-live para garantir que a mensagem de tempo restante seja atualizada com prioridade e sem duplicar leituras, mesmo quando o navegador atrasar a renderização.Adicionar um modo de replay no debug para reexecutar uma sequência gravada de eventos e inspecionar como o estado e o tempo restante evoluem passo a passo.Implementar validações de UI para impedir ações do usuário (como [Finalizar Dia] e iniciar conteúdo) quando a máquina de estados do [Revisão Livre] estiver bloqueando, com mensagens claras e testes E2E cobrindo os fluxos.Adicionar no painel de debug a opção de exportar um arquivo JSON com o histórico completo de eventos disparados, timestamps e mudanças de estado da máquina do [Revisão Livre].
    </div>
  );
}