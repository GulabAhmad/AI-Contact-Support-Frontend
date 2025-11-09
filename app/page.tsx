import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, LayoutDashboard, Sparkles, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">AI Support</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/support">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-16">
          <div className="text-center">
            <h2 className="text-balance text-5xl font-bold tracking-tight text-foreground">
              AI-Powered Support System
            </h2>
            <p className="mt-6 text-pretty text-xl leading-relaxed text-muted-foreground">
              Get instant, intelligent responses to your support requests powered by advanced AI technology
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/support">
                <Button size="lg" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Get Support Now
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  <LayoutDashboard className="h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Zap className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Instant Responses</CardTitle>
                <CardDescription>Get AI-generated replies immediately after submitting your request</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Smart Analysis</CardTitle>
                <CardDescription>Our AI understands context and provides relevant, helpful solutions</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <LayoutDashboard className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Easy Management</CardTitle>
                <CardDescription>Track all support requests in one centralized dashboard</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
