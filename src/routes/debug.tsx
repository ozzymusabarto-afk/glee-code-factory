import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente alertas na aba de diagnóstico quando ocorrerem falhas repetidas (mesmo código de erro e mesmo padrão) para eu ser notificado sem precisar verificar manualmente.Adicione um botão para eu baixar um pacote único (JSON) com logs e dados relevantes da aba de diagnóstico para eu enviar ao suporte. Permita que eu visualize detalhes estruturados de cada falha de sync (payload enviado, resposta recebida e stacktrace quando disponível) para eu depurar mais rápido.Inclua o ID de correlação nos exports CSV e no PDF de diagnóstico para eu rastrear cada falha no histórico compartilhado.
    </div>
  );
}
