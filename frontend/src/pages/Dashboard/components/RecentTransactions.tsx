import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Transaction } from '@/services/api';
import { icons } from 'lucide-react';
import { IconName } from '@/pages/Categories/components/IconPicker';
import { Skeleton } from '@/components/ui/skeleton';

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const TransactionSkeleton = () => (
  <TableRow>
    <TableCell>
      <div className="flex items-center gap-4">
        <Skeleton className="hidden h-10 w-10 rounded-lg sm:flex" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    </TableCell>
    <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-full" /></TableCell>
    <TableCell className="text-right"><Skeleton className="h-4 w-[80px]" /></TableCell>
  </TableRow>
);

export function RecentTransactions({ transactions, isLoading }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
              </>
            ) : (
              transactions.map((transaction) => {
                const Icon = transaction.category?.icon ? icons[transaction.category.icon as IconName] : icons['Landmark'];
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground sm:flex">
                          {Icon && <Icon size={20} />}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {transaction.category?.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{formatDate(transaction.date)}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.type === 'receita' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'receita' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}