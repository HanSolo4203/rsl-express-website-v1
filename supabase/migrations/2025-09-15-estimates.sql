-- Table to store estimates
create table if not exists public.estimates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  business_name text,
  email text not null,
  phone text,
  weekly_items jsonb not null, -- user-entered counts keyed by price item code
  weekly_mode text not null,   -- "per-item" | "per-kg" | "mixed"
  bulk_by_kg jsonb,            -- { wdifKg?: number, wdfKg?: number, colorSeparated?: boolean }
  weekly_subtotals jsonb not null, -- per line-item subtotal numbers
  weekly_total numeric not null,
  pricing_version text not null default '2025-pricelist',
  user_agent text,
  ip text
);

-- Enable RLS
alter table public.estimates enable row level security;

-- Allow anyone (anon) to insert, but not read/update/delete
create policy "allow insert for anon"
on public.estimates for insert
to anon
with check (true);

create policy "deny select for anon"
on public.estimates for select
to anon
using (false);

-- Optional: allow service_role to read everything (server dashboards)
-- (service_role bypasses RLS automatically)
