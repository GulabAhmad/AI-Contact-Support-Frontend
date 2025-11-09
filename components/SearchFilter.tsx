"use client"

import { useState, useMemo } from "react"
import type { SupportMessage } from "@/lib/api"
import { MessageCard } from "@/components/MessageCard"
import { Input } from "@/components/ui/input"
import { Search, Inbox } from "lucide-react"

interface SearchFilterProps {
  messages: SupportMessage[]
}

export function SearchFilter({ messages }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) {
      return messages
    }

    const query = searchQuery.toLowerCase()
    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query) ||
        (message.ai_response && message.ai_response.toLowerCase().includes(query)),
    )
  }, [messages, searchQuery])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Inbox className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold text-foreground">
            {searchQuery ? "No messages found" : "No messages yet"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Try adjusting your search query" : "Support submissions will appear here"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}
