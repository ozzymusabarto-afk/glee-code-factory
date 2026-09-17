<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Diretrizes de Desenvolvimento e Visualização

### Servidor Local de Desenvolvimento (Sempre Ativo)
- Todas as vezes que este projeto for aberto ou trabalhado, garanta que o servidor de desenvolvimento esteja em execução contínua em segundo plano (`cmd /c "npm run dev"` como daemon).
- O usuário deve poder visualizar a aplicação a qualquer momento no navegador em `http://localhost:8080/`.
- Nunca encerre o processo do servidor dev ao finalizar tarefas, a menos que expressamente solicitado pelo usuário.
