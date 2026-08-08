import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione um controle para eu ajustar o tamanho da janela usada no Shadowing (quantos chunks anteriores/segundos entram na comparação) para eu testar como isso afeta a similaridade.Permita exportar o histórico e os logs em JSON ou CSV com filtros (por idioma, data, resultado) e com um nome de arquivo automático para eu analisar subconjuntos dos testes.Gere um painel de estatísticas a partir do histórico (taxa de acerto, média de similaridade, distribuição por idioma) para eu entender rapidamente meu desempenho nos testes.Implemente um gráfico com seleção de intervalo e marcas de eventos (início/pausa/resultado) para eu correlacionar mudanças na similaridade com as partes específicas da transcrição.Adicione uma calibração do medidor de áudio com um limiar configurável para eu detectar quando a captura realmente está captando fala e reduzir erros por silêncio.
    </div>
  );
}
