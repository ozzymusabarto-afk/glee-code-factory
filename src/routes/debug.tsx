import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Configure as migrations e as políticas de RLS no Supabase para garantir que cada usuário só leia e atualize seus próprios dados de sessões, perfis e frases.Crie um indicador de status da conexão com o Supabase e mostre mensagens de erro claras com instruções de recuperação quando o banco estiver indisponível. Adicione filtros na página de depuração para eu consultar tentativas por idioma e limiar do medidor e também ordenar por score de similaridade e data antes de calcular estatísticas. Implemente o salvamento automático de sessões e tentativas no Supabase com tratamento de falhas e re-tentativas para eu não perder dados ao atualizar a página.
    </div>
  );
}
