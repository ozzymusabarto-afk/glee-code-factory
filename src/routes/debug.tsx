import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Criar validações e testes para o botão [Revisão Livre], garantindo que novos conteúdos sejam bloqueados e eu permaneça apenas no modo SRS de frases já aprendidas.Adicionar um evento de analytics/log quando eu atingir a meta do dia e quando eu clicar em [Finalizar Dia] ou [Revisão Livre].Implementar um reset automático do contador diário no localStorage com base no timezone do usuário para que a meta recomece corretamente a cada dia.Ajustar a lógica do useDailyTimer para contar somente o tempo em que eu estiver realmente com a lição em andamento e a aba em foco.
    </div>
  );
}