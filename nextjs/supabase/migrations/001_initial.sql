-- 001_initial.sql — BrandMyAsus Phase 1
-- Run first. Creates users/auctions/spots/bids/payments.
-- Uses demo auction data; replace with real pricing before launch.

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Users mirror auth.users (optional profile)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.auctions (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'BrandMyAsus — Launch Auction',
  currency text not null default 'EUR',
  starting_bid integer not null default 59,
  bid_increment integer not null default 10,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null default (now() + interval '14 days'),
  status text not null default 'active' check (status in ('active','ended','cancelled')),
  machine_price integer not null default 1529,
  goal integer not null default 2529,
  created_at timestamptz default now()
);

create table if not exists public.spots (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auctions(id) on delete cascade,
  number integer not null,
  zone text not null check (zone in ('lid','inside','gear')),
  label text not null,
  dims text not null default '4 × 4 cm',
  size text not null default 'S',
  current_bid integer not null default 59,
  highest_bidder_id uuid references public.users(id),
  total_bids integer not null default 0,
  created_at timestamptz default now(),
  unique(auction_id, number)
);

create table if not exists public.bids (
  id uuid primary key default gen_random_uuid(),
  auction_id uuid not null references public.auctions(id) on delete cascade,
  spot_id uuid not null references public.spots(id) on delete cascade,
  bidder_id uuid not null references public.users(id) on delete cascade,
  amount integer not null check (amount > 0),
  created_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  bid_id uuid references public.bids(id) on delete set null,
  provider text not null default 'stripe',
  provider_payment_id text,
  amount integer not null,
  currency text not null default 'EUR',
  status text not null default 'pending' check (status in ('pending','succeeded','refunded','failed')),
  created_at timestamptz default now()
);

-- Demo seed: one active auction + 20 spots (prices from lib/data.ts demo)
insert into public.auctions (id, name, currency, starting_bid, bid_increment, status, machine_price, goal)
values ('00000000-0000-0000-0000-000000000001','BrandMyAsus — Demo Auction','EUR',59,10,'active',1529,2529)
on conflict (id) do nothing;

insert into public.spots (auction_id, number, zone, label, dims, size, current_bid, total_bids) values
('00000000-0000-0000-0000-000000000001', 1, 'lid', 'Top left banner','9.5 × 5.5 cm','L',1300,7),
('00000000-0000-0000-0000-000000000001', 2, 'lid', 'Marquee — above logo','9.5 × 5.5 cm','L',1715,3),
('00000000-0000-0000-0000-000000000001', 3, 'lid', 'Top right banner','9.5 × 5.5 cm','L',1010,19),
('00000000-0000-0000-0000-000000000001', 4, 'lid', 'Middle left','4.5 × 4.5 cm','S',375,17),
('00000000-0000-0000-0000-000000000001', 5, 'lid', 'Inner left — beside logo','4.5 × 4.5 cm','S',410,12),
('00000000-0000-0000-0000-000000000001', 6, 'lid', 'Inner right — beside logo','4.5 × 4.5 cm','S',387,13),
('00000000-0000-0000-0000-000000000001', 7, 'lid', 'Middle right','4.5 × 4.5 cm','S',370,11),
('00000000-0000-0000-0000-000000000001', 8, 'lid', 'Bottom left strip','9.5 × 4 cm','M',676,14),
('00000000-0000-0000-0000-000000000001', 9, 'lid', 'Bottom center — under logo','9.5 × 4 cm','M',820,22),
('00000000-0000-0000-0000-000000000001',10, 'lid', 'Bottom right strip','9.5 × 4 cm','M',550,16),
('00000000-0000-0000-0000-000000000001',11, 'inside','Left palm rest — 1','4 × 4 cm','S',39,1),
('00000000-0000-0000-0000-000000000001',12, 'inside','Left palm rest — 2','4 × 4 cm','S',59,1),
('00000000-0000-0000-0000-000000000001',13, 'inside','Left palm rest — 3','4 × 4 cm','S',39,1),
('00000000-0000-0000-0000-000000000001',14, 'inside','Left palm rest — 4','4 × 4 cm','S',59,1),
('00000000-0000-0000-0000-000000000001',15, 'inside','Right palm rest — 1','4 × 4 cm','S',76,1),
('00000000-0000-0000-0000-000000000001',16, 'inside','Right palm rest — 2','4 × 4 cm','S',49,2),
('00000000-0000-0000-0000-000000000001',17, 'inside','Right palm rest — 3','4 × 4 cm','S',59,0),
('00000000-0000-0000-0000-000000000001',18, 'inside','Right palm rest — 4','4 × 4 cm','S',39,1),
('00000000-0000-0000-0000-000000000001',19, 'gear','Charger + cable','5 × 5 cm','S',199,1),
('00000000-0000-0000-0000-000000000001',20, 'gear','Mouse','4 × 2.5 cm','S',110,3)
on conflict do nothing;
