-- 003_place_bid.sql — Transactional bidding
-- Run third. Browser must call this via supabase.rpc('place_bid', ...), never update spots directly.

create or replace function public.place_bid(
  p_auction_id uuid,
  p_spot_id uuid,
  p_amount integer
)
returns public.bids
language plpgsql
security definer
set search_path = public
as $$
declare
  v_bidder uuid := auth.uid();
  v_auction public.auctions%rowtype;
  v_spot public.spots%rowtype;
  v_next_min integer;
  v_bid public.bids%rowtype;
begin
  if v_bidder is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;

  if p_amount is null or p_amount <= 0 then
    raise exception 'Invalid amount' using errcode = '22003';
  end if;

  select * into v_auction from public.auctions where id = p_auction_id for update;
  if not found then raise exception 'Auction not found' using errcode = 'P0002'; end if;
  if v_auction.status <> 'active' then raise exception 'Auction not active' using errcode = 'P0001'; end if;
  if now() < v_auction.starts_at then raise exception 'Auction not started'; end if;
  if now() >= v_auction.ends_at then raise exception 'Auction ended'; end if;

  select * into v_spot from public.spots where id = p_spot_id and auction_id = p_auction_id for update;
  if not found then raise exception 'Spot not found'; end if;

  v_next_min := greatest(v_spot.current_bid + v_auction.bid_increment, v_auction.starting_bid);
  -- First bid on a fresh spot can be >= starting_bid; subsequent must beat current + increment
  if v_spot.total_bids = 0 then
    v_next_min := greatest(v_auction.starting_bid, v_spot.current_bid);
    if p_amount < v_next_min then
      raise exception 'Bid must be at least %', v_next_min using errcode = '23514';
    end if;
  else
    if p_amount < v_next_min then
      raise exception 'Bid must beat current by at least % (min %)', v_auction.bid_increment, v_next_min using errcode = '23514';
    end if;
  end if;

  insert into public.bids (auction_id, spot_id, bidder_id, amount)
  values (p_auction_id, p_spot_id, v_bidder, p_amount)
  returning * into v_bid;

  update public.spots
  set current_bid = p_amount,
      highest_bidder_id = v_bidder,
      total_bids = total_bids + 1
  where id = p_spot_id;

  return v_bid;
end;
$$;

-- Allow authenticated users to execute
revoke all on function public.place_bid(uuid, uuid, integer) from public;
grant execute on function public.place_bid(uuid, uuid, integer) to authenticated;
