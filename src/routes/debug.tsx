import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: DebugPage,
});

function DebugPage() {
  return (
    <div className="p-20 whitespace-pre-wrap">
      Ajuste o componente de progresso e tempo restante para ter fallback acessível quando aria-live não estiver atualizado a tempo, garantindo leitura consistente por leitores de tela.Implemente um controle no debug para simular diferentes timezones e confirmar que o reset diário e o agendamento de timestamp continuam corretos.Crie um botão no painel de debug para exportar em JSON os eventos disparados, o estado atual e o timezone detectado para facilitar a análise durante a QA.Adicione testes E2E e unitários para verificar que a máquina de estados do [Revisão Livre] e o modo SRS persistidos no localStorage são restaurados corretamente após recarregar a página.Implemente uma validação de schema para os payloads de analytics no frontend para garantir que eventos como [Finalizar Dia] e [Revisão Livre] sempre sejam enviados com os campos esperados.
    </div>
  );
}