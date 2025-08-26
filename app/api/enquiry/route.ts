import { NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, mobile, email } = body

        // Validate required fields
        if (!name || !mobile || !email) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        // Generate enquiry ID and timestamp
        const enquiryId = `ENQ-${Date.now()}`
        const timestamp = new Date()

        // Prepare enquiry data
        const enquiryData = {
            name,
            mobile,
            email,
            timestamp,
            enquiryId
        }

        // Send emails using the email service
        const emailResults = await EmailService.handleEnquiryEmails(enquiryData)

        console.log("New enquiry received:", enquiryData)
        console.log("Email results:", emailResults)

        return NextResponse.json(
            {
                message: "Enquiry submitted successfully",
                enquiryId: enquiryId
            },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error processing enquiry:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
