import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Adicione um fallback quando o webkitSpeechRecognition não estiver disponível, permitindo eu digitar a transcrição manualmente para ainda testar a lógica de similaridade. Implemente um estado de captura mais robusto para eu impedir cliques duplos no microfone e garantir que o botão de tentar novamente reinicie a sessão corretamente.Adicione um histórico das últimas tentativas com transcrição, Chunk atual e resultado (acerto/erro) para eu analisar meus testes depois. Implemente um painel de logs no debug para eu ver a transcrição final, a similaridade calculada e por que eu ganhei ou precisei repetir.Adicione um controle de configuração para eu ajustar o limite de 80% da similaridade e testar rapidamente diferentes valores durante o Shadowing.
    </div>
  );
}
