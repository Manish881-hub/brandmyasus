# Phase 1 — Supabase + transactional bidding for BrandMyAsus

## Install
```bash
cd nextjs
npm install @supabase/supabase-js @supabase/ssr
```

## Env
```bash
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from Supabase Dashboard → Project Settings → API
```

## Migrations (run in order in Supabase SQL Editor)
1. `supabase/migrations/001_initial.sql` — tables + demo auction/spots
2. `supabase/migrations/002_rls.sql` — enable RLS + policies
3. `supabase/migrations/003_place_bid.sql` — place_bid() transactional function

After, enable Realtime for `spots` and `bids` in Dashboard → Database → Realtime.

## How it works
Browser never does `update spots`. It calls `POST /api/bids` → server calls `supabase.rpc('place_bid')` → Postgres checks auth, auction active, time, locks spot, validates `current + increment`, inserts bid, updates spot in one transaction.

Wire frontend next: `lib/data.ts` → Supabase, `page.tsx` → fetch, `BidModal` → `/api/bids`, subscribe to `spots` changes.

First live test: two browsers, A bids €100 → B sees instantly → B bids €110 → A sees instantly → refresh both → €110 persists.
