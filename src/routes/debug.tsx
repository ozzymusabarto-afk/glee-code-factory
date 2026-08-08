import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Valide o schema do arquivo JSON importado e mostre mensagens de erro claras para eu evitar configurações inconsistentes.Gere um relatório em PDF com as estatísticas da timeline e os principais resultados para eu compartilhar meus testes. Adicione um modo para eu marcar automaticamente as tentativas com maior queda de similaridade e abrir o par transcrição/chunk correspondente em foco.Implemente filtros na página de depuração para eu filtrar tentativas por idioma, limiar do medidor e faixa da timeline antes de calcular as estatísticas.Adicione uma comparação lado a lado entre duas sessões importadas (taxa de acerto e similaridade) para eu ver melhorias entre configurações.
    </div>
  );
}
