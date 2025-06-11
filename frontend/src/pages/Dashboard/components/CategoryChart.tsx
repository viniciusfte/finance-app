import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const receitasData = [
  { category: 'salario', amount: 5000, fill: 'var(--color-salario)' },
  { category: 'freelance', amount: 1500, fill: 'var(--color-freelance)' },
  { category: 'investimentos', amount: 800, fill: 'var(--color-investimentos)' },
];

const receitasConfig = {
  amount: {
    label: 'Valor',
  },
  salario: {
    label: 'Salário',
    color: 'hsl(var(--chart-1))',
  },
  freelance: {
    label: 'Freelance',
    color: 'hsl(var(--chart-2))',
  },
  investimentos: {
    label: 'Investimentos',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const despesasData = [
  { category: 'aluguel', amount: 1800, fill: 'var(--color-aluguel)' },
  { category: 'alimentacao', amount: 950, fill: 'var(--color-alimentacao)' },
  { category: 'transporte', amount: 300, fill: 'var(--color-transporte)' },
  { category: 'lazer', amount: 450, fill: 'var(--color-lazer)' },
  { category: 'outros', amount: 200, fill: 'var(--color-outros)' },
];

const despesasConfig = {
  amount: {
    label: 'Valor',
  },
  aluguel: {
    label: 'Aluguel',
    color: 'hsl(var(--chart-1))',
  },
  alimentacao: {
    label: 'Alimentação',
    color: 'hsl(var(--chart-2))',
  },
  transporte: {
    label: 'Transporte',
    color: 'hsl(var(--chart-3))',
  },
  lazer: {
    label: 'Lazer',
    color: 'hsl(var(--chart-4))',
  },
  outros: {
    label: 'Outros',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export function CategoryChart() {
  const totalReceitas = React.useMemo(() => {
    return receitasData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const totalDespesas = React.useMemo(() => {
    return despesasData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card>
      <Tabs defaultValue="despesas" className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Visão por Categoria</CardTitle>
            <TabsList>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent className="pb-0">
          <TabsContent value="receitas">
            <ChartContainer
              config={receitasConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="category" hideLabel />}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Pie
                  data={receitasData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={80}
                  paddingAngle={2}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {formatCurrency(totalReceitas)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="despesas">
            <ChartContainer
              config={despesasConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="category" />}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Pie
                  data={despesasData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={80}
                  paddingAngle={2}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {formatCurrency(totalDespesas)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              Total
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}