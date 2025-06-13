import * as React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  CircleUser,
  Home,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Wallet,
  ArrowRightLeft,
  LayoutGrid,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/images/logo.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Transações', href: '/transactions', icon: ArrowRightLeft },
  { label: 'Categorias', href: '/categories', icon: LayoutGrid },
  { label: 'Configurações', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, setTheme } = useTheme();
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      { 'bg-accent text-primary': isActive }
    );

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
    }`;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-all duration-300 sm:flex',
            isSidebarExpanded ? 'w-60' : 'w-0 border-none'
          )}
        >
          <div className="flex h-full max-h-screen flex-col gap-2 overflow-hidden">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to="/" className="flex items-center gap-3 font-semibold">
                <img src={logoImage} alt="+grana Logo" className="h-6 w-6" />
                <span>+Grana</span>
              </Link>
            </div>
            <nav className="grid items-start px-2 text-sm font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={getNavLinkClass}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <div
          className={cn(
            'flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 pb-20 sm:pb-4',
            isSidebarExpanded ? 'sm:pl-60' : 'sm:pl-0'
          )}
        >
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Button
              variant="outline"
              size="icon"
              className="hidden shrink-0 sm:flex"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar menu</span>
            </Button>

            <div className="ml-auto flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="rounded-lg bg-background pl-8 w-[200px] lg:w-[300px]"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Alternar tema</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Abrir menu do usuário</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Suporte</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background sm:hidden">
          <nav className="flex items-center justify-around p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={getMobileNavLinkClass}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </footer>
      </div>
    </TooltipProvider>
  );
}