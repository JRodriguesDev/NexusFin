export type FormType = {
  success?: boolean;
  message?: string;
};

export type InvestimentType = FormType & {
  errors?: {
    ticker?: string;
    name?: string;
    quantity?: string;
    price?: string;
    date?: string;
  };
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
