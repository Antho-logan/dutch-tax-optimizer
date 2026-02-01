import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-[rgb(var(--color-text))]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3
            bg-[rgb(var(--color-bg-soft))]
            border-2 border-[rgb(var(--color-line))]
            rounded-[var(--radius-md)]
            text-[rgb(var(--color-text))]
            placeholder:text-[rgb(var(--color-text-muted))]
            transition-all duration-200
            focus:border-[rgb(var(--color-primary))]
            focus:outline-none
            focus:ring-2 focus:ring-[rgb(var(--color-primary))]/20
            resize-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
