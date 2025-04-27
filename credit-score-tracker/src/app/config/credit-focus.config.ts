export interface CreditFocus {
  id: string;
  label: string;
  description: string;
  baseData: number[];
}

export interface PreferenceMapping {
  id: string;
  label: string;
  creditFocuses: CreditFocus[];
}

export const creditFocusConfig: { preferenceMappings: PreferenceMapping[] } = {
  preferenceMappings: [
    {
      id: "new-to-credit",
      label: "I'm new to credit",
      creditFocuses: [
        {
          id: "credit-education",
          label: "Credit Education",
          description: "Understanding credit basics and building credit history",
          baseData: [30, 45, 60, 75, 85, 95] // Knowledge score (0-100)
        },
        {
          id: "first-credit-card",
          label: "First Credit Card",
          description: "Getting and managing your first credit card responsibly",
          baseData: [0, 0, 0, 0, 0, 0] // Months since first card
        },
        {
          id: "credit-monitoring",
          label: "Credit Monitoring",
          description: "Regularly checking your credit score and reports",
          baseData: [0, 1, 2, 3, 4, 5] // Number of checks per month
        }
      ]
    },
    {
      id: "big-purchase",
      label: "I have a big purchase coming up",
      creditFocuses: [
        {
          id: "debt-to-income",
          label: "Debt-to-Income Ratio (%)",
          description: "Managing existing debt to improve loan eligibility",
          baseData: [45, 42, 38, 35, 32, 30] // Percentage
        },
        {
          id: "credit-inquiries",
          label: "Credit Inquiries",
          description: "Minimizing hard inquiries before major purchases",
          baseData: [5, 4, 3, 2, 1, 0] // Number of inquiries
        }
      ]
    },
    {
      id: "retirement",
      label: "I want to set up retirement plan",
      creditFocuses: [
        {
          id: "credit-utilization",
          label: "Credit Utilization",
          description: "Maintaining low credit utilization for financial stability",
          baseData: [40, 35, 30, 25, 20, 15] // Percentage
        },
        {
          id: "long-term-credit",
          label: "Long-term Credit Health",
          description: "Building and maintaining strong credit for retirement",
          baseData: [60, 65, 70, 75, 80, 85] // Credit health score (0-100)
        },
        {
          id: "debt-management",
          label: "Debt Management",
          description: "Reducing and managing debt before retirement",
          baseData: [50, 45, 40, 35, 30, 25] // Debt level (0-100)
        }
      ]
    },
    {
      id: "pay-debts",
      label: "I want to pay off debts",
      creditFocuses: [
        {
          id: "debt-repayment",
          label: "Debt Repayment Strategy",
          description: "Creating and following a debt repayment plan",
          baseData: [20, 30, 40, 50, 60, 70] // Strategy implementation score (0-100)
        },
        {
          id: "credit-utilization-reduction",
          label: "Credit Utilization Reduction",
          description: "Lowering credit card balances and utilization",
          baseData: [60, 50, 40, 30, 20, 10] // Percentage
        },
        {
          id: "payment-history",
          label: "Payment History",
          description: "Maintaining on-time payments while paying down debt",
          baseData: [70, 75, 80, 85, 90, 95] // On-time payment percentage
        }
      ]
    },
    {
      id: "learn-finance",
      label: "I want to learn more about my financial situation",
      creditFocuses: [
        {
          id: "credit-report-analysis",
          label: "Credit Report Analysis",
          description: "Understanding and analyzing your credit report",
          baseData: [30, 45, 60, 75, 85, 95] // Analysis proficiency score (0-100)
        },
        {
          id: "credit-score-factors",
          label: "Credit Score Factors",
          description: "Learning about factors that affect your credit score",
          baseData: [40, 55, 70, 80, 90, 100] // Knowledge score (0-100)
        },
        {
          id: "financial-habits",
          label: "Financial Habits",
          description: "Developing good financial habits and practices",
          baseData: [25, 40, 55, 70, 85, 100] // Habit formation score (0-100)
        }
      ]
    }
  ]
}; 