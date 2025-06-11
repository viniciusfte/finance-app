import { MoreHorizontal, PlusCircle, icons } from 'lucide-react';
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
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CategoryDialog } from './components/CategoryDialog';
import { IconName } from './components/IconPicker';

const mockCategories = [
  { id: '1', name: 'Moradia', description: 'Despesas com aluguel, condomínio, etc.', type: 'despesa', icon: 'House' as IconName },
  { id: '2', name: 'Alimentação', description: 'Supermercado, restaurantes, delivery.', type: 'despesa', icon: 'UtensilsCrossed' as IconName },
  { id: '3', name: 'Salário', description: 'Recebimentos de salários.', type: 'receita', icon: 'Banknote' as IconName },
  { id: '4', name: 'Transporte', description: 'Gasolina, transporte público, apps.', type: 'despesa', icon: 'Car' as IconName },
  { id: '5', name: 'Lazer', description: 'Cinema, shows, passeios.', type: 'despesa', icon: 'Ticket' as IconName },
  { id: '6', name: 'Freelance', description: 'Recebimentos de trabalhos extra.', type: 'receita', icon: 'Briefcase' as IconName },
];

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <Dialog>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DialogTrigger asChild>
                <Button size="sm" className="h-9 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Nova Categoria
                  </span>
                </Button>
              </DialogTrigger>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCategories.map((category) => {
              const Icon = icons[category.icon];
              return (
                <Card key={category.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {category.name}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DialogTrigger asChild>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
        <CategoryDialog />
      </Dialog>
    </DashboardLayout>
  );
}