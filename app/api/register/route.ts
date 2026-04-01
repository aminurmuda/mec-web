import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { resend } from '@/lib/resend';

type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  age: string;
  background: string;
  course_id: number;
  price_id: number;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: RegisterPayload = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseServer
      .from('registrations')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          age: body.age,
          background: body.background,
          course_id: body.course_id,
          price_id: body.price_id,
        },
      ])
      .select();

    if (error) {
      console.error('SUPABASE ERROR:', error);

      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await resend.emails.send({
      from: `Medeena English Center <${process.env.RESEND_SENDER_EMAIL}>`,
      to: body.email,
      subject: 'Registration Received 🎉',
      html: `
        <h2>Hello ${body.name},</h2>
        <p>Thank you for registering.</p>
        <p>We will contact you soon via WhatsApp.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('SERVER ERROR:', err);

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};
