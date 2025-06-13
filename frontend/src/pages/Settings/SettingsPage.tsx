import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import DashboardLayout from '@/components/common/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/theme-provider';
import { getCurrentUser, updateUserProfile, changePassword, User } from '@/services/api';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  
  const [user, setUser] = React.useState<User | null>(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSavingPassword, setIsSavingPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setName(userData.name || '');
        setEmail(userData.email);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
    fetchUser();
  }, []);

  const handleProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingProfile(true);
    try {
      const updatedUser = await updateUserProfile({ name, email });
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Falha ao atualizar o perfil.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('As novas senhas não coincidem.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsSavingPassword(true);
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success('Senha alterada com sucesso!', {
        description: 'Você será desconectado por segurança.',
        duration: 5000,
      });
      localStorage.removeItem('authToken');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      setPasswordError(error.message);
      toast.error('Erro ao alterar senha', { description: error.message });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Configurações</h1>
        <Tabs defaultValue="perfil">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <form onSubmit={handleProfileUpdate}>
              <Card>
                <CardHeader><CardTitle>Informações do Perfil</CardTitle><CardDescription>Atualize os dados da sua conta aqui.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="name">Nome</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  <Button type="submit" disabled={isSavingProfile}>{isSavingProfile ? 'Salvando...' : 'Salvar Alterações'}</Button>
                </CardContent>
              </Card>
            </form>
            <form onSubmit={handlePasswordChange}>
              <Card className="mt-4">
                <CardHeader><CardTitle>Senha</CardTitle><CardDescription>Altere sua senha aqui. Após salvar, você será desconectado.</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2"><Label htmlFor="current-password">Senha Atual</Label><Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="new-password">Nova Senha</Label><Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
                  <div className="space-y-2"><Label htmlFor="confirm-password">Confirmar Nova Senha</Label><Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                  <Button type="submit" disabled={isSavingPassword}>{isSavingPassword ? 'Salvando...' : 'Salvar Nova Senha'}</Button>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="aparencia">
            <Card>
              <CardHeader><CardTitle>Aparência</CardTitle><CardDescription>Personalize a aparência do aplicativo.</CardDescription></CardHeader>
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
              <CardHeader><CardTitle>Notificações</CardTitle><CardDescription>Gerencie como você recebe notificações.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div><Label htmlFor="weekly-summary">Resumo Semanal</Label><p className="text-xs text-muted-foreground">Receba um resumo de suas transações toda semana por e-mail.</p></div>
                  <Switch id="weekly-summary" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div><Label htmlFor="budget-alerts">Alertas de Orçamento</Label><p className="text-xs text-muted-foreground">Seja notificado quando estiver próximo de atingir o limite de uma categoria.</p></div>
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