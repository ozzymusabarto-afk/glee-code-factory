import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione uma configuração para ajustar a duração da meta diária (ex.: 10 minutos) e garanta que o reset diário por timezone continua correto e testado.Melhore a barra de progresso e o tempo restante para acessibilidade, incluindo aria-live para atualização em tempo real e testes de leitura por leitores de tela.Crie uma área no debug.tsx para inspecionar em tempo real o estado do useDailyTimer, a máquina de estados do [Revisão Livre] e a lista de eventos disparados com payloads padronizados.Adicione um teste E2E que ativa o modo SRS via [Revisão Livre], tenta acessar novos conteúdos e confirma que a UI bloqueia e exibe a mensagem de motivo com a ação necessária para retomar.Implemente um teste E2E que simula usar lições até atingir 10 minutos, abre o overlay do DailyGoalReached e valida que [Finalizar Dia] redireciona corretamente para o dashboard.
    </div>
  );
}