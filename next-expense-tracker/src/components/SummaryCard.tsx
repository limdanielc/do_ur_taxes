"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  description?: string;
  Icon?: LucideIcon;
  iconClassName?: string;
}

export function SummaryCard({
  title,
  value,
  description,
  Icon,
  iconClassName = "text-neutral-600",
}: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && (
          <div className={iconClassName}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-neutral-600 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
