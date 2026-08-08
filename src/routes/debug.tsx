import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Atualizar o debug para incluir um checklist específico do SRS, destacando quais frases tiveram agendamento calculado corretamente e quais falharam nas validações.
      Implementar testes E2E e/ou unitários para validar que as transições de estágio e o agendamento do SRS funcionam corretamente após acertos e erros.
      Criar uma tela/visão no app para listar as frases no estágio 'Absorver', mostrando a data prevista da próxima revisão e o motivo do agendamento.
      Adicionar persistência no banco para registrar datas de próximas revisões, status de acerto/erro e histórico por frase para o SRS.
      Implementar o algoritmo simples de intervalos do SRS (1 dia, 3 dias, 7 dias) para o estágio 'Absorver' e ajustar as próximas revisões conforme acerto/erro.
    </div>
  );
}