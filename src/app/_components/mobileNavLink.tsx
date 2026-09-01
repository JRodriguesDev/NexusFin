'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/constants/navigation';

export const MobileNavLink = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-border/40 bg-background/95 backdrop-blur md:hidden supports-[backdrop-filter]:bg-background/80">
      {navItems.map((item, i) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={i}
            href={item.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-12 items-center justify-center rounded-full transition-all duration-300',
                isActive && 'bg-primary/10'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
