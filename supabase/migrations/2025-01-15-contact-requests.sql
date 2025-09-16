-- Table to store contact form submissions
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  business_name text not null,
  email text not null,
  phone text not null,
  service_area text not null,
  number_of_rooms integer not null,
  estimated_linens integer not null,
  message text,
  ip_address text,
  user_agent text
);

-- Enable RLS
alter table public.contact_requests enable row level security;

-- Allow anyone (anon) to insert, but not read/update/delete
create policy "allow insert for anon" on public.contact_requests for insert to anon with check (true);
create policy "deny select for anon" on public.contact_requests for select to anon using (false);

-- Optional: allow service_role to read everything (server dashboards)
-- (service_role bypasses RLS automatically)
