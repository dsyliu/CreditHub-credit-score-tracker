export interface ScoreIngredientBreakdown {
  title: string;
  value: string;
}

export interface PaymentHistoryScoreIngredientBreakdown extends ScoreIngredientBreakdown {
  title: 'Accounts with late payments 30+ days' | 'Accounts with late payments 60+ days' | 'Deregoatory public records' | 'Collections' | 'Months since most recent late payment' | 'Accounts always paid as agreed';
}

export interface AmountOfDebtScoreIngredientBreakdown extends ScoreIngredientBreakdown {
  title: 'Accounts with balances' | 'Total balance on revolving accounts' | 'Revolving utilization';
}

export interface CreditHistoryScoreIngredientBreakdown extends ScoreIngredientBreakdown {
  title: 'Average age of accounts' | 'age of oldest account';
}

export interface NewCreditAmountScoreIngredientBreakdown extends ScoreIngredientBreakdown {
  title: 'Number of recent inquiries' | 'Age of most recent opened account';
}

export interface CreditMixScoreIngredientBreakdown extends ScoreIngredientBreakdown {
  title: 'Revoling accounts' | 'Installment loans' | 'Bank-issued credit card accounts';
}

export interface ScoreIngredient {
  category: string;
  title: string;
  description: string;
  status: 'Exceptional' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  breakdown: ScoreIngredientBreakdown[];
} 

export interface PaymentHistoryScoreIngredient extends ScoreIngredient {
  breakdown: PaymentHistoryScoreIngredientBreakdown[];
}

export interface AmountOfDebtScoreIngredient extends ScoreIngredient {
  breakdown: AmountOfDebtScoreIngredientBreakdown[];
}

export interface CreditHistoryScoreIngredient extends ScoreIngredient {
  breakdown: CreditHistoryScoreIngredientBreakdown[];
}

export interface NewCreditAmountScoreIngredient extends ScoreIngredient {
  breakdown: NewCreditAmountScoreIngredientBreakdown[];
}

export interface CreditMixScoreIngredient extends ScoreIngredient {
  breakdown: CreditMixScoreIngredientBreakdown[];
}

export interface ScoreSnapshot {
  date: Date;
  score: number;
  paymentHistoryScoreIngredient: PaymentHistoryScoreIngredient;
  amountOfDebtScoreIngredient: AmountOfDebtScoreIngredient;
  creditHistoryScoreIngredient: CreditHistoryScoreIngredient;
  newCreditAmountScoreIngredient: NewCreditAmountScoreIngredient;
  creditMixScoreIngredient: CreditMixScoreIngredient;
} 

export const scoreHistoryData: ScoreSnapshot[] = [
  {
    date: new Date('2024-08-01'),
    score: 680,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Good',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '2' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '1' },
        { title: 'Months since most recent late payment', value: '12' },
        { title: 'Accounts always paid as agreed', value: '3' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Fair',
      breakdown: [
        { title: 'Accounts with balances', value: '5' },
        { title: 'Total balance on revolving accounts', value: '$12,000' },
        { title: 'Revolving utilization', value: '45%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '2.5 years' },
        { title: 'age of oldest account', value: '4 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Fair',
      breakdown: [
        { title: 'Number of recent inquiries', value: '3' },
        { title: 'Age of most recent opened account', value: '2 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Good',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '1' }
      ]
    }
  },
  {
    date: new Date('2024-09-01'),
    score: 690,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Good',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '1' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '1' },
        { title: 'Months since most recent late payment', value: '13' },
        { title: 'Accounts always paid as agreed', value: '4' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Fair',
      breakdown: [
        { title: 'Accounts with balances', value: '5' },
        { title: 'Total balance on revolving accounts', value: '$10,000' },
        { title: 'Revolving utilization', value: '40%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '2.5 years' },
        { title: 'age of oldest account', value: '4 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Fair',
      breakdown: [
        { title: 'Number of recent inquiries', value: '3' },
        { title: 'Age of most recent opened account', value: '3 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Good',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '1' }
      ]
    }
  },
  {
    date: new Date('2024-10-01'),
    score: 700,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Good',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '1' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '14' },
        { title: 'Accounts always paid as agreed', value: '2' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Fair',
      breakdown: [
        { title: 'Accounts with balances', value: '4' },
        { title: 'Total balance on revolving accounts', value: '$9,000' },
        { title: 'Revolving utilization', value: '35%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '2.5 years' },
        { title: 'age of oldest account', value: '4 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '2' },
        { title: 'Age of most recent opened account', value: '4 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Good',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2024-11-01'),
    score: 750,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '15' },
        { title: 'Accounts always paid as agreed', value: '5' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$5,000' },
        { title: 'Revolving utilization', value: '15%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '3 years' },
        { title: 'age of oldest account', value: '5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '6' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2024-12-01'),
    score: 735,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '16' },
        { title: 'Accounts always paid as agreed', value: '4' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$6,000' },
        { title: 'Revolving utilization', value: '20%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '3 years' },
        { title: 'age of oldest account', value: '5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '5' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2025-01-01'),
    score: 720,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '17' },
        { title: 'Accounts always paid as agreed', value: '3' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Fair',
      breakdown: [
        { title: 'Accounts with balances', value: '4' },
        { title: 'Total balance on revolving accounts', value: '$8,000' },
        { title: 'Revolving utilization', value: '30%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Fair',
      breakdown: [
        { title: 'Average age of accounts', value: '3 years' },
        { title: 'age of oldest account', value: '5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '2' },
        { title: 'Age of most recent opened account', value: '4 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Very Good',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2025-01-15'),
    score: 760,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '1' },
        { title: 'Accounts always paid as agreed', value: '5' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$4,000' },
        { title: 'Revolving utilization', value: '12%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Good',
      breakdown: [
        { title: 'Average age of accounts', value: '3.5 years' },
        { title: 'age of oldest account', value: '5.5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Very Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '8 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2025-02-01'),
    score: 765,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '2' },
        { title: 'Accounts always paid as agreed', value: '4' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$3,500' },
        { title: 'Revolving utilization', value: '10%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Good',
      breakdown: [
        { title: 'Average age of accounts', value: '3.5 years' },
        { title: 'age of oldest account', value: '5.5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Very Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '9 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2025-03-01'),
    score: 770,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '3' },
        { title: 'Accounts always paid as agreed', value: '5' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$3,000' },
        { title: 'Revolving utilization', value: '8%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Good',
      breakdown: [
        { title: 'Average age of accounts', value: '3.5 years' },
        { title: 'age of oldest account', value: '5.5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Very Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '10 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  },
  {
    date: new Date('2025-04-01'),
    score: 775,
    paymentHistoryScoreIngredient: {
      category: 'payment-history',
      title: 'Payment History',
      description: 'Track your payment patterns and history',
      status: 'Exceptional',
      breakdown: [
        { title: 'Accounts with late payments 30+ days', value: '0' },
        { title: 'Accounts with late payments 60+ days', value: '0' },
        { title: 'Deregoatory public records', value: '0' },
        { title: 'Collections', value: '0' },
        { title: 'Months since most recent late payment', value: '4' },
        { title: 'Accounts always paid as agreed', value: '4' }
      ]
    },
    amountOfDebtScoreIngredient: {
      category: 'debt-amount',
      title: 'Amount of Debt',
      description: 'Monitor your total debt and utilization',
      status: 'Very Good',
      breakdown: [
        { title: 'Accounts with balances', value: '3' },
        { title: 'Total balance on revolving accounts', value: '$2,500' },
        { title: 'Revolving utilization', value: '6%' }
      ]
    },
    creditHistoryScoreIngredient: {
      category: 'credit-history',
      title: 'Length of Credit History',
      description: 'View your credit account age and history',
      status: 'Good',
      breakdown: [
        { title: 'Average age of accounts', value: '3.5 years' },
        { title: 'age of oldest account', value: '5.5 years' }
      ]
    },
    newCreditAmountScoreIngredient: {
      category: 'new-credit',
      title: 'Amount of New Credit',
      description: 'Track recent credit applications and accounts',
      status: 'Very Good',
      breakdown: [
        { title: 'Number of recent inquiries', value: '1' },
        { title: 'Age of most recent opened account', value: '11 months' }
      ]
    },
    creditMixScoreIngredient: {
      category: 'credit-mix',
      title: 'Credit Mix',
      description: 'Analyze your types of credit accounts',
      status: 'Exceptional',
      breakdown: [
        { title: 'Revoling accounts', value: '3' },
        { title: 'Installment loans', value: '1' },
        { title: 'Bank-issued credit card accounts', value: '2' }
      ]
    }
  }
]; 

