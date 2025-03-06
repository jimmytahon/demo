"use server"

import {Resend} from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

type EmailData = {
    name: string
    email: string
}

export async function sendEmail(data: EmailData) {
    if (!resend) {
        return {
            success: false,
            message: "Email service is not configured",
        }
    }
    const {name, email} = data
    if (!name || !email) {
        return {
            success: false,
            message: "Name and email are required",
        }
    }
    const {data: resendData, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Hallo ${name}, we sturen je een mail.`,
        html: `
        <div>
          <h1>Hallo ${name}!</h1>
          <p>Je hebt een mail gestuurd.</p>
          <p>Met vriendelijke groeten</p>
          <p>Jimmy</p>
        </div>
      `,
    })

    if (error) {
        return {
            success: false,
            message: "Failed to send email",
        }
    }
    return {
        success: true,
        message: "Email sent successfully!",
        data: resendData,
    }
}

