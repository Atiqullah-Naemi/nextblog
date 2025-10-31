"use client";

import { Post } from "@/lib/generated/prisma/client";
import { Bar, BarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  desktop: {
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface ChartProps {
  data: Post[];
}

export default function DashboardChart({ data }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Views</CardTitle>
        <CardDescription>Trending posts by number of views</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <Bar dataKey="views" />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
