import { supabaseServer } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { count, error } = await supabaseServer
      .from('visitors')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      total: count || 0,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { visitorId, source } = await req.json();

    if (!visitorId) {
      return NextResponse.json({ error: 'Missing visitorId' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || '';

    console.log('userAgent', userAgent);

    const { error } = await supabaseServer
      .from('visitors')
      .upsert(
        { visitor_id: visitorId, source, user_agent: userAgent },
        { onConflict: 'visitor_id' },
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
