import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { resend } from '@/lib/resend';

type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  age: string;
  background: string;
  address: string;
  course_id: number;
  price_id: number;
  selectedCourse: string;
  selectedPrice: string;
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
          address: body.address,
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
      subject: 'Registration Confirmation – Medeena English Center',
      html: `
    <div style="background:#f9fafb;padding:40px 20px;font-family:Inter,Arial,sans-serif;">
      
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">
        
        <!-- LOGO -->
        <div style="margin-bottom:24px;">
          <a 
            href="https://medeenaenglishcenter.com" 
            target="_blank"
            style="display:inline-block;"
          >
            <img 
              src="https://medeenaenglishcenter.com/logo.png" 
              alt="Medeena English"
              style="display:block;border:0;outline:none;text-decoration:none;"
            />
          </a>
        </div>

        <!-- HEADER -->
        <h2 style="margin:0 0 8px 0;font-size:22px;color:#111827;">
          You're all set 🎉
        </h2>
        <p style="margin:0 0 24px 0;color:#6b7280;font-size:14px;">
          Hi ${body.name}, your registration has been received.
        </p>

        <!-- COURSE SUMMARY -->
        <div style="padding:16px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:24px;">
          <p style="margin:0 0 6px 0;font-size:14px;color:#6b7280;">Program</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">
            ${body.selectedCourse}
          </p>

          <p style="margin:12px 0 6px 0;font-size:14px;color:#6b7280;">Package</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#111827;">
            ${body.selectedPrice}
          </p>
        </div>

        <!-- USER DETAILS -->
        <div style="margin-bottom:24px;">
          <p style="font-size:14px;font-weight:600;color:#111827;margin-bottom:12px;">
            Your Details
          </p>

          <table style="width:100%;font-size:14px;color:#374151;">
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Email</td>
              <td style="text-align:right;">${body.email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Phone</td>
              <td style="text-align:right;">${body.phone}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Age</td>
              <td style="text-align:right;">${body.age}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Background</td>
              <td style="text-align:right;">${body.background}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Address</td>
              <td style="text-align:right;">${body.address}</td>
            </tr>
          </table>
        </div>

        <!-- NEXT STEPS -->
        <div style="margin-bottom:24px;">
          <p style="font-size:14px;font-weight:600;color:#111827;margin-bottom:8px;">
            What happens next?
          </p>
          <ul style="padding-left:18px;margin:0;color:#6b7280;font-size:14px;">
            <li>We’ll contact you via WhatsApp shortly</li>
            <li>Schedule and program details will be confirmed</li>
            <li>Payment instructions will be provided</li>
          </ul>
        </div>

        <!-- CTA -->
        <div style="margin:24px 0;">
          <a 
            href="https://wa.me/62${process.env.NEXT_PUBLIC_PHONE_NUMBER}" 
            style="
              display:inline-block;
              background:#111827;
              color:#ffffff;
              padding:12px 18px;
              border-radius:8px;
              font-size:14px;
              text-decoration:none;
              font-weight:500;
            "
          >
            Contact Us on WhatsApp
          </a>
        </div>

        <!-- FOOTER -->
        <p style="font-size:12px;color:#9ca3af;margin-top:24px;">
          Medeena English Center<br/>
          This is a confirmation email for your registration.
        </p>

      </div>
    </div>
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
