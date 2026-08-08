import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Implemente um modo de anonimização nos exports CSV/PDF/JSON para eu ocultar dados sensíveis antes de enviar ao suporte.Inclua um resumo executivo automático no PDF e no JSON de exportação (contagem por código de erro, top payloads, taxas de sucesso/erro e insights) para eu compartilhar com suporte rapidamente.Adicione uma busca dentro dos detalhes estruturados (payload enviado, resposta recebida e stacktrace) para eu encontrar rapidamente ocorrências por termos ou campos.Construa uma timeline cronológica de falhas de sync na aba de diagnóstico para eu visualizar sequência de eventos e correlação entre sessões e tentativas.Implemente filtros avançados na aba de diagnóstico (por período, idioma, limiar, código de erro e status de tentativa) para eu localizar falhas específicas mais rápido.
    </div>
  );
}
