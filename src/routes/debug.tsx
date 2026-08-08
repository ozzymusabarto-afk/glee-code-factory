import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Configure permissões e trate casos de erro da API de voz (sem suporte, timeout, silêncio e negação de acesso) com mensagens amigáveis e opção de tentar de novo.Dispare animações de comemoração quando a similaridade for maior que 80% e, quando for menor, mostre uma mensagem clara para eu repetir com um botão de tentar novamente.Integre a lógica de Shadowing para comparar a fala transcrita com o Chunk atual e calcular a similaridade.Exiba a transcrição em tempo real na interface durante o reconhecimento de voz.Implemente um componente de Microfone usando a Web Speech API (webkitSpeechRecognition) para iniciar e parar a captura de fala.
    </div>
  );
}
