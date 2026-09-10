export type FormType = {
  success?: boolean;
  message?: string;
};

export type TransactionType = FormType & {
  errors?: {
    description?: string;
    amount?: string;
    recurringDay?: string;
    isRecurrence?: string;
    category?: string;
  };
};
