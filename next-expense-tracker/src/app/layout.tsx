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
            <Link href="/dashboard" className="flex items-center mr-6">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 188 48" xmlns="http://www.w3.org/2000/svg">
                <path d="m24.9706 7.03309c-3.1242-3.1242-8.1896-3.1242-11.3137 0l-11.31375 11.31371c-3.124199 3.1242-3.124199 8.1895 0 11.3137l11.31375 11.3137c3.1241 3.1242 8.1895 3.1242 11.3137 0l5.3982-5.3983c-4.4939-1.7337-7.682-6.0944-7.682-11.1997 0-5.3087 3.4472-9.8123 8.2254-11.3943-.0935-.0982-.1884-.1955-.2848-.292z" fill="#875bf7"/>
                <path d="m30.3691 35.5798c1.3398.5168 2.7955.8001 4.3174.8001 6.6274 0 12-5.3726 12-12s-5.3726-12-12-12c-1.3185 0-2.5873.2126-3.774.6055 5.9623 6.2681 5.8675 16.1836-.2846 22.3356z" fill="#ee46bc"/>
                <g fill="#0A0D12"><path d="m69.607 33-1.458-4.158h-7.533l-1.485 4.158h-4.131l7.29-19.386h4.482l7.236 19.386zm-5.184-14.904-2.646 7.479h5.238z"/><path d="m78.7457 33h-3.78v-19.386h3.78z"/><path d="m95.4222 25.791c0 4.266-2.511 7.479-6.399 7.479-1.701 0-3.159-.729-4.239-2.133v7.074h-3.753v-19.629h3.456v2.106c1.107-1.539 2.7-2.376 4.536-2.376 3.888 0 6.399 3.24 6.399 7.479zm-3.861 0c0-2.7-1.539-4.158-3.375-4.158s-3.375 1.431-3.375 4.158 1.539 4.131 3.375 4.131 3.375-1.377 3.375-4.131z"/><path d="m100.5 25.143v7.857h-3.7529v-19.386h3.7529v6.858c.999-1.323 2.241-2.16 4.131-2.16 2.889 0 4.887 1.89 4.887 5.373v9.315h-3.726v-8.046c0-2.133-.837-3.321-2.538-3.321-1.485 0-2.754 1.188-2.754 3.51z"/><path d="m120.258 33v-1.782c-.945 1.35-2.376 2.052-4.347 2.052-2.997 0-4.995-1.755-4.995-4.455 0-2.808 2.268-4.32 6.48-4.32.81 0 1.512.054 2.403.162v-.864c0-1.62-.918-2.565-2.484-2.565-1.62 0-2.592.945-2.727 2.565h-3.375c.216-3.321 2.619-5.481 6.102-5.481 3.78 0 5.994 2.079 5.994 5.616v9.072zm-5.805-4.293c0 1.215.864 1.971 2.268 1.971 1.917 0 3.078-1.053 3.078-2.727v-1.026c-.891-.135-1.512-.189-2.16-.189-2.133 0-3.186.675-3.186 1.971z"/><path d="m139.157 33-3.618-13.554-3.618 13.554h-4.158l-4.968-19.386h3.996l3.132 13.149 3.564-13.149h4.185l3.456 13.203 3.159-13.203h4.023l-4.995 19.386z"/><path d="m156.726 33v-1.782c-.945 1.35-2.376 2.052-4.347 2.052-2.997 0-4.995-1.755-4.995-4.455 0-2.808 2.268-4.32 6.48-4.32.81 0 1.512.054 2.403.162v-.864c0-1.62-.918-2.565-2.484-2.565"/></g>
              </svg>
              <span className="font-bold text-base">ExpenseAI</span>
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
