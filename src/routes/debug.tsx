import { createFileRoute } from "@tanstack/react-router";
import { PolyMascot } from "@/components/poly/PolyMascot";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      2. Configuração do "Cérebro" de Dados (Supabase)

      Sem banco de dados, o progresso do usuário some ao atualizar a página.

      Ação: Conectar o projeto ao Supabase (Auth + Database).

      O que salvar agora:

      Tabela profiles: Salvar se o usuário é 'Kids' ou 'Adulto' e o saldo de minutos do dia.

      Tabela user_srs: Salvar quais frases o usuário já dominou para a fase de 'Absorver'.
    </div>
  );
}
