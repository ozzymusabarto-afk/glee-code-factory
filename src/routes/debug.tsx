import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente um medidor de nível de áudio (volume/picos) junto do microfone para eu visualizar quando a captura está ativa e ajustar a captura melhor.Recalcule automaticamente a similaridade e atualize o resultado (acerto/erro) sempre que eu editar a transcrição manual no fallback.Inclua um seletor de idioma para o Web Speech API, para eu testar diferentes línguas e ver como isso afeta a similaridade. Adicione um gráfico da similaridade ao longo do tempo, mostrando como o valor muda conforme a fala é transcrita durante o Shadowing.Implemente a exportação do histórico de tentativas e do painel de logs em um arquivo JSON ou CSV para eu analisar meus testes depois.
    </div>
  );
}
