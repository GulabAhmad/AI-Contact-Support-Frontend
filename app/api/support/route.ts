import { type NextRequest, NextResponse } from "next/server"
import type { SupportMessage } from "@/lib/api"

// In-memory storage (replace with database in production)
const supportMessages: SupportMessage[] = []

// Mock AI response generator
function generateAIReply(message: string): string {
  const responses = [
    `Thank you for reaching out! I understand your concern about "${message.slice(0, 50)}...". Our team will review this and get back to you within 24 hours. In the meantime, you might find our FAQ section helpful.`,
    `I appreciate you contacting us. Based on your message, I recommend checking our documentation for detailed guidance. If the issue persists, our support team will investigate further and provide a personalized solution.`,
    `Thanks for your message! I've analyzed your request and it seems related to a common issue. Here are some immediate steps you can try: 1) Clear your cache, 2) Restart the application, 3) Check your internet connection. If these don't help, we'll escalate this to our technical team.`,
    `Hello! I've received your inquiry. This appears to be a priority issue that requires immediate attention. I've flagged this for our senior support team, and you should expect a detailed response within the next few hours.`,
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

// GET: Fetch all support messages
export async function GET() {
  try {
    // Sort by most recent first
    const sortedMessages = [...supportMessages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return NextResponse.json({ messages: sortedMessages })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST: Submit a new support request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Generate AI reply
    const aiReply = generateAIReply(message)

    // Create new message
    const newMessage: SupportMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      message,
      aiReply,
      createdAt: new Date().toISOString(),
    }

    // Store message
    supportMessages.push(newMessage)

    return NextResponse.json({
      id: newMessage.id,
      aiReply: newMessage.aiReply,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit support request" }, { status: 500 })
  }
}
