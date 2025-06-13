import * as React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconPicker, IconName } from './IconPicker';
import { Category, createCategory, updateCategory } from '@/services/api';

interface CategoryDialogProps {
  categoryToEdit?: Category | null;
  onSave: () => void;
  setDialogOpen: (open: boolean) => void;
}

export function CategoryDialog({ categoryToEdit, onSave, setDialogOpen }: CategoryDialogProps) {
  const [selectedIcon, setSelectedIcon] = React.useState<IconName>('House');
  const [type, setType] = React.useState('despesa');
  const isEditMode = Boolean(categoryToEdit);

  React.useEffect(() => {
    if (categoryToEdit) {
      setSelectedIcon(categoryToEdit.icon as IconName);
      setType(categoryToEdit.type);
    }
  }, [categoryToEdit]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      icon: selectedIcon,
      type: type,
    };

    try {
      if (isEditMode) {
        await updateCategory(categoryToEdit!.id, data);
      } else {
        await createCategory(data);
      }
      onSave();
      setDialogOpen(false);
    } catch (error) {
      console.error("Falha ao salvar categoria:", error);
      alert("Não foi possível salvar a categoria.");
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
        <DialogDescription>
          {isEditMode ? 'Edite os dados da sua categoria.' : 'Crie uma nova categoria para suas transações.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <Tabs value={type} onValueChange={(value) => setType(value || 'despesa')} className="w-full">
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
            <Input id="name" name="name" defaultValue={categoryToEdit?.name} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" name="description" defaultValue={categoryToEdit?.description || ''} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}