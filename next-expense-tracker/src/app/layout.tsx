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
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary to-secondary text-white backdrop-blur">
          <div className="container px-6 flex h-14 items-center">
            <Link href="/dashboard" className="flex items-center mr-6 space-x-2">
            <svg fill="none" height="36" viewBox="0 0 40 48" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="#ffffff"><path d="m28.6446 39.168c-.6032 1.3404-1.353 2.6531-2.2519 3.7888 7.4581-2.5137 12.9483-9.3054 13.5527-17.4568h-2.6549c-3.2399 0-5.8424 2.5861-6.369 5.7829-.4855 2.9468-1.2621 5.6301-2.2769 7.8851z"/><path d="m22.7724 25.5c3.3921 0 6.167 2.8299 5.5439 6.1643-1.3533 7.2424-4.5667 12.3357-8.3155 12.3357-4.7435 0-8.6299-8.1549-8.975-18.5z"/><path d="m30.9904 17.1502c.4961 3.2267 3.1106 5.8498 6.3752 5.8498h2.6107c-.4123-8.3729-5.9735-15.39183-13.5836-17.95683.8989 1.13575 1.6487 2.44843 2.2519 3.78878 1.0643 2.36505 1.8666 5.20115 2.3458 8.31825z"/><path d="m28.4165 16.8957c.5674 3.3176-2.1954 6.1043-5.5612 6.1043h-11.8434c.2344-10.5811 4.1693-19 8.9889-19 3.8447 0 7.1263 5.35721 8.4157 12.8957z"/><path d="m8.51131 23c.11359-5.4083 1.14536-10.3894 2.84579-14.16805.6031-1.34035 1.3529-2.65303 2.2519-3.78878-7.61011 2.565-13.171316 9.58393-13.5836094 17.95683z"/><path d="m.0562286 25.5c.6043994 8.1514 6.0946514 14.9431 13.5527714 17.4568-.899-1.1357-1.6488-2.4484-2.2519-3.7888-1.6479-3.6619-2.66781-8.4531-2.83264-13.668z"/></g></svg>
              <span className="font-bold text-lg">ExpenseAI</span>
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
