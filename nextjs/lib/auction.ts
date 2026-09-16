import { createClient } from '@/lib/supabase/server';

export async function getActiveAuction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('auctions')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: true })
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

export async function getSpots(auctionId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spots')
    .select('*')
    .eq('auction_id', auctionId)
    .order('number', { ascending: true });
  if (error) throw error;
  return data;
}
