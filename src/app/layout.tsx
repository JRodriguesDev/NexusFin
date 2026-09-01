import './globals.css';
import type { Metadata } from 'next';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'NexusFin - Dashboard Financeiro',
  description: 'Seu copiloto financeiro inteligente',
};

export const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="pt-br" className={cn("h-full antialiased", "font-sans", 'dark', geist.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
