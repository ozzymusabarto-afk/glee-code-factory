import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Criar um mock da camada de analytics nos testes E2E para eu poder validar os eventos disparados e payloads padronizados sem depender de rede.Implementar testes unitários para garantir que o tempo restante e as atualizações do aria-live funcionem corretamente quando a aba está em foco.Persistir a máquina de estados do [Revisão Livre] e o modo SRS no localStorage para continuar corretamente após recarregar a página.Adicionar um painel no debug que mostre o timezone detectado e o timestamp agendado para o reset diário.
    </div>
  );
}