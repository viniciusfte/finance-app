import * as React from 'react';
import { MoreHorizontal, PlusCircle, Search, icons } from 'lucide-react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CategoryDialog } from './components/CategoryDialog';
import { IconName } from './components/IconPicker';
import { Category, getCategories, deleteCategory } from '@/services/api';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<Category | null>(null);

  const fetchCategories = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Categoria excluída com sucesso.");
      fetchCategories();
    } catch (error) {
      toast.error("Não foi possível excluir a categoria.");
    }
  };

  const handleOpenDialog = (category: Category | null = null) => {
    setCategoryToEdit(category);
    setIsDialogOpen(true);
  };

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <DashboardLayout>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
                      <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Pesquisar categorias..."
                          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button size="sm" className="h-9 gap-1" onClick={() => handleOpenDialog()}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Nova Categoria</span>
                      </Button>
                    </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? <p>Carregando...</p> : filteredCategories.map((category) => {
              const Icon = icons[category.icon as IconName];
              return (
                <Card key={category.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      {category.name}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenDialog(category)}>Editar</DropdownMenuItem>
                        <ConfirmationDialog title="Tem certeza?" description="Esta ação não pode ser desfeita. A categoria e suas transações associadas serão excluídas." onConfirm={() => handleDelete(category.id)}>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">Excluir</DropdownMenuItem>
                        </ConfirmationDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent><p className="text-xs text-muted-foreground">{category.description}</p></CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        {isDialogOpen && <CategoryDialog onSave={fetchCategories} setDialogOpen={setIsDialogOpen} categoryToEdit={categoryToEdit} />}
      </Dialog>
    </DashboardLayout>
  );
}