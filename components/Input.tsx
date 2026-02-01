import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-[rgb(var(--color-text))]">
            {label}
          </label>
        )}
        <input
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

Input.displayName = "Input";
