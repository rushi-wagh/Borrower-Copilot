import { calculateSafeEmi } from "./affordability";
import { calculateLoanAmountFromEmi } from "./emi";

const DEFAULT_ANNUAL_RATE = 12;
const DEFAULT_TENURE_MONTHS = 60;

/**
 * Calculates indicative fair interest rate range based on loan type and credit profile.
 */
export function calculateFairRateRange({ loanType, creditScore }) {
  if (!loanType) {
    return "11.0% – 14.0%";
  }

  if (loanType === "secured_property" || loanType === "gold_loan") {
    if (creditScore === "750_plus") return "8.5% – 10.0%";
    if (creditScore === "700_749") return "9.5% – 11.5%";
    return "11.0% – 13.5%";
  }

  if (loanType === "vehicle_loan") {
    if (creditScore === "750_plus") return "9.0% – 10.5%";
    if (creditScore === "700_749") return "10.0% – 11.5%";
    return "11.5% – 13.5%";
  }

  if (loanType === "business_loan") {
    if (creditScore === "750_plus") return "12.0% – 14.0%";
    if (creditScore === "700_749") return "13.5% – 16.0%";
    return "15.0% – 18.5%";
  }

  // Unsecured Personal Loan
  if (creditScore === "750_plus") return "11.0% – 13.0%";
  if (creditScore === "700_749") return "13.0% – 15.0%";
  if (creditScore === "650_699") return "15.0% – 17.5%";
  return "16.0% – 19.5%";
}

/**
 * Calculates assessment confidence score (High, Medium, Low).
 */
export function calculateConfidence({ creditScore, incomeType, repaymentHistory }) {
  if (repaymentHistory === "serious_default" || creditScore === "below_650") {
    return "Low";
  }

  if (
    creditScore === "unknown" ||
    creditScore === "na_nh" ||
    incomeType === "variable" ||
    repaymentHistory === "minor_delay"
  ) {
    return "Medium";
  }

  if (creditScore === "750_plus" || creditScore === "700_749") {
    return "High";
  }

  return "Medium";
}

/**
 * Evaluates borrowing recommendation (Borrow, Borrow Less, Don't Borrow) according to Rules 2, 13.
 */
export function calculateRecommendation({ safeAmount, requestedAmount, repaymentHistory }) {
  if (repaymentHistory === "serious_default" || safeAmount <= 0) {
    return "Don't Borrow";
  }

  if (requestedAmount !== null && requestedAmount > safeAmount) {
    return "Borrow Less";
  }

  return "Borrow";
}

/**
 * Builds the borrower assessment from available cash-flow and profile data.
 */
export function calculateAssessment({
  income,
  essentialExpenses,
  existingEmi,
  requestedAmount = null,
  incomeType = "salaried",
  lowMonthIncome = null,
  loanType = "unsecured_personal",
  creditScore = null,
  repaymentHistory = null,
  annualRate = DEFAULT_ANNUAL_RATE,
  tenureMonths = DEFAULT_TENURE_MONTHS,
}) {
  // Rule 10: For variable/self-employed income, use conservative baseline if provided
  const effectiveIncome =
    (incomeType === "variable" || incomeType === "self_employed") &&
    lowMonthIncome !== null &&
    lowMonthIncome > 0
      ? Math.min(income, lowMonthIncome)
      : income;

  const affordability = calculateSafeEmi({
    income: effectiveIncome,
    essentialExpenses,
    existingEmi,
  });

  const safeAmount = calculateLoanAmountFromEmi({
    emi: affordability.safeEmi,
    annualRate,
    tenureMonths,
  });

  const fairRateRange = calculateFairRateRange({ loanType, creditScore });
  const confidence = calculateConfidence({ creditScore, incomeType, repaymentHistory });
  const recommendation = calculateRecommendation({ safeAmount, requestedAmount, repaymentHistory });

  return {
    ...affordability,
    safeAmount,
    requestedAmount,
    requestedWithinSafeAmount:
      requestedAmount !== null ? requestedAmount <= safeAmount : true,
    recommendation,
    fairRateRange,
    confidence,
    assumptions: {
      annualRate,
      tenureMonths,
    },
  };
}