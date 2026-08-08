import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Inclua um histórico/audit log por frase no debug para eu acompanhar cada transição de estágio, motivo do agendamento e validações que foram aplicadas.
      Crie uma UI para eu marcar acertou/errou em cada frase e atualizar automaticamente a próxima data de revisão calculada pelo SRS no banco.
      Implemente e documente o job em segundo plano que busca automaticamente as frases “devidas” no SRS e as disponibiliza para revisão no app, com status e logs no debug.
      Adicione uma tela de configurações para editar os intervalos do SRS (1 dia, 3 dias, 7 dias) e recalcular imediatamente a próxima revisão das frases já existentes.
      Implemente a exportação em CSV e JSON do SRS com próxima revisão, motivo do agendamento e resultado anterior, incluindo filtros por data e estágio.
    </div>
  );
}