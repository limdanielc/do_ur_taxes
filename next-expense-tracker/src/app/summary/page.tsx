import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mockData from "@/data/mockExpenses.json";

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function SummaryPage() {
  const { summary } = mockData;

  return (
    <main className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Tax Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Summary Stats */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="space-y-2">
                <p className="text-sm text-neutral-600">Total Expenses</p>
                <p className="text-3xl font-bold">
                  {formatCurrency(summary.total)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-neutral-600">Tax Deductible Amount</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(summary.taxDeductible)}
                </p>
              </div>
            </div>

            {/* Tax Savings Card */}
            <Card className="bg-green-50 border-green-100 mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Potential Tax Savings
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        Based on your tax-deductible expenses, you could save
                        approximately:
                      </p>
                      <p className="text-2xl font-bold text-green-800 mt-2">
                        {formatCurrency(summary.taxDeductible * 0.3)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deduction Breakdown */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-lg">Deduction Breakdown</h3>
              {Object.entries(summary.byCategory).map(([category, amount]) => (
                <div
                  key={category}
                  className="flex justify-between items-center p-3 bg-white border rounded-lg"
                >
                  <span className="font-medium">{category}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild>
                <a href="/reports/tax-report.txt" download="tax-report.txt">
                  Download Tax Report
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tax Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Filing Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Keep Good Records</h4>
              <p className="text-sm text-neutral-600">
                Store all receipts and documentation for at least 7 years.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Regular Updates</h4>
              <p className="text-sm text-neutral-600">
                Update your expense records monthly to avoid last-minute rush.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Consult a Professional</h4>
              <p className="text-sm text-neutral-600">
                Consider consulting a tax professional for complex deductions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
