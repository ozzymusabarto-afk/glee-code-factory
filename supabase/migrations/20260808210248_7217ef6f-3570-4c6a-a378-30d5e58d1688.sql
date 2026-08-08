-- 1. Allow users to create their own profile row
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 2. Lock down user_roles writes (privilege escalation prevention)
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_roles FROM anon;
GRANT ALL ON public.user_roles TO service_role;

CREATE OR REPLACE FUNCTION public.prevent_role_self_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
begin
  if current_setting('role', true) = 'service_role'
     or session_user in ('postgres', 'supabase_admin', 'supabase_auth_admin') then
    return coalesce(new, old);
  end if;
  raise exception 'Role assignments can only be modified by trusted server-side processes';
end;
$$;

DROP TRIGGER IF EXISTS user_roles_guard ON public.user_roles;
CREATE TRIGGER user_roles_guard
BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_assignment();

-- 3. Revoke direct EXECUTE on SECURITY DEFINER functions from client roles
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_role_self_assignment() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;