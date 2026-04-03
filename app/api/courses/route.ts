import { supabaseServer } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const apiKey = req.headers.get('x-api-key');

  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseServer
      .from('courses')
      .select(
        `
        id,
        order,
        title,
        subtitle,
        description,
        session,
        meetings,
        course_duration,
        config,
        prices (
          id,
          period,
          price
        )
      `,
      )
      .lte('id', 9)
      .eq('soft_delete', false)
      .eq('prices.soft_delete', false)
      .order('id', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      total: data.length,
      courses: data,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
};
