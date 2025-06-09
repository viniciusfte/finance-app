import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold">Bem-vindo de volta!</h1>
          <p className="text-muted-foreground">
            Insira suas credenciais para acessar sua conta.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              required
            />
          </div>

          <Button type="submit" size="lg" className="font-bold text-lg rounded-full w-full">
           <Link to="/dashboard">Entrar</Link>
          </Button>
        </form>

        <Button variant="link" asChild className="w-full">
          <Link to="/">Voltar para a tela inicial</Link>
        </Button>
      </div>
    </div>
  );
}
