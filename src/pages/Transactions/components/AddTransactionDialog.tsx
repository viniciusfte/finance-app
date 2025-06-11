import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = [
  'Salário', 'Freelance', 'Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Contas', 'Saúde', 'Outras Receitas', 'Outras Despesas'
];

export function AddTransactionDialog() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Nova Transação:', data);
  };

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Adicionar Transação</DialogTitle>
        <DialogDescription>
          Preencha os dados abaixo para adicionar uma nova transação.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <Tabs defaultValue="despesa" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="receita">Receita</TabsTrigger>
              <TabsTrigger value="despesa">Despesa</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid gap-2">
            <Label htmlFor="description">
              Descrição
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Ex: Salário, Aluguel"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">
              Valor
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="R$ 0,00"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">
              Categoria
            </Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">
              Data
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar transação</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}