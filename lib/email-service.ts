// Email service utility for handling enquiry submissions using SMTP
import nodemailer from 'nodemailer'

export interface EnquiryData {
    name: string
    mobile: string
    email: string
    timestamp: Date
    enquiryId: string
}

export class EmailService {
    // Create SMTP transporter
    private static createTransporter() {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })
    }

    // Send enquiry notification to your team
    static async sendTeamNotification(enquiry: EnquiryData): Promise<boolean> {
        try {
            const transporter = this.createTransporter()

            const emailContent = {
                from: process.env.SMTP_USER,
                to: process.env.TEAM_EMAIL || "dev1@skillmindsoftware.com",
                subject: `New Enquiry from ${enquiry.name} - ${enquiry.enquiryId}`,
                html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Enquiry ID:</strong> ${enquiry.enquiryId}</p>
          <p><strong>Name:</strong> ${enquiry.name}</p>
          <p><strong>Mobile:</strong> ${enquiry.mobile}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Timestamp:</strong> ${enquiry.timestamp.toLocaleString()}</p>
          <hr>
          <p>This enquiry was submitted through the PAYE Calculator website.</p>
        `
            }

            // Send the email
            const info = await transporter.sendMail(emailContent)
            console.log("Team notification email sent:", info.messageId)

            return true
        } catch (error) {
            console.error("Failed to send team notification:", error)
            return false
        }
    }

    // Send confirmation email to the user
    static async sendUserConfirmation(enquiry: EnquiryData): Promise<boolean> {
        try {
            const transporter = this.createTransporter()

            const emailContent = {
                from: process.env.SMTP_USER,
                to: enquiry.email,
                subject: "Thank you for your enquiry - SkillMind Software",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1f2937;">Thank you for your enquiry!</h2>
            <p>Dear ${enquiry.name},</p>
            <p>We have received your enquiry and our team will get back to you within 24-48 hours.</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Enquiry Details</h3>
              <p><strong>Enquiry ID:</strong> ${enquiry.enquiryId}</p>
              <p><strong>Submitted:</strong> ${enquiry.timestamp.toLocaleString()}</p>
            </div>
            
            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size:14px;">
                Best regards,<br>
                The SkillMind Software Team
              </p>
            </div>
          </div>
        `
            }

            // Send the email
            const info = await transporter.sendMail(emailContent)
            console.log("User confirmation email sent:", info.messageId)

            return true
        } catch (error) {
            console.error("Failed to send user confirmation:", error)
            return false
        }
    }

    // Main method to handle enquiry email workflow
    static async handleEnquiryEmails(enquiry: EnquiryData): Promise<{
        teamNotification: boolean
        userConfirmation: boolean
    }> {
        const [teamNotification, userConfirmation] = await Promise.all([
            this.sendTeamNotification(enquiry),
            this.sendUserConfirmation(enquiry)
        ])

        return { teamNotification, userConfirmation }
    }
}
