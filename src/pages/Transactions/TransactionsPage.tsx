import * as React from 'react';
import { File, MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AddTransactionDialog } from './components/AddTransactionDialog';
import { Input } from '@/components/ui/input';

const mockAllTransactions = [
  { id: '1', description: 'Salário Mensal', category: 'Salário', date: '10/06/2025', amount: 5000.0, type: 'receita' },
  { id: '2', description: 'Aluguel do Apartamento', category: 'Moradia', date: '09/06/2025', amount: 1800.0, type: 'despesa' },
  { id: '3', description: 'Compras no Supermercado', category: 'Alimentação', date: '08/06/2025', amount: 432.5, type: 'despesa' },
  { id: '4', description: 'Projeto Freelance X', category: 'Freelance', date: '07/06/2025', amount: 1500.0, type: 'receita' },
  { id: '5', description: 'Cinema e Jantar', category: 'Lazer', date: '06/06/2025', amount: 175.0, type: 'despesa' },
  { id: '6', description: 'Conta de Luz', category: 'Contas', date: '05/06/2025', amount: 150.75, type: 'despesa' },
  { id: '7', description: 'Conta de Internet', category: 'Contas', date: '05/06/2025', amount: 99.9, type: 'despesa' },
  { id: '8', description: 'Venda de item usado', category: 'Outras Receitas', date: '04/06/2025', amount: 250.0, type: 'receita' },
  { id: '9', description: 'Gasolina', category: 'Transporte', date: '03/06/2025', amount: 200.0, type: 'despesa' },
  { id: '10', description: 'Farmácia', category: 'Saúde', date: '02/06/2025', amount: 85.4, type: 'despesa' },
];

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

type Transaction = typeof mockAllTransactions[0];

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead><span className="sr-only">Ações</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={transaction.type === 'receita' ? 'default' : 'destructive'}>
                    {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
                <TableCell className={`text-right ${transaction.type === 'receita' ? 'text-green-500' : ''}`}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredTransactions = React.useMemo(() => {
    return mockAllTransactions.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const incomeTransactions = filteredTransactions.filter(t => t.type === 'receita');
  const expenseTransactions = filteredTransactions.filter(t => t.type === 'despesa');

  const handleExport = () => {
    console.log('Exportando dados...');
  };

  return (
    <DashboardLayout>
      <Dialog>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar por nome..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" className="h-9 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar Transação
                </span>
              </Button>
            </DialogTrigger>
          </div>

          <Tabs defaultValue="todas">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
            </TabsList>
            <TabsContent value="todas"><TransactionTable transactions={filteredTransactions} /></TabsContent>
            <TabsContent value="receitas"><TransactionTable transactions={incomeTransactions} /></TabsContent>
            <TabsContent value="despesas"><TransactionTable transactions={expenseTransactions} /></TabsContent>
          </Tabs>
        </div>
        <AddTransactionDialog />
      </Dialog>
    </DashboardLayout>
  );
}