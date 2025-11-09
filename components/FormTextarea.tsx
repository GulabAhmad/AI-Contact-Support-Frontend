// Reusable textarea component for longer text input

import { type TextareaHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={props.id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground transition-colors",
            "placeholder:text-muted-foreground",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[120px] resize-y",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

FormTextarea.displayName = "FormTextarea"
