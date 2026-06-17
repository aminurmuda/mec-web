import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabaseServer } from '@/lib/supabase-server';
import { CourseMulti, Price } from '@/type/course';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Fetch full details of the specific course
      const { data, error } = await supabaseServer
        .from('courses_multi')
        .select(`
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
            course_id,
            period,
            price
          )
        `)
        .eq('id', id)
        .eq('soft_delete', false)
        .eq('prices.soft_delete', false)
        .order('id', { referencedTable: 'prices', ascending: true })
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ course: data });
    } else {
      // Fetch only preview/sidebar fields for all courses
      const { data, error } = await supabaseServer
        .from('courses_multi')
        .select(`
          id,
          order,
          title_en,
          title_id,
          config
        `)
        .eq('soft_delete', false)
        .order('order', { ascending: true });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ courses: data });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}

type SaveCoursePayload = CourseMulti & {
  soft_delete?: boolean;
  prices: (Price & { soft_delete?: boolean })[];
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { courses }: { courses: SaveCoursePayload[] } = await req.json();

    if (!courses || !Array.isArray(courses)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    for (const course of courses) {
      if (course.id < 0) {
        // Skip if new but already soft-deleted
        if (course.soft_delete) continue;

        // Insert new course
        const { data: newCourse, error: courseError } = await supabaseServer
          .from('courses_multi')
          .insert({
            order: course.order,
            title_en: course.title_en,
            title_id: course.title_id,
            subtitle_en: course.subtitle_en,
            subtitle_id: course.subtitle_id,
            description_en: course.description_en,
            description_id: course.description_id,
            session: course.session,
            meetings: course.meetings,
            course_duration: course.course_duration,
            config: course.config || {},
            soft_delete: false,
          })
          .select()
          .single();

        if (courseError) {
          throw new Error(`Failed to insert course ${course.title_en}: ${courseError.message}`);
        }

        const newCourseId = newCourse.id;

        // Insert nested prices
        if (course.prices && Array.isArray(course.prices)) {
          for (const price of course.prices) {
            if (price.soft_delete) continue;

            const { error: priceError } = await supabaseServer
              .from('prices')
              .insert({
                course_id: newCourseId,
                period: price.period,
                price: price.price,
                soft_delete: false,
              });

            if (priceError) {
              throw new Error(`Failed to insert price for new course: ${priceError.message}`);
            }
          }
        }
      } else {
        // Update existing course
        if (course.soft_delete) {
          // Soft-delete course
          const { error: courseError } = await supabaseServer
            .from('courses_multi')
            .update({ soft_delete: true })
            .eq('id', course.id);

          if (courseError) {
            throw new Error(`Failed to delete course ${course.id}: ${courseError.message}`);
          }

          // Soft-delete all prices associated with this course
          const { error: pricesError } = await supabaseServer
            .from('prices')
            .update({ soft_delete: true })
            .eq('course_id', course.id);

          if (pricesError) {
            throw new Error(`Failed to delete prices for course ${course.id}: ${pricesError.message}`);
          }
        } else {
          // Update course info
          const { error: courseError } = await supabaseServer
            .from('courses_multi')
            .update({
              order: course.order,
              title_en: course.title_en,
              title_id: course.title_id,
              subtitle_en: course.subtitle_en,
              subtitle_id: course.subtitle_id,
              description_en: course.description_en,
              description_id: course.description_id,
              session: course.session,
              meetings: course.meetings,
              course_duration: course.course_duration,
              config: course.config || {},
            })
            .eq('id', course.id);

          if (courseError) {
            throw new Error(`Failed to update course ${course.id}: ${courseError.message}`);
          }

          // Handle prices
          if (course.prices && Array.isArray(course.prices)) {
            for (const price of course.prices) {
              if (price.id < 0) {
                // New price for existing course
                if (price.soft_delete) continue;

                const { error: priceError } = await supabaseServer
                  .from('prices')
                  .insert({
                    course_id: course.id,
                    period: price.period,
                    price: price.price,
                    soft_delete: false,
                  });

                if (priceError) {
                  throw new Error(`Failed to insert price for course ${course.id}: ${priceError.message}`);
                }
              } else {
                // Existing price
                if (price.soft_delete) {
                  // Soft-delete price
                  const { error: priceError } = await supabaseServer
                    .from('prices')
                    .update({ soft_delete: true })
                    .eq('id', price.id);

                  if (priceError) {
                    throw new Error(`Failed to delete price ${price.id}: ${priceError.message}`);
                  }
                } else {
                  // Update price
                  const { error: priceError } = await supabaseServer
                    .from('prices')
                    .update({
                      period: price.period,
                      price: price.price,
                    })
                    .eq('id', price.id);

                  if (priceError) {
                    throw new Error(`Failed to update price ${price.id}: ${priceError.message}`);
                  }
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error saving courses/prices:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
