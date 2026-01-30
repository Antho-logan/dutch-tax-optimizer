import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[rgb(var(--color-primary))] text-white",
    success: "bg-[rgb(var(--color-accent))] text-white",
    warning: "bg-amber-500 text-white",
    outline: "border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))]",
  };

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1
        rounded-full text-sm font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
