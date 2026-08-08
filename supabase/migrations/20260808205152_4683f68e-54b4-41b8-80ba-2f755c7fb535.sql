-- Policy for user_roles
create policy "Users can view own roles" on public.user_roles
    for select to authenticated using (auth.uid() = user_id);

-- Restrict execute on has_role
revoke execute on function public.has_role(uuid, app_role) from public;
revoke execute on function public.has_role(uuid, app_role) from anon;
-- Authenticated users need to execute it for RLS policies
grant execute on function public.has_role(uuid, app_role) to authenticated;
