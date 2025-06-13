import * as React from 'react';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TransactionDialog } from './components/TransactionDialog';
import { Transaction, getTransactions, deleteTransaction } from '@/services/api';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { toast } from "sonner";

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR');

export default function TransactionsPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('todas');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [transactionToEdit, setTransactionToEdit] = React.useState<Transaction | null>(null);

  const fetchTransactions = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTransactions({ type: activeTab, q: searchTerm });
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, searchTerm]);

  React.useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

 const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
      toast.success("Transação excluída com sucesso.");
      fetchTransactions();
    } catch (error) {
      toast.error("Não foi possível excluir a transação.");
    }
  };
  
  const handleOpenDialog = (transaction: Transaction | null = null) => {
    setTransactionToEdit(transaction);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="sm" className="h-9 gap-1" onClick={() => handleOpenDialog()}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Adicionar Transação</span>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <Card>
                <CardHeader><CardTitle>Suas Transações</CardTitle><CardDescription>Uma lista de todas as suas transações.</CardDescription></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Descrição</TableHead><TableHead className="hidden md:table-cell">Tipo</TableHead><TableHead className="hidden md:table-cell">Data</TableHead><TableHead className="text-right">Valor</TableHead><TableHead><span className="sr-only">Ações</span></TableHead></TableRow></TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow><TableCell colSpan={5} className="text-center">Carregando...</TableCell></TableRow>
                      ) : transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell className="hidden md:table-cell"><Badge variant={transaction.type === 'receita' ? 'default' : 'destructive'}>{transaction.type}</Badge></TableCell>
                          <TableCell className="hidden md:table-cell">{formatDate(transaction.date)}</TableCell>
                          <TableCell className={`text-right ${transaction.type === 'receita' ? 'text-green-500' : ''}`}>{formatCurrency(transaction.amount)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild><Button aria-haspopup="true" size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /><span className="sr-only">Menu</span></Button></DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleOpenDialog(transaction)}>Editar</DropdownMenuItem>
                              <ConfirmationDialog
  title="Tem certeza?"
  description="Esta ação não pode ser desfeita. A transação será excluída permanentemente."
  onConfirm={() => handleDelete(transaction.id)}
>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">Excluir</DropdownMenuItem>
                                </ConfirmationDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {isDialogOpen && <TransactionDialog onSave={fetchTransactions} setDialogOpen={setIsDialogOpen} transactionToEdit={transactionToEdit} />}
      </Dialog>
    </DashboardLayout>
  );
}