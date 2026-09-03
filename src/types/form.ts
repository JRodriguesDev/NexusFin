type FormType = {
  success?: boolean;
  message?: string;
};

export type FixedIncomeType = FormType & {
  errors?: {
    description?: string;
    amount?: string;
    day?: string;
    category?: string;
  };
};
