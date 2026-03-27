import { supabaseServer } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const { data, error } = await supabaseServer.from('courses').select('*');

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
