import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicionar um assistente de calibração guiado com amostra de áudio e recomendação de limiar para eu reduzir detecções falsas por silêncio.Exibir os trechos/segmentos do Shadowing que mais influenciaram a similaridade (top-N) para eu entender por que o resultado mudou.Criar uma timeline clicável que mostre cada tentativa com a transcrição e o chunk comparado lado a lado para eu depurar facilmente.Salvar automaticamente janela do Shadowing, limiar do medidor de áudio e idioma usando localStorage para eu manter meus testes consistentes.
    </div>
  );
}
