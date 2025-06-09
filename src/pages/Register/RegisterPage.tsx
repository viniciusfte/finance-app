// src/pages/Register/RegisterPage.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground">
            Preencha os campos abaixo para começar.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              required
            />
          </div>
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
              placeholder="Crie uma senha forte"
              required
            />
          </div>

          <Button type="submit" size="lg" className="font-bold text-lg rounded-full w-full">
            Criar conta
          </Button>
        </form>

        <Button variant="link" asChild className="w-full text-white">
          <Link to="/login">Já tem uma conta? Entre</Link>
        </Button>
      </div>
    </div>
  );
}