// Centralized API functions for the support system
const API_URL = "http://127.0.0.1:8000"

export interface SupportMessage {
  id: number
  name: string
  email: string
  message: string
  ai_response: string | null
  created_at: string
}

export interface SubmitSupportRequest {
  name: string
  email: string
  message: string
}

export interface SubmitSupportResponse {
  success: boolean
  data?: SupportMessage
  error?: string
}

// Submit a new support request
export async function submitSupportRequest(data: SubmitSupportRequest): Promise<SubmitSupportResponse> {
  try {
    const response = await fetch(`${API_URL}/api/support-messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to submit support request")
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    }
  }
}

// Fetch all support messages
export async function fetchSupportMessages(skip?: number, limit?: number): Promise<SupportMessage[]> {
  try {
    const params = new URLSearchParams()
    if (skip !== undefined && skip >= 0) {
      params.append("skip", skip.toString())
    }
    if (limit !== undefined && limit >= 1 && limit <= 1000) {
      params.append("limit", limit.toString())
    }

    const queryString = params.toString()
    const url = `${API_URL}/api/support-messages/${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch support messages")
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching support messages:", error)
    return []
  }
}
