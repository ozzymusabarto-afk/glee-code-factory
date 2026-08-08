import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Permita que eu busque e ordene as tentativas (por idioma, limiar do medidor, score de similaridade e data) para eu encontrar padrões mais rápido.
    </div>
  );
}
