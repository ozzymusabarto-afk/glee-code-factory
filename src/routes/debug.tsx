import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione um relatório em CSV/JSON do SRS com próxima revisão, motivo do agendamento e resultado anterior, para eu auditar rapidamente o sistema.
      Permita que eu configure os intervalos do SRS (1 dia, 3 dias, 7 dias) nas configurações e veja o impacto imediato no agendamento.
      Implemente um job em segundo plano para eu buscar automaticamente as frases “devidas” no SRS e prepará-las para revisão no app.
      Adicione uma tela para eu marcar o resultado (acertou/errou) de cada frase e confirmar a próxima data de revisão calculada pelo SRS.
    </div>
  );
}