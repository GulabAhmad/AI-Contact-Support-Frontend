// Reusable card component for displaying support messages

import type { SupportMessage } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, User, MessageSquare, Sparkles } from "lucide-react"

interface MessageCardProps {
  message: SupportMessage
}

export function MessageCard({ message }: MessageCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="border-b bg-muted/30 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-4 w-4 text-muted-foreground" />
              {message.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {message.email}
            </div>
          </div>
          <time className="text-xs text-muted-foreground">
            {new Date(message.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <MessageSquare className="h-4 w-4" />
            User Message
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{message.message}</p>
        </div>
        {message.ai_response ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI Response
            </div>
            <p className="text-sm leading-relaxed text-foreground">{message.ai_response}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-muted bg-muted/30 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              AI Response
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground italic">No AI response yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
