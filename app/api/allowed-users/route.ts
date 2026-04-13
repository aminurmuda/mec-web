import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const { email } = await req.json();

  const { data, error } = await supabaseServer
    .from('allowed_users')
    .select('email')
    .eq('email', email)
    .single();

  if (error || !data) {
    return NextResponse.json({ allowed: false });
  }

  return NextResponse.json({ allowed: true });
}
