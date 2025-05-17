"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import extractedData from "@/data/extractedReceipt.json";

const categories = [
  "Office",
  "Food",
  "Travel",
  "Software",
  "Hardware",
  "Other",
];

export default function CategorizePage() {
  const router = useRouter();
  const [items, setItems] = useState(extractedData.items);

  const handleCategoryChange = (itemId: string, category: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, category } : item
      )
    );
  };

  const handleSave = () => {
    // In a real app, we would save the categorized items
    console.log("Saving categorized items:", items);
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Categorize Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Receipt Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-600">Vendor</p>
                  <p className="font-medium">{extractedData.vendor}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Date</p>
                  <p className="font-medium">{extractedData.date}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Total</p>
                  <p className="font-medium">${extractedData.total}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Confidence</p>
                  <p className="font-medium">
                    {(extractedData.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Tax Deductible</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <select
                        className="w-full border rounded p-1"
                        value={item.category}
                        onChange={(e) =>
                          handleCategoryChange(item.id, e.target.value)
                        }
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={item.taxDeductible}
                        className="rounded border-neutral-300"
                        onChange={() =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, taxDeductible: !i.taxDeductible }
                                : i
                            )
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button onClick={handleSave}>Save Categories</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
