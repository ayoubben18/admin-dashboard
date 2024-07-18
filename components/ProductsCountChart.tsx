"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProductsCount } from "@/types/aggregations-types";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/db/aggregations/orders-aggregation";
import { ECOMError } from "@/lib/ecommerce-error";
import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
const chart = [
  { product: "product1", visitors: 275, fill: "var(--color-product1)" },
  { product: "product2", visitors: 200, fill: "var(--color-product2)" },
  { product: "product3", visitors: 187, fill: "var(--color-product3)" },
  { product: "product4", visitors: 173, fill: "var(--color-product4)" },
  { product: "product5", visitors: 90, fill: "var(--color-product5)" },
];

const chartConfig = {
  product1: {
    color: "hsl(var(--chart-1))",
  },
  product2: {
    color: "hsl(var(--chart-2))",
  },
  product3: {
    color: "hsl(var(--chart-3))",
  },
  product4: {
    color: "hsl(var(--chart-4))",
  },
  product5: {
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ProductsCountChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["getProductsCount"],
    queryFn: async () => {
      try {
        const data = await getAllOrders();
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
    return <Skeleton className="h-[600px] w-full rounded-xl" />;
  }
  // map the data to the chart data
  const chartData = data!.map((item, index): any => {
    return {
      name: item.product_name,
      count: item.total_sold,
      fill: `var(--color-${chart[index].product})`,
    };
  });
  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle>Most selling products</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
            }}
          >
            <YAxis
              className=" text-lg"
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Sales are up by 4% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing most selling products
        </div>
      </CardFooter>
    </Card>
  );
}
