import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Expense Tracker</CardTitle>
          <CardDescription className="text-center">
            Track expenses & calculate tax deductions with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
            <Link href="/dashboard" className="w-full block">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
            </Link>
            <p className="text-sm text-center text-neutral-500">
              Demo account auto-login for hackathon purposes
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
