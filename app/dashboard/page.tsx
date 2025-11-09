import { fetchSupportMessages } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SearchFilter } from "@/components/SearchFilter"
import { PaginationControls } from "@/components/PaginationControls"
import { Suspense } from "react"

interface DashboardPageProps {
  searchParams: Promise<{ page?: string }>
}

const ITEMS_PER_PAGE = 10

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  // Fetch one extra item to determine if there's a next page
  const limit = ITEMS_PER_PAGE + 1

  // Fetch messages with pagination
  const allMessages = await fetchSupportMessages(skip, limit)

  // Check if there are more pages
  const hasNextPage = allMessages.length > ITEMS_PER_PAGE
  // Only show the items per page (slice the extra one if it exists)
  const messages = allMessages.slice(0, ITEMS_PER_PAGE)

  // Calculate total pages (we don't know the exact total, so we'll show "at least X pages")
  // If we have a next page, we know there's at least currentPage + 1 pages
  const totalPages = hasNextPage ? currentPage + 1 : currentPage

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold text-foreground">Support Dashboard</h1>
          <Link href="/support">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Support
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">Support Messages</h2>
            <p className="mt-2 text-pretty text-muted-foreground">View and manage all support submissions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>
                Page {currentPage} {messages.length > 0 && `• ${messages.length} ${messages.length === 1 ? "message" : "messages"} on this page`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SearchFilter messages={messages} />
              <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Loading pagination...</div>}>
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={messages.length}
                  hasNextPage={hasNextPage}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
