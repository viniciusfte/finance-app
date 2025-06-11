import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  Home,
  UtensilsCrossed,
  HandCoins,
  Film,
  Icon,
} from 'lucide-react';

const mockTransactions = [
  {
    id: '1',
    description: 'Salário Mensal',
    category: 'Salário',
    date: '10/06/2025',
    amount: 5000.0,
    type: 'receita',
  },
  {
    id: '2',
    description: 'Aluguel do Apartamento',
    category: 'Moradia',
    date: '09/06/2025',
    amount: 1800.0,
    type: 'despesa',
  },
  {
    id: '3',
    description: 'Compras no Supermercado',
    category: 'Alimentação',
    date: '08/06/2025',
    amount: 432.5,
    type: 'despesa',
  },
  {
    id: '4',
    description: 'Projeto Freelance X',
    category: 'Freelance',
    date: '07/06/2025',
    amount: 1500.0,
    type: 'receita',
  },
  {
    id: '5',
    description: 'Cinema e Jantar',
    category: 'Lazer',
    date: '06/06/2025',
    amount: 175.0,
    type: 'despesa',
  },
];

const categoryIcons: { [key: string]: React.ReactElement<typeof Icon> } = {
  Salário: <Briefcase size={20} />,
  Moradia: <Home size={20} />,
  Alimentação: <UtensilsCrossed size={20} />,
  Freelance: <HandCoins size={20} />,
  Lazer: <Film size={20} />,
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export function RecentTransactions() {
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
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="flex min-h-10 min-w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      {categoryIcons[transaction.category]}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.description}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:block">
                        {transaction.category}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {transaction.date}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    transaction.type === 'receita'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'receita' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}