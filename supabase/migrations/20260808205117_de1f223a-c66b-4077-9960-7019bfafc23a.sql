-- Set search_path for SECURITY DEFINER functions
alter function public.handle_new_user() set search_path = public;
alter function public.has_role(uuid, app_role) set search_path = public;

-- Also good practice for other functions
alter function public.handle_updated_at() set search_path = public;

-- Revoke execute from public/anon/authenticated roles for internal triggers
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

revoke execute on function public.handle_updated_at() from public;
revoke execute on function public.handle_updated_at() from anon;
revoke execute on function public.handle_updated_at() from authenticated;
