import * as React from 'react';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconPicker, IconName } from './IconPicker';

export function CategoryDialog() {
  const [selectedIcon, setSelectedIcon] = React.useState<IconName>('House');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const finalData = { ...data, icon: selectedIcon };
    console.log('Dados da Categoria:', finalData);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Gerenciar Categoria</DialogTitle>
        <DialogDescription>
          Crie ou edite suas categorias aqui. Clique em salvar para aplicar as
          mudanças.
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
            <Label>Ícone</Label>
            <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Ex: Moradia" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" name="description" placeholder="Opcional" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar Categoria</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}