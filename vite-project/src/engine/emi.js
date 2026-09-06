/**
 * Calculates EMI for a reducing-balance loan.
 */
export function calculateEmi({
  principal,
  annualRate,
  tenureMonths,
}) {
  if (
    principal <= 0 ||
    annualRate < 0 ||
    tenureMonths <= 0
  ) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / tenureMonths;
  }

  const growth = Math.pow(
    1 + monthlyRate,
    tenureMonths
  );

  return (
    (principal * monthlyRate * growth) /
    (growth - 1)
  );
}

/**
 * Calculates the loan principal that corresponds to
 * a given affordable EMI.
 */
export function calculateLoanAmountFromEmi({
  emi,
  annualRate,
  tenureMonths,
}) {
  if (
    emi <= 0 ||
    annualRate < 0 ||
    tenureMonths <= 0
  ) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return emi * tenureMonths;
  }

  const growth = Math.pow(
    1 + monthlyRate,
    tenureMonths
  );

  return (
    (emi * (growth - 1)) /
    (monthlyRate * growth)
  );
}

/**
 * Calculates the total repayment and interest cost
 * for a given loan.
 */
export function calculateLoanCost({
  principal,
  annualRate,
  tenureMonths,
}) {
  const emi = calculateEmi({
    principal,
    annualRate,
    tenureMonths,
  });

  const totalRepayment = emi * tenureMonths;

  return {
    emi,
    totalRepayment,
    totalInterest: Math.max(
      0,
      totalRepayment - principal
    ),
  };
}