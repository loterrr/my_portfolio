import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { name, stars, comment } = body as {
      name?: string
      stars?: number
      comment?: string
    }

    // Validate comment
    if (!comment?.trim()) {
      return NextResponse.json(
        { error: "A comment is required." },
        { status: 400 },
      )
    }

    // Validate stars
    const starsNum = typeof stars === 'number' ? stars : Number(stars)
    if (!Number.isInteger(starsNum) || starsNum < 1 || starsNum > 5) {
      return NextResponse.json(
        { error: "Please select a rating between 1 and 5 stars." },
        { status: 400 },
      )
    }

    if (comment.trim().length > 500) {
      return NextResponse.json(
        { error: "Comment must be 500 characters or less." },
        { status: 400 },
      )
    }

    const supabase = await createSupabaseServerClient()

    const { error } = await supabase
      .from("feedbacks")
      .insert({
        name: name?.trim() || null,
        stars: starsNum,
        comment: comment.trim(),
      })

    if (error) {
      console.error("Supabase error inserting feedback:", error)
      return NextResponse.json(
        { error: "Could not save feedback. Please try again later." },
        { status: 500 },
      )
    }

    // Email notification for feedback
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Portfolio <feedback@loterc.com>",
          to: "lutherjohnallen@email.com",
          subject: `New Feedback Received (${starsNum} Stars) — from ${name || "Anonymous"}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <div style="background-color: #f59e0b; padding: 24px; color: white;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 600;">New Feedback Received</h1>
              </div>
              <div style="padding: 24px;">
                <p>Someone has left a review on your portfolio.</p>
                <div style="background-color: #fffbeb; padding: 16px; border: 1px solid #fef3c7; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name?.trim() || "Anonymous"}</p>
                  <p style="margin: 0 0 8px 0;"><strong>Rating:</strong> ${"⭐".repeat(starsNum)} (${starsNum}/5)</p>
                </div>
                <div style="border-left: 4px solid #f59e0b; padding-left: 16px; margin: 20px 0;">
                  <p style="font-style: italic; margin: 0;">"${comment.trim()}"</p>
                </div>
                <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
                  Note: This feedback is <strong>hidden</strong> by default. Log into your Supabase dashboard to approve it.
                </p>
              </div>
              <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 11px; color: #6b7280;">
                Recieved via Portfolio App • ${new Date().toLocaleString()}
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error("Resend error sending feedback notification:", emailErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error processing feedback:", error)
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }
}
