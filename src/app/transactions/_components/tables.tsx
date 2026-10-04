import { Badge } from '@/components/ui/badge';
import { TableActions } from './tableActions';
import { EmptyTable } from '@/app/_components/emptyTable';
import { ErrorTable } from '@/app/_components/errorTable';
import { cn, dateFormat, formatCurrency } from '@/lib/utils';
import { transactionConfig, transactionCategoryConfig } from '@/constants/transaction';
import { getTransactionsAction } from '../actions';
import { TransactionSearchParamsType } from '@/types/transactions';

export const Tables = async ({ params }: { params: TransactionSearchParamsType }) => {
  const response = await getTransactionsAction(params);
  if (!response.success) return <ErrorTable error={response.message} />;
  if (response.data?.length === 0) return <EmptyTable />;
  const transactions = response.data;

  return (
    <>
      {transactions?.map((transaction) => {
        const dateFormatted = dateFormat(transaction.date);
        const amountFormatted = formatCurrency(transaction.amount);
        const Icon = transactionConfig[transaction.type].icon;
        return (
          <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
            <td className="whitespace-nowrap px-4 py-3.5">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full',
                    transactionConfig[transaction.type].iconBgColor,
                    transactionConfig[transaction.type].iconTextColor
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
            <td
              className={cn(
                'whitespace-nowrap px-4 py-3.5 text-right font-semibold',
                transactionConfig[transaction.type].amountColor
              )}
            >
              {transactionConfig[transaction.type].prefix} {amountFormatted}
            </td>
            <td className="px-4 py-3.5 text-right">
              <TableActions transaction={transaction} />
            </td>
          </tr>
        );
      })}
    </>
  );
};
