import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Crie um recurso para eu salvar automaticamente as sessões e tentativas no banco e depois consultar por idioma e limiar na página de depuração. Adicione um indicador de status da conexão com o Supabase e mensagens de erro claras para eu saber quando o banco estiver indisponível.Configure as migrations e as políticas de RLS no Supabase para eu garantir que somente o usuário veja seus próprios dados.Implemente o salvamento automático do progresso do usuário no Supabase para eu não perder dados ao atualizar a página.
    </div>
  );
}
