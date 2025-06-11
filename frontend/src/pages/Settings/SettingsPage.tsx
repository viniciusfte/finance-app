import DashboardLayout from '@/components/common/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/theme-provider';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <DashboardLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <Tabs defaultValue="perfil">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize os dados da sua conta aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue="Vinícius" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="vinicius@example.com" />
                </div>
                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Senha</CardTitle>
                <CardDescription>
                  Altere sua senha aqui. Após salvar, você será desconectado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <Button>Salvar Nova Senha</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aparencia">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência do aplicativo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="flex space-x-2">
                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>Claro</Button>
                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>Escuro</Button>
                    <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>Sistema</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>
                  Gerencie como você recebe notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="weekly-summary">Resumo Semanal</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba um resumo de suas transações toda semana por e-mail.
                    </p>
                  </div>
                  <Switch id="weekly-summary" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                    <p className="text-xs text-muted-foreground">
                      Seja notificado quando estiver próximo de atingir o limite de uma categoria.
                    </p>
                  </div>
                  <Switch id="budget-alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}