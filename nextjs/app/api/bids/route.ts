import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const body = await req.json();
  // accept both snake_case (original) and camelCase (new BidModal)
  const auction_id = body.auction_id ?? body.auctionId;
  const spot_id = body.spot_id ?? body.spotId;
  const amount = body.amount;
  const brand = body.brand?.trim();
  const url = body.url?.trim();

  if (!auction_id || !spot_id || !amount) {
    return NextResponse.json({ error: 'Missing auction_id, spot_id, or amount' }, { status: 400 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  // Optional: store brand/url snapshot on user profile (keeps bid history accurate even if profile changes later)
  // For Phase 1 we update users.brand_name / website_url if provided; later move to bids.brand_name for per-bid snapshot
  if (brand || url) {
    const updates: Record<string, string> = {};
    if (brand) updates.brand_name = brand;
    if (url) updates.website_url = url;
    // add columns if you haven't: alter table public.users add column if not exists brand_name text; add column website_url text;
    await supabase.from('users').upsert({ id: user.id, email: user.email, ...updates }, { onConflict: 'id' });
  }

  const { data, error } = await supabase.rpc('place_bid', {
    p_auction_id: auction_id,
    p_spot_id: spot_id,
    p_amount: Number(amount),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ bid: data });
}
