import { TbRepeat } from 'react-icons/tb';
import { Badge } from '@/components/ui/badge';
import { TableActions } from './tableActions';
import { Transaction } from '@/types/transactions';
import { cn, dateFormat, formatCurrency } from '@/lib/utils';
import { transactionConfigStyles, transactionCategoryConfig } from '@/constants/transaction';

export const Tables = ({ transaction }: { transaction: Transaction }) => {
  const dateFormatted = dateFormat(transaction.date);
  const amountFormatted = formatCurrency(transaction.amount);
  const Icon = transactionConfigStyles[transaction.type].icon;

  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="whitespace-nowrap px-4 py-3.5">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full',
                transactionConfigStyles[transaction.type].iconBgColor,
                transactionConfigStyles[transaction.type].iconTextColor
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="font-medium text-xs sm:text-sm">{dateFormatted}</span>
          </div>
        </td>
        <td className="px-4 py-3.5 font-medium">{transaction.description}</td>
        <td className="px-4 py-3.5">
          <Badge
            variant="secondary"
            className={cn(
              'bg-emerald-500/10',
              transactionCategoryConfig[transaction.category].badgeStyle
            )}
          >
            {transactionCategoryConfig[transaction.category].label}
          </Badge>
        </td>
        <td className="px-4 py-3.5">
          {transaction.isRecurrence ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              <TbRepeat className="h-3.5 w-3.5" /> Todo dia{' '}
              {String(transaction.recurringDay).padStart(2, '0')}
            </span>
          ) : (
            <span className="px-4 py-3.5 text-xs text-muted-foreground">Pontual</span>
          )}
        </td>
        <td
          className={cn(
            'whitespace-nowrap px-4 py-3.5 text-right font-semibold',
            transactionConfigStyles[transaction.type].amountColor
          )}
        >
          {transactionConfigStyles[transaction.type].prefix} {amountFormatted}
        </td>
        <td className="px-4 py-3.5 text-right">
          <TableActions />
        </td>
      </tr>
    </>
  );
};
