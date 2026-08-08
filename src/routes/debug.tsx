import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Melhore a página /src/routes/debug.tsx para eu testar rapidamente o reconhecimento de voz, ver o texto transcrito e depurar a similaridade.Adicione tratamento de erros (sem suporte, timeout, silêncio e negação de acesso) com mensagens amigáveis e um botão para eu tentar novamente. Integre a lógica do Shadowing para comparar a fala transcrita com o Chunk atual e calcular a similaridade. Exiba a transcrição em tempo real na tela durante o reconhecimento de voz, atualizando conforme a fala é capturada.Implemente um componente de Microfone na interface que use a Web Speech API (webkitSpeechRecognition) para iniciar e parar a captura de fala.
    </div>
  );
}
