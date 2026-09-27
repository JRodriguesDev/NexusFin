export const Badge = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'default';
}) => {
  const styles = {
    income: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    expense: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    default: 'bg-muted text-muted-foreground border-border',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
