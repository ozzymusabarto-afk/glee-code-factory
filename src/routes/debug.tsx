import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Configure permissões, estados de carregamento e tratamento de erros da API de voz (ex.: sem suporte, timeout, silêncio, negação de acesso) com mensagens amigáveis. Adicione um fluxo quando a similaridade for menor que 80%, exibindo uma mensagem clara para eu repetir e permitindo tentar novamente com um clique. Integre a lógica do Shadowing para comparar a fala transcrita com o Chunk atual e disparar animações de comemoração quando a similaridade for maior que 80%.Implemente um componente de Microfone que use a Web Speech API (webkitSpeechRecognition) para capturar fala e exibir a transcrição em tempo real.Adicione um fluxo quando a similaridade for menor que 80%, exibindo uma mensagem clara para eu repetir e permitindo tentar novamente com um clique. Integre a lógica do Shadowing para comparar a fala transcrita com o Chunk atual e disparar animações de comemoração quando a similaridade for maior que 80%.Implemente um componente de Microfone que use a Web Speech API (webkitSpeechRecognition) para capturar fala e exibir a transcrição em tempo real.
    </div>
  );
}
