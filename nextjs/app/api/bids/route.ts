import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const { auction_id, spot_id, amount } = await req.json();
  if (!auction_id || !spot_id || !amount) {
    return NextResponse.json({ error: 'Missing auction_id, spot_id, or amount' }, { status: 400 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data, error } = await supabase.rpc('place_bid', {
    p_auction_id: auction_id,
    p_spot_id: spot_id,
    p_amount: Number(amount),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ bid: data });
}
