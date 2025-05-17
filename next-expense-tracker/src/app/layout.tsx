import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker & Tax Filing Assistant",
  description: "Track expenses and calculate tax deductions with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Link href="/dashboard" className="font-bold text-lg mr-6">
              ExpenseAI
            </Link>
            <nav className="flex items-center space-x-6 text-sm">
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground/80"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="transition-colors hover:text-foreground/80"
              >
                Upload
              </Link>
              <Link
                href="/summary"
                className="transition-colors hover:text-foreground/80"
              >
                Tax Summary
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
