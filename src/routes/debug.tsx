import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione no debug uma seção com um checklist de campos esperados do analytics, destacando quais payloads passaram ou falharam na validação em tempo real.Implemente testes E2E para confirmar que a timeline do timer diário atualiza a cada segundo e que as transições e mensagens do aria-live aparecem na ordem correta.Melhore os controles do debug para que a busca por texto e a ordenação funcionem corretamente mesmo com milhares de eventos, com paginação ou virtualização.Implemente um modo de auditoria no debug que bloqueie interações do usuário e permita navegar pela timeline usando controles de passo a passo.Adicione um botão no debug para exportar a timeline sincronizada em CSV, incluindo timestamps, tipo de evento e transições de estado do [Revisão Livre].
    </div>
  );
}