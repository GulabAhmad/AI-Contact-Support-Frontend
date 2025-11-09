"use client"

import type React from "react"

import { useState } from "react"
import { FormInput } from "@/components/FormInput"
import { FormTextarea } from "@/components/FormTextarea"
import { submitSupportRequest } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiReply, setAiReply] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setAiReply(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const result = await submitSupportRequest(formData)

    setIsSubmitting(false)

    if (result.success && result.data) {
      setAiReply(result.data.ai_response)
      setFormData({ name: "", email: "", message: "" })
      setErrors({})
    } else {
      setSubmitError(result.error || "Failed to submit your request. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold text-foreground">AI Support</h1>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              View Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground">Get AI-Powered Support</h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Submit your question and receive an instant AI-generated response
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Fill out the form below and our AI assistant will help you right away</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  disabled={isSubmitting}
                />

                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />

                <FormTextarea
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Describe your issue or question..."
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  disabled={isSubmitting}
                  rows={6}
                />

                {submitError && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-sm text-destructive">{submitError}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {aiReply && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-primary">Success!</CardTitle>
                </div>
                <CardDescription>Your request has been submitted successfully</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    AI Response
                  </div>
                  <p className="leading-relaxed text-foreground">{aiReply}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
