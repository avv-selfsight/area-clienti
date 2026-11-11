-- =====================================================================
-- Area clienti Selfsight: schema del database (Supabase / PostgreSQL)
-- Da eseguire una sola volta in Supabase > SQL Editor > New query > Run
-- =====================================================================

-- ---------- Profili utente ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'client' check (role in ('admin','client')),
  created_at  timestamptz not null default now()
);

-- Crea il profilo in automatico quando nasce un utente
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profili per gli utenti già esistenti (se ce ne sono)
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- ---------- Progetti e membri ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (length(name) between 1 and 200),
  norm        text not null check (norm in ('27001','9001')),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.project_members (
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (project_id, user_id)
);

-- ---------- Funzioni di controllo accesso ----------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Un cliente accede solo ai progetti di cui è membro e solo se il progetto è attivo
create or replace function public.can_access(p uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (
    select 1 from public.project_members m
    join public.projects pr on pr.id = m.project_id
    where m.project_id = p and m.user_id = auth.uid() and pr.active
  );
$$;

-- ---------- Stato dei punti norma ----------
create table if not exists public.item_status (
  project_id  uuid not null references public.projects(id) on delete cascade,
  item_id     text not null,
  status      smallint not null default 0 check (status between 0 and 3),
  updated_by  uuid references public.profiles(id),
  updated_at  timestamptz not null default now(),
  primary key (project_id, item_id)
);

-- ---------- Stato dei documenti ----------
create table if not exists public.doc_status (
  project_id  uuid not null references public.projects(id) on delete cascade,
  doc_id      text not null,
  status      text not null default 'da_fare'
              check (status in ('da_fare','bozza','in_revisione','da_rivedere','approvato','non_applicabile')),
  review_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  updated_by  uuid references public.profiles(id),
  updated_at  timestamptz not null default now(),
  primary key (project_id, doc_id)
);

-- ---------- Versioni dei file ----------
create table if not exists public.doc_files (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  doc_id      text not null,
  path        text not null unique,
  name        text not null,
  size        bigint,
  uploaded_by uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

-- ---------- Commenti ----------
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  ref         text not null,
  body        text not null check (length(body) between 1 and 4000),
  user_id     uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);

-- ---------- Registro delle attività (scritto solo dai trigger) ----------
create table if not exists public.activity (
  id          bigserial primary key,
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid references public.profiles(id),
  ref         text,
  action      text not null,
  detail      text,
  created_at  timestamptz not null default now()
);

create index if not exists activity_project_idx on public.activity (project_id, created_at desc);
create index if not exists comments_project_idx on public.comments (project_id, created_at);
create index if not exists doc_files_project_idx on public.doc_files (project_id, doc_id, created_at desc);

-- ---------- Trigger: autore e data sempre impostati dal server ----------
create or replace function public.stamp_item()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_by := auth.uid();
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists item_status_stamp on public.item_status;
create trigger item_status_stamp before insert or update on public.item_status
  for each row execute function public.stamp_item();

create or replace function public.stamp_author()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'comments' then new.user_id := auth.uid();
  elsif tg_table_name = 'doc_files' then new.uploaded_by := auth.uid();
  end if;
  return new;
end $$;

drop trigger if exists comments_stamp on public.comments;
create trigger comments_stamp before insert on public.comments
  for each row execute function public.stamp_author();
drop trigger if exists doc_files_stamp on public.doc_files;
create trigger doc_files_stamp before insert on public.doc_files
  for each row execute function public.stamp_author();

-- ---------- Trigger: solo la consulente approva ----------
create or replace function public.guard_doc_status()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  adm boolean := public.is_admin();
begin
  new.updated_by := auth.uid();
  new.updated_at := now();
  if not adm then
    if new.status in ('approvato','da_rivedere','non_applicabile')
       and (tg_op = 'INSERT' or new.status is distinct from old.status) then
      raise exception 'Solo la consulente può approvare un documento, rimandarlo indietro o dichiararlo non applicabile';
    end if;
    if tg_op = 'UPDATE' then
      new.review_note := old.review_note;
      new.reviewed_by := old.reviewed_by;
      new.reviewed_at := old.reviewed_at;
      if old.status in ('approvato','non_applicabile')
         and new.status is distinct from old.status and new.status <> 'in_revisione' then
        raise exception 'Un documento approvato si può solo ripresentare in revisione';
      end if;
    else
      new.review_note := null; new.reviewed_by := null; new.reviewed_at := null;
    end if;
  else
    if new.status in ('approvato','da_rivedere','non_applicabile')
       and (tg_op = 'INSERT' or new.status is distinct from old.status) then
      new.reviewed_by := auth.uid();
      new.reviewed_at := now();
    end if;
  end if;
  return new;
end $$;

drop trigger if exists doc_status_guard on public.doc_status;
create trigger doc_status_guard before insert or update on public.doc_status
  for each row execute function public.guard_doc_status();

-- ---------- Trigger: registro delle attività ----------
create or replace function public.log_activity()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'item_status' then
    if tg_op = 'INSERT' or new.status is distinct from old.status then
      insert into public.activity (project_id, user_id, ref, action, detail)
      values (new.project_id, auth.uid(), new.item_id, 'item', new.status::text);
    end if;
  elsif tg_table_name = 'doc_status' then
    if tg_op = 'INSERT' or new.status is distinct from old.status then
      insert into public.activity (project_id, user_id, ref, action, detail)
      values (new.project_id, auth.uid(), new.doc_id, 'doc', new.status);
    end if;
  elsif tg_table_name = 'doc_files' then
    insert into public.activity (project_id, user_id, ref, action, detail)
    values (new.project_id, auth.uid(), new.doc_id, 'file', new.name);
  elsif tg_table_name = 'comments' then
    insert into public.activity (project_id, user_id, ref, action, detail)
    values (new.project_id, auth.uid(), new.ref, 'comment', left(new.body, 140));
  end if;
  return new;
end $$;

drop trigger if exists item_status_log on public.item_status;
create trigger item_status_log after insert or update on public.item_status
  for each row execute function public.log_activity();
drop trigger if exists doc_status_log on public.doc_status;
create trigger doc_status_log after insert or update on public.doc_status
  for each row execute function public.log_activity();
drop trigger if exists doc_files_log on public.doc_files;
create trigger doc_files_log after insert on public.doc_files
  for each row execute function public.log_activity();
drop trigger if exists comments_log on public.comments;
create trigger comments_log after insert on public.comments
  for each row execute function public.log_activity();

-- ---------- Regole di accesso (Row Level Security) ----------
alter table public.profiles        enable row level security;
alter table public.projects        enable row level security;
alter table public.project_members enable row level security;
alter table public.item_status     enable row level security;
alter table public.doc_status      enable row level security;
alter table public.doc_files       enable row level security;
alter table public.comments        enable row level security;
alter table public.activity        enable row level security;

-- Profili: ognuno vede il proprio, la consulente vede tutti, i clienti vedono
-- la consulente e i colleghi dei propri progetti. Solo la consulente modifica.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (
  id = auth.uid() or public.is_admin() or role = 'admin' or exists (
    select 1 from public.project_members a
    join public.project_members b on a.project_id = b.project_id
    where a.user_id = auth.uid() and b.user_id = profiles.id
  )
);
drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Progetti
drop policy if exists projects_select on public.projects;
create policy projects_select on public.projects for select to authenticated using (public.can_access(id));
drop policy if exists projects_admin_all on public.projects;
create policy projects_admin_all on public.projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Membri
drop policy if exists members_select on public.project_members;
create policy members_select on public.project_members for select to authenticated
  using (public.is_admin() or (user_id = auth.uid() and public.can_access(project_id)));
drop policy if exists members_admin_all on public.project_members;
create policy members_admin_all on public.project_members for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Stato dei punti norma
drop policy if exists item_select on public.item_status;
create policy item_select on public.item_status for select to authenticated using (public.can_access(project_id));
drop policy if exists item_insert on public.item_status;
create policy item_insert on public.item_status for insert to authenticated with check (public.can_access(project_id));
drop policy if exists item_update on public.item_status;
create policy item_update on public.item_status for update to authenticated
  using (public.can_access(project_id)) with check (public.can_access(project_id));
drop policy if exists item_delete on public.item_status;
create policy item_delete on public.item_status for delete to authenticated using (public.is_admin());

-- Stato dei documenti
drop policy if exists doc_select on public.doc_status;
create policy doc_select on public.doc_status for select to authenticated using (public.can_access(project_id));
drop policy if exists doc_insert on public.doc_status;
create policy doc_insert on public.doc_status for insert to authenticated with check (public.can_access(project_id));
drop policy if exists doc_update on public.doc_status;
create policy doc_update on public.doc_status for update to authenticated
  using (public.can_access(project_id)) with check (public.can_access(project_id));
drop policy if exists doc_delete on public.doc_status;
create policy doc_delete on public.doc_status for delete to authenticated using (public.is_admin());

-- Versioni dei file
drop policy if exists files_select on public.doc_files;
create policy files_select on public.doc_files for select to authenticated using (public.can_access(project_id));
drop policy if exists files_insert on public.doc_files;
create policy files_insert on public.doc_files for insert to authenticated with check (public.can_access(project_id));
drop policy if exists files_delete on public.doc_files;
create policy files_delete on public.doc_files for delete to authenticated using (public.is_admin());

-- Commenti
drop policy if exists comments_select on public.comments;
create policy comments_select on public.comments for select to authenticated using (public.can_access(project_id));
drop policy if exists comments_insert on public.comments;
create policy comments_insert on public.comments for insert to authenticated with check (public.can_access(project_id));
drop policy if exists comments_delete on public.comments;
create policy comments_delete on public.comments for delete to authenticated using (public.is_admin());

-- Attività: solo lettura
drop policy if exists activity_select on public.activity;
create policy activity_select on public.activity for select to authenticated using (public.can_access(project_id));

-- ---------- Archivio dei file (Storage) ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('documenti', 'documenti', false, 52428800)
on conflict (id) do nothing;

-- Percorso dei file: <id progetto>/<id documento>/<data>_<nome file>
drop policy if exists documenti_read on storage.objects;
create policy documenti_read on storage.objects for select to authenticated using (
  bucket_id = 'documenti' and public.can_access(((storage.foldername(name))[1])::uuid)
);
drop policy if exists documenti_insert on storage.objects;
create policy documenti_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'documenti' and public.can_access(((storage.foldername(name))[1])::uuid)
);
drop policy if exists documenti_delete on storage.objects;
create policy documenti_delete on storage.objects for delete to authenticated using (
  bucket_id = 'documenti' and public.is_admin()
);

-- =====================================================================
-- ULTIMO PASSO, da eseguire DOPO aver creato il tuo utente:
-- sostituisci l'indirizzo e lancia solo questa riga per diventare consulente.
--
-- update public.profiles set role = 'admin', full_name = 'Veronica Paolucci'
-- where email = 'TUA-EMAIL@esempio.it';
-- =====================================================================
