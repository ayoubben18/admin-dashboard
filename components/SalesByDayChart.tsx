"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getGroupedOrders } from "@/db/aggregations/delivery-aggregation";
import { toast } from "sonner";
import { ECOMError } from "@/lib/ecommerce-error";
import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  views: {
    label: "Number of Orders",
  },
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SalesByDayChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["getTotalOrders"],
    queryFn: async () => {
      try {
        const data = await getGroupedOrders();
        if (!data) {
          throw new ECOMError(
            "No data found",
            ECOMErrorEnum.DatabaseError,
            404
          );
        }
        return data;
      } catch (error) {
        toast.error("Failed to fetch data");
        return [];
      }
    },
  });

  if (isLoading) {
    // generate a skeleton that can fit at it's place just a rectangle
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  return (
    <Card className=" w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Sales by day</CardTitle>
          <CardDescription>
            Showing total orders for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Orders</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {data && data.reduce((acc, curr) => acc + curr.count, 0)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"count"} fill={`hsl(var(--chart-1))`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
