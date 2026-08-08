import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Crie uma aba de diagnóstico que liste as últimas falhas de sync e as últimas consultas ao Supabase com códigos de erro e ações recomendadas.Implemente a opção de exportar o resumo e os gráficos do período filtrado em um PDF para eu compartilhar ou arquivar.
    </div>
  );
}
