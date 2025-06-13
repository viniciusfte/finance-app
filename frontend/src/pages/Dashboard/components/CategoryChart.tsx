import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Transaction, Category } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryChartProps {
  transactions: Transaction[];
  categories: Category[];
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const generateChartConfig = (categories: Category[]): ChartConfig => {
  const config: ChartConfig = { amount: { label: 'Valor' } };
  categories.forEach((item, index) => {
    config[item.name] = {
      label: item.name,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    };
  });
  return config;
};

const processChartData = (transactions: Transaction[], type: 'receita' | 'despesa') => {
  const categoryMap = new Map<string, number>();

  transactions
    .filter((t) => t.type === type)
    .forEach((t) => {
      const categoryName = t.category.name;
      categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + t.amount);
    });

  return Array.from(categoryMap.entries()).map(([name, amount]) => ({
    category: name,
    amount,
    fill: `var(--color-${name.toLowerCase().replace(/\s/g, '-')})`,
  }));
};

const ChartSkeleton = () => (
  <div className="flex flex-col items-center justify-center h-full aspect-square max-h-[300px] mx-auto">
    <Skeleton className="h-[200px] w-[200px] rounded-full" />
    <div className="flex gap-4 mt-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

export function CategoryChart({ transactions, categories, isLoading }: CategoryChartProps) {
  const chartData = React.useMemo(() => {
    return {
      receitas: processChartData(transactions, 'receita'),
      despesas: processChartData(transactions, 'despesa'),
    };
  }, [transactions]);

  const chartConfig = React.useMemo(() => generateChartConfig(categories), [categories]);
  
  const totalReceitas = chartData.receitas.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDespesas = chartData.despesas.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Card>
      <Tabs defaultValue="despesas" className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center"><CardTitle>Visão por Categoria</CardTitle><TabsList><TabsTrigger value="receitas">Receitas</TabsTrigger><TabsTrigger value="despesas">Despesas</TabsTrigger></TabsList></div>
        </CardHeader>
        <CardContent className="pb-0">
          {isLoading ? <ChartSkeleton /> : (
            <>
              <TabsContent value="receitas">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="category" />} formatter={(value) => formatCurrency(value as number)} />
                    <Pie data={chartData.receitas} dataKey="amount" nameKey="category" innerRadius={80} paddingAngle={2}>
                      <Label content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">{formatCurrency(totalReceitas)}</tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-sm">Total</tspan>
                              </text>
                            );
                          }
                          return null;
                        }} />
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="category" />} />
                  </PieChart>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="despesas">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="category" />} formatter={(value) => formatCurrency(value as number)} />
                    <Pie data={chartData.despesas} dataKey="amount" nameKey="category" innerRadius={80} paddingAngle={2}>
                      <Label content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">{formatCurrency(totalDespesas)}</tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-sm">Total</tspan>
                              </text>
                            );
                          }
                          return null;
                        }} />
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="category" />} />
                  </PieChart>
                </ChartContainer>
              </TabsContent>
            </>
          )}
        </CardContent>
      </Tabs>
    </Card>
  );
}