import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente a lógica de Temporizador de Sessão Diária de 10 minutos. 1. Crie um hook 'useDailyTimer' que persista no localStorage o tempo gasto hoje. 2. Ao atingir 10 minutos de uso ativo em lições, dispare um componente de Overlay de celebração chamado 'DailyGoalReached'. 3. Este overlay deve dizer: '🏆 Meta do Dia Concluída!'. Adicione uma mensagem pedagógica: 'Seu cérebro atingiu o pico de absorção. Para consolidar este conhecimento, o PolyBot recomenda o descanso.'. 4. Ofereça dois botões no Overlay: [Finalizar Dia] (redireciona ao dashboard) e [Revisão Livre] (permite continuar apenas no modo SRS de frases já aprendidas, bloqueando novos conteúdos).
    </div>
  );
}