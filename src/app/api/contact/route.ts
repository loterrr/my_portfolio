import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      )
    }

    // Rudimentary email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      )
    }

    const supabase = await createSupabaseServerClient()

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        subject: (subject ?? "").trim(),
        message: message.trim(),
      })

    if (dbError) {
      console.error("Supabase error inserting contact submission:", dbError)
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 500 },
      )
    }

    // Attempt to send email notification via Resend
    // We only do this if the API key is present
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Portfolio <contact@loterc.com>",
          to: "lutherjohnallen@email.com",
          subject: (subject?.trim() || "New Portfolio Inquiry") + ` — from ${name}`,
          replyTo: email.trim(),
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <div style="background-color: #6366f1; padding: 24px; color: white;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 600;">New Contact Inquiry</h1>
              </div>
              <div style="padding: 24px;">
                <p>You have received a new inquiry from your portfolio website.</p>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name.trim()}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email.trim()}</p>
                  <p style="margin: 0;"><strong>Subject:</strong> ${subject?.trim() || "No Subject"}</p>
                </div>
                <div style="border-left: 4px solid #6366f1; padding-left: 16px; margin: 20px 0;">
                  <p style="font-style: italic; margin: 0;">"${message.trim()}"</p>
                </div>
              </div>
              <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 11px; color: #6b7280;">
                Recieved via Portfolio App • ${new Date().toLocaleString()}
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        // We log the error but don't fail the request since it was already saved to DB
        console.error("Resend error sending email notification:", emailErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Internal Server Error in contact API:", error)
    return NextResponse.json(
      { error: "Invalid request body or server error." },
      { status: 400 },
    )
  }
}
