import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata {
  title: "Dutch Tax Optimizer - Keep More of What You Earn",
  description: "AI-powered tax optimization for Dutch freelancers. Maximize deductions, check WBSO eligibility, and project tax savings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
