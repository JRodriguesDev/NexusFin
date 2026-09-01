import { TbLayoutDashboard, TbReceipt } from 'react-icons/tb';
import { FaPiggyBank } from 'react-icons/fa6';

export const navItems = [
  { href: '/', label: 'Visão Geral', icon: TbLayoutDashboard },
  { href: '/transactions', label: 'Lançamentos', icon: TbReceipt },
  { href: '/investments', label: 'Patrimônio', icon: FaPiggyBank },
];
