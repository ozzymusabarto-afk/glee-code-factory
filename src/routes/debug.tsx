import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      🛠️ Próximos Passos: Da Interface para a Inteligência

      Agora que o PolyBot já "parece" um app, precisamos fazer ele "funcionar" como um professor. Aqui estão os 4 pilares da próxima fase:

      1. Implementação do "Ouvido" do Robô (Web Speech API)

      O diferencial do PolyBot é o Shadowing. Você precisa pedir ao Lovable para integrar o reconhecimento de voz nativo do navegador.

      Ação: Crie um componente de Microfone que use a webkitSpeechRecognition.

      Prompt Sugerido: "Implemente a lógica de reconhecimento de voz no estágio de Shadowing. Quando o usuário clicar no microfone, o app deve ouvir, transformar em texto e comparar com o 'Chunk' atual. Se a similaridade for maior que 80%, o Robô deve comemorar. Se for menor, ele deve pedir para repetir."

      <PolyMascot size="sm" />
    </div>
  );
}
