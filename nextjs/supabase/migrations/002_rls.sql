-- 002_rls.sql — Row Level Security
-- Run second. Enables RLS and adds read policies for public auction data.
-- Bids are readable; inserts go via place_bid() with auth.

alter table public.users enable row level security;
alter table public.auctions enable row level security;
alter table public.spots enable row level security;
alter table public.bids enable row level security;
alter table public.payments enable row level security;

-- Public can read active auctions and spots
drop policy if exists "public read auctions" on public.auctions;
create policy "public read auctions" on public.auctions for select using (true);

drop policy if exists "public read spots" on public.spots;
create policy "public read spots" on public.spots for select using (true);

-- Bids readable (for leaderboard / history)
drop policy if exists "public read bids" on public.bids;
create policy "public read bids" on public.bids for select using (true);

-- Users can read/update own profile
drop policy if exists "users self read" on public.users;
create policy "users self read" on public.users for select using (auth.uid() = id);
drop policy if exists "users self insert" on public.users;
create policy "users self insert" on public.users for insert with check (auth.uid() = id);
drop policy if exists "users self update" on public.users;
create policy "users self update" on public.users for update using (auth.uid() = id);

-- Payments: only owner can read own
drop policy if exists "payments owner read" on public.payments;
create policy "payments owner read" on public.payments for select using (auth.uid() = user_id);

-- No direct insert policies for bids/spots — must use RPC place_bid()
-- Realtime: allow Postgres Changes on spots/bids for authenticated + anon
-- (Supabase dashboard → Database → Realtime → enable replication for spots, bids)
