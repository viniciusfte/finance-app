import * as React from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CategoryChart } from './components/CategoryChart';
import { RecentTransactions } from './components/RecentTransactions';
import { getTransactions, getSummaryData, getCategories, Transaction, SummaryData, Category } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default function DashboardPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [summary, setSummary] = React.useState<SummaryData | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [transactionsData, summaryData, categoriesData] = await Promise.all([
          getTransactions({ limit: 5 }),
          getSummaryData(),
          getCategories(),
        ]);
        setTransactions(transactionsData);
        setSummary(summaryData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Saldo Total</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-3/4" /> : <p className="text-2xl font-bold">{formatCurrency(summary!.totalBalance)}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Receitas do Mês</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-3/4" /> : <p className="text-2xl font-bold text-green-500">+ {formatCurrency(summary!.monthlyIncome)}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Despesas do Mês</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-3/4" /> : <p className="text-2xl font-bold text-red-500">- {formatCurrency(summary!.monthlyExpense)}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Balanço do Mês</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-3/4" /> : 
              <p className={`text-2xl font-bold ${summary!.monthlyBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(summary!.monthlyBalance)}
              </p>
            }
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-4 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <CategoryChart transactions={transactions} categories={categories} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-3">
          <RecentTransactions transactions={transactions} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}