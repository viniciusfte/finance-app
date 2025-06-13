import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createTransaction, updateTransaction, getCategories, Category, Transaction, TransactionPayload } from '@/services/api';

interface TransactionDialogProps {
  onSave: () => void;
  setDialogOpen: (open: boolean) => void;
  transactionToEdit?: Transaction | null;
}

export function TransactionDialog({ onSave, setDialogOpen, transactionToEdit }: TransactionDialogProps) {
  const [type, setType] = React.useState('despesa');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isEditMode = Boolean(transactionToEdit);

  React.useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
    } else {
      setType('despesa');
    }
  }, [transactionToEdit]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: TransactionPayload = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      categoryId: parseInt(formData.get('category') as string),
      type: type,
    };

    try {
      if (isEditMode) {
        await updateTransaction(transactionToEdit.id, data);
      } else {
        await createTransaction(data);
      }
      onSave();
      setDialogOpen(false);
    } catch (error) {
      alert("Falha ao salvar. Verifique os dados e tente novamente.");
    }
  };
  
  const filteredCategories = categories.filter(c => c.type === type);
  const canSubmit = filteredCategories.length > 0;

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Editar Transação' : 'Adicionar Transação'}</DialogTitle>
        <DialogDescription>
          {isEditMode ? 'Edite os dados da sua transação.' : 'Preencha os dados abaixo para adicionar uma nova transação.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} id="transaction-form">
        <div className="grid gap-4 py-4">
          <Tabs value={type} onValueChange={setType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="receita">Receita</TabsTrigger>
              <TabsTrigger value="despesa">Despesa</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" name="description" defaultValue={transactionToEdit?.description} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Valor</Label>
            <Input id="amount" name="amount" type="number" step="0.01" defaultValue={transactionToEdit?.amount} placeholder="R$ 0,00" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select name="category" defaultValue={String(transactionToEdit?.categoryId)} required disabled={!canSubmit}>
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Carregando..." : !canSubmit ? `Nenhuma categoria de '${type}'` : "Selecione uma categoria"} />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map(category => (
                  <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" name="date" type="date" defaultValue={transactionToEdit ? transactionToEdit.date.split('T')[0] : new Date().toISOString().split('T')[0]} required />
          </div>
        </div>
      </form>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
        <Button type="submit" form="transaction-form" disabled={!canSubmit}>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
}