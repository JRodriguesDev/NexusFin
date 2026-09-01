import { TbWallet } from 'react-icons/tb';
import { CopilotButton } from './copilotButton';
import { NavLink } from './navLink';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* LOGO E BRANDING */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <TbWallet className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Nexus<span className="text-primary">Fin</span>
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">Dashboard & AI</span>
            </div>
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP (ABAS) */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg border border-border/50 bg-muted/40 p-1">
          <NavLink />
        </nav>

        <CopilotButton />
      </div>
    </header>
  );
};
