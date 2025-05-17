"use client";

import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/SummaryCard";
import mockData from "@/data/mockExpenses.json";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import Link from "next/link";
import { 
  DollarSign, 
  Receipt, 
  Upload,
  Calculator
} from "lucide-react";

// Format currency function
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function DashboardPage() {
  const { summary } = mockData;

  // Prepare data for pie chart
  const pieData = Object.entries(summary.byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for pie chart
  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  return (
    <main className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link href="/upload">
            <Button size="lg">Upload Receipt</Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <SummaryCard
            title="Total Expenses"
            value={formatCurrency(summary.total)}
            description="All time expenses"
          />
          <SummaryCard
            title="Tax Deductible"
            value={formatCurrency(summary.taxDeductible)}
            description="Potential tax savings"
          />
          <SummaryCard
            title="Uploads This Month"
            value={summary.uploadsThisMonth.toString()}
            description="Receipt uploads"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {mockData.expenses.slice(0, 3).map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-neutral-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
