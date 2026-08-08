import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Permita que eu selecione um intervalo na timeline e veja as estatísticas daquele recorte (taxa de acerto e similaridade média) para eu identificar rapidamente padrões nos testes.Inclua uma opção para eu recalibrar o medidor de áudio automaticamente ao iniciar uma nova sessão, garantindo que o limiar continue adequado para o meu ambiente.Adicione um recurso para eu importar um arquivo JSON com janela do Shadowing, limiar do medidor e idioma, para eu repetir testes com configurações anteriores.Implemente um botão para eu exportar automaticamente o histórico e los logs filtrados em CSV e JSON a partir da página de depuração, com um nome de arquivo gerado por data e idioma.
    </div>
  );
}
