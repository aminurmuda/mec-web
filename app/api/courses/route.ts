import { Locale } from '@/lib/i18n';
import { supabaseServer } from '@/lib/supabase-server';
import { CourseMulti } from '@/type/course';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const apiKey = req.headers.get('x-api-key');
  const { searchParams } = new URL(req.url);
  const locale = (searchParams.get('lang') as Locale) || 'en';

  const mapCourse = (course: CourseMulti, locale: Locale) => {
    return {
      ...course,
      title: course[`title_${locale}`] || course.title_en,
      subtitle: course[`subtitle_${locale}`] || course.subtitle_en,
      description: course[`description_${locale}`] || course.description_en,
    };
  };

  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseServer
      .from('courses_multi')
      .select(
        `
    id,
    order,
    title_en,
    title_id,
    subtitle_en,
    subtitle_id,
    description_en,
    description_id,
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
      .eq('soft_delete', false)
      .eq('prices.soft_delete', false)
      .order('id', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      total: data.length,
      courses: data.map((course) => mapCourse(course, locale)),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
};
