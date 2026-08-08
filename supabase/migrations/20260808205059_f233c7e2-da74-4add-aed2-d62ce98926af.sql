-- Enable user roles system
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Profiles table
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    app_mode text default 'kids',
    streak_count integer default 0,
    last_lesson_date timestamp with time zone,
    daily_timer_seconds integer default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
    for select to authenticated using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
    for update to authenticated using (auth.uid() = id);

-- Chunks table (SRS mastery)
create table public.chunks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    chunk_id text not null, -- Unique identifier for the learning chunk
    mastery_level integer default 0,
    next_review_date timestamp with time zone,
    last_reviewed_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(user_id, chunk_id)
);

grant select, insert, update, delete on public.chunks to authenticated;
grant all on public.chunks to service_role;

alter table public.chunks enable row level security;

create policy "Users can manage own chunks" on public.chunks
    for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Helper for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
    for each row execute function public.handle_updated_at();

create trigger chunks_updated_at before update on public.chunks
    for each row execute function public.handle_updated_at();

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id)
    values (new.id);
    
    insert into public.user_roles (user_id, role)
    values (new.id, 'user');
    
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
