// Reusable form input component with validation states

import { type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label htmlFor={props.id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
})

FormInput.displayName = "FormInput"
