import { supabaseServer } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const { data, error } = await supabaseServer.from('visitors').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      total: data.length,
      visitors: data,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { visitorId } = await req.json();

    if (!visitorId) {
      return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 });
    }

    // insert or ignore duplicate
    const { error } = await supabaseServer
      .from('visitors')
      .upsert({ visitor_id: visitorId }, { onConflict: 'visitor_id' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
