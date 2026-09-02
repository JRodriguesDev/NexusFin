'use client';

import { cn } from '@/lib/utils';
import { navItems } from '@/constants/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const NavLink = () => {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item, i) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link href={item.href} key={i}>
            <Button
              variant="ghost"
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-400 cursor-pointer',
                isActive
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              )}
            >
              <Icon
                className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')}
              />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </>
  );
};
