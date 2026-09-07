import { calculateSafeEmi } from "./affordability";
import {
  calculateEmi,
  calculateLoanAmountFromEmi,
  calculateLoanCost,
} from "./emi";
import { formatINR } from "../utils/currency";
import { parseAmount, roundToNearest } from "../utils/numbers";

const DEFAULT_ANNUAL_RATE = 12;
const DEFAULT_TENURE_MONTHS = 60;
const TENURE_COMPARISON_STEP_MONTHS = 24;
const STRESS_INCOME_FACTOR = 0.85;

const LOAN_TYPE_LABELS = {
  unsecured_personal: "unsecured personal loan",
  secured_property: "secured property loan",
  business_loan: "business loan",
  gold_loan: "gold loan",
  vehicle_loan: "vehicle loan",
};

const CREDIT_LABELS = {
  "750_plus": "750+ credit profile",
  "700_749": "700–749 credit profile",
  "650_699": "650–699 credit profile",
  "below_650": "below-650 credit profile",
  unknown: "unknown credit score",
  na_nh: "NA/NH credit history",
};

function calculateStressCase({
  income,
  essentialExpenses,
  existingEmi,
  annualRate,
  tenureMonths,
  requestedAmount,
}) {
  const stressedIncome = income * STRESS_INCOME_FACTOR;
  const affordability = calculateSafeEmi({
    income: stressedIncome,
    essentialExpenses,
    existingEmi,
  });
  const stressedSafeAmount = calculateLoanAmountFromEmi({
    emi: affordability.safeEmi,
    annualRate,
    tenureMonths,
  });

  let interpretation =
    affordability.safeEmi === 0
      ? `After a 15% income drop, income becomes ${formatINR(
          stressedIncome
        )}. After ${formatINR(essentialExpenses)} essential expenses and ${formatINR(
          existingEmi
        )} existing EMI, there is no remaining safe capacity for a new EMI.`
      : `With income 15% lower, safe EMI falls to ${formatINR(
          affordability.safeEmi
        )} and safe borrowing amount falls to ${formatINR(stressedSafeAmount)}.`;

  if (requestedAmount !== null) {
    interpretation +=
      requestedAmount <= stressedSafeAmount
        ? ` The requested ${formatINR(requestedAmount)} remains within this stressed amount.`
        : ` The requested ${formatINR(requestedAmount)} is above this stressed amount.`;
  }

  return {
    stressedIncome,
    stressedSafeEmi: affordability.safeEmi,
    stressedSafeAmount,
    interpretation,
  };
}

function buildTenureTradeoff({
  principal,
  annualRate,
  tenureMonths,
  safeEmi,
}) {
  if (principal === null || principal <= 0) {
    return null;
  }

  const shorterTenureMonths = Math.max(
    12,
    tenureMonths - TENURE_COMPARISON_STEP_MONTHS
  );
  const longerTenureMonths = tenureMonths + TENURE_COMPARISON_STEP_MONTHS;
  const shorterCost = calculateLoanCost({
    principal,
    annualRate,
    tenureMonths: shorterTenureMonths,
  });
  const longerCost = calculateLoanCost({
    principal,
    annualRate,
    tenureMonths: longerTenureMonths,
  });

  return {
    principal,
    annualRate,
    shorter: {
      tenureMonths: shorterTenureMonths,
      emi: shorterCost.emi,
      totalInterest: shorterCost.totalInterest,
      aboveSafeEmi: shorterCost.emi > safeEmi,
    },
    longer: {
      tenureMonths: longerTenureMonths,
      emi: longerCost.emi,
      totalInterest: longerCost.totalInterest,
      aboveSafeEmi: longerCost.emi > safeEmi,
    },
  };
}

function calculateAnnuityPayment(principal, monthlyRate, tenureMonths) {
  if (monthlyRate === 0) {
    return principal / tenureMonths;
  }

  const growth = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * growth) / (growth - 1);
}

function calculateIndicativeApr({ principal, annualRate, tenureMonths, processingFee }) {
  const netProceeds = principal - processingFee;
  if (netProceeds <= 0 || principal <= 0 || processingFee < 0) {
    return null;
  }

  const quotedEmi = calculateEmi({
    principal,
    annualRate,
    tenureMonths,
  });
  let lower = 0;
  let upper = 1;

  while (calculateAnnuityPayment(netProceeds, upper, tenureMonths) < quotedEmi) {
    upper *= 2;
  }

  for (let index = 0; index < 80; index += 1) {
    const middle = (lower + upper) / 2;
    if (calculateAnnuityPayment(netProceeds, middle, tenureMonths) < quotedEmi) {
      lower = middle;
    } else {
      upper = middle;
    }
  }

  return ((lower + upper) / 2) * 12 * 100;
}

function parseFairRateBand(fairRateRange) {
  const matches = fairRateRange.match(/[\d.]+/g);
  if (!matches || matches.length < 2) {
    return null;
  }

  return {
    lower: Number(matches[0]),
    upper: Number(matches[1]),
  };
}

function selectEffectiveRate({ annualRate, fairRateRange }) {
  const fairRateBand = parseFairRateBand(fairRateRange);
  if (!fairRateBand) {
    return annualRate;
  }

  return Math.min(
    fairRateBand.upper,
    Math.max(fairRateBand.lower, annualRate)
  );
}

function buildOfferCost({
  lenderOffer,
  offeredRate,
  processingFee,
  requestedAmount,
  tenureMonths,
  fairRateRange,
}) {
  const parsedRate = parseAmount(offeredRate);
  const hasOffer = lenderOffer === "yes";
  const fairRateBand = parseFairRateBand(fairRateRange);

  if (!hasOffer) {
    return {
      offeredRate: null,
      processingFee: null,
      apr: null,
      aprLabel: "Not available yet",
      reason: "A lender quote and its processing fee are required to calculate all-in APR.",
      quoteAboveFairBand: false,
    };
  }

  if (parsedRate === null) {
    return {
      offeredRate: null,
      processingFee: null,
      apr: null,
      aprLabel: "Not available yet",
      reason: "Enter the lender's annual interest rate before comparing all-in cost.",
      quoteAboveFairBand: false,
    };
  }

  if (processingFee === null || requestedAmount === null) {
    return {
      offeredRate: parsedRate,
      processingFee,
      apr: null,
      aprLabel: "Not available yet",
      reason: "The actual processing fee and requested loan amount are required for all-in APR.",
      quoteAboveFairBand: fairRateBand ? parsedRate > fairRateBand.upper : false,
    };
  }

  const apr = calculateIndicativeApr({
    principal: requestedAmount,
    annualRate: parsedRate,
    tenureMonths,
    processingFee,
  });
  const quoteAboveFairBand = fairRateBand ? parsedRate > fairRateBand.upper : false;
  const comparison = quoteAboveFairBand
    ? `The lender quote is above the fair-rate band upper end of ${fairRateBand.upper}%.`
    : `The lender quote is within the fair-rate band of ${fairRateRange}.`;

  return {
    offeredRate: parsedRate,
    processingFee,
    apr,
    aprLabel: apr === null ? "Not available yet" : `${apr.toFixed(1)}%`,
    reason: `${comparison} APR includes the quoted rate and the supplied processing fee; other charges are not included.`,
    quoteAboveFairBand,
  };
}

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

function buildRecommendationReasons({
  safeAmount,
  requestedAmount,
  repaymentHistory,
}) {
  const reasons = [];

  if (repaymentHistory === "serious_default") {
    reasons.push("Recent serious repayment problems make new borrowing unsafe.");
  }

  if (safeAmount <= 0) {
    reasons.push("The current income, expenses and existing commitments leave no positive safe EMI capacity.");
  } else if (requestedAmount !== null && requestedAmount > safeAmount) {
    reasons.push(
      `The requested ${formatINR(requestedAmount)} is above the safe amount of ${formatINR(safeAmount)}.`
    );
  } else if (requestedAmount !== null) {
    reasons.push(
      `The requested ${formatINR(requestedAmount)} fits within the safe amount of ${formatINR(safeAmount)}.`
    );
  } else {
    reasons.push(`The calculated safe borrowing amount is ${formatINR(safeAmount)}.`);
  }

  if (reasons.length < 2) {
    reasons.push("The decision uses both debt-burden and monthly-surplus limits.");
  }

  return reasons.slice(0, 4);
}

function buildSafeEmiReason({ foirCapacity, surplusCapacity, safeEmi }) {
  const limitingConstraint =
    foirCapacity <= surplusCapacity ? "FOIR capacity" : "surplus capacity";
  const limitingValue =
    foirCapacity <= surplusCapacity ? foirCapacity : surplusCapacity;

  return `${limitingConstraint} limits the new EMI to ${formatINR(
    limitingValue
  )}; the other affordability limit is ${formatINR(
    foirCapacity <= surplusCapacity ? surplusCapacity : foirCapacity
  )}. Safe EMI is ${formatINR(safeEmi)}.`;
}

function buildSafeAmountReason({ safeEmi, annualRate, tenureMonths }) {
  return `This converts the safe EMI of ${formatINR(
    safeEmi
  )} into principal at ${annualRate}% p.a. over ${tenureMonths} months.`;
}

function buildFairRateReason({ loanType, creditScore }) {
  const loanLabel = LOAN_TYPE_LABELS[loanType] || "selected loan type";
  const creditLabel = CREDIT_LABELS[creditScore] || "credit profile not supplied";
  return `The current rate logic uses the ${loanLabel} category and ${creditLabel}; it is an indicative range, not a lender quote.`;
}

function buildConfidenceReason({ creditScore, incomeType, repaymentHistory }) {
  if (repaymentHistory === "serious_default" || creditScore === "below_650") {
    return repaymentHistory === "serious_default"
      ? "Confidence is low because recent serious repayment problems are recorded."
      : "Confidence is low because the recorded credit profile is below 650.";
  }

  if (creditScore === "unknown" || creditScore === "na_nh") {
    return creditScore === "na_nh"
      ? "Confidence is medium because NA/NH provides insufficient recent credit history, not a bad-credit signal."
      : "Confidence is medium because the credit score is unknown, so repayment history is less complete.";
  }

  if (incomeType === "variable") {
    return "Confidence is medium because variable income makes repayment capacity less predictable.";
  }

  if (repaymentHistory === "minor_delay") {
    return "Confidence is medium because minor recent payment delays are recorded.";
  }

  if (creditScore === "750_plus" || creditScore === "700_749") {
    return `Confidence is high because the ${CREDIT_LABELS[creditScore]} is a strong repayment signal.`;
  }

  return "Confidence is medium because the available profile supports an estimate but has no strong credit signal.";
}

function buildLenderSideCapacity({
  foirCapacity,
  annualRate,
  tenureMonths,
  loanType,
  creditScore,
  incomeType,
  repaymentHistory,
  collateralValue,
}) {
  const lenderStyleAmount = calculateLoanAmountFromEmi({
    emi: foirCapacity,
    annualRate,
    tenureMonths,
  });
  const confidence = calculateConfidence({ creditScore, incomeType, repaymentHistory });
  const rangeFactor =
    confidence === "High"
      ? { lower: 0.9, upper: 1.1 }
      : confidence === "Low"
        ? { lower: 0.7, upper: 1.3 }
        : { lower: 0.8, upper: 1.2 };
  const productLtv =
    loanType === "secured_property" || loanType === "gold_loan"
      ? 0.6
      : loanType === "business_loan"
        ? 0.5
        : null;
  const collateralCap =
    productLtv !== null && collateralValue !== null && collateralValue > 0
      ? collateralValue * productLtv
      : null;
  const lowerBeforeCollateral = roundToNearest(
    lenderStyleAmount * rangeFactor.lower,
    10000
  );
  const upperBeforeCollateral = roundToNearest(
    lenderStyleAmount * rangeFactor.upper,
    10000
  );
  const lower = roundToNearest(
    collateralCap === null
      ? lowerBeforeCollateral
      : Math.min(lowerBeforeCollateral, collateralCap),
    10000
  );
  const upper = roundToNearest(
    collateralCap === null
      ? upperBeforeCollateral
      : Math.min(upperBeforeCollateral, collateralCap),
    10000
  );
  const safeUpper = Math.max(lower, upper);
  const collateralNote =
    collateralCap !== null
      ? ` The ${Math.round(productLtv * 100)}% indicative LTV cap is ${formatINR(collateralCap)}; collateral may improve lender-side options but does not increase your repayment-safe amount.`
      : "";
  const riskNote =
    repaymentHistory === "serious_default"
      ? " Recent serious repayment problems remain a major warning; lender-side capacity does not make borrowing advisable."
      : "";

  return {
    range: `${formatINR(lower)} – ${formatINR(safeUpper)}`,
    reason: `Uses the documented 50% FOIR-style lender ceiling, the current rate/tenure assumptions, and a ${confidence.toLowerCase()}-confidence prototype range.${collateralNote}${riskNote} Actual sanction depends on lender-specific underwriting and product rules.`,
    methodology: {
      lenderStyleAmount,
      confidence,
      collateralCap,
      productLtv,
    },
  };
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
  collateralValue = null,
  lenderOffer = null,
  offeredRate = null,
  processingFee = null,
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

  const fairRateRange = calculateFairRateRange({ loanType, creditScore });
  const effectiveAnnualRate = selectEffectiveRate({
    annualRate,
    fairRateRange,
  });
  const safeAmount = calculateLoanAmountFromEmi({
    emi: affordability.safeEmi,
    annualRate: effectiveAnnualRate,
    tenureMonths,
  });

  const proposedEmi =
    requestedAmount !== null
      ? calculateEmi({
          principal: requestedAmount,
          annualRate,
          tenureMonths,
        })
      : null;

  const confidence = calculateConfidence({ creditScore, incomeType, repaymentHistory });
  const recommendation = calculateRecommendation({ safeAmount, requestedAmount, repaymentHistory });
  const stressCase = calculateStressCase({
    income: effectiveIncome,
    essentialExpenses,
    existingEmi,
    annualRate,
    tenureMonths,
    requestedAmount,
  });
  const lenderSideCapacity = buildLenderSideCapacity({
    foirCapacity: affordability.foirCapacity,
    annualRate,
    tenureMonths,
    loanType,
    creditScore,
    incomeType,
    repaymentHistory,
    collateralValue,
  });
  const offerCost = buildOfferCost({
    lenderOffer,
    offeredRate,
    processingFee,
    requestedAmount,
    tenureMonths,
    fairRateRange,
  });
  const tenureTradeoff = buildTenureTradeoff({
    principal: requestedAmount,
    annualRate,
    tenureMonths,
    safeEmi: affordability.safeEmi,
  });

  return {
    ...affordability,
    effectiveIncome,
    safeAmount,
    proposedEmi,
    requestedAmount,
    requestedWithinSafeAmount:
      requestedAmount !== null ? requestedAmount <= safeAmount : true,
    recommendation,
    reasons: {
      recommendation: buildRecommendationReasons({
        safeAmount,
        requestedAmount,
        repaymentHistory,
      }),
      safeEmi: buildSafeEmiReason(affordability),
      safeAmount: buildSafeAmountReason({
        safeEmi: affordability.safeEmi,
        annualRate: effectiveAnnualRate,
        tenureMonths,
      }),
      fairRate: buildFairRateReason({ loanType, creditScore }),
      confidence: buildConfidenceReason({ creditScore, incomeType, repaymentHistory }),
    },
    stressCase,
    lenderSideCapacity,
    offerCost,
    tenureTradeoff,
    fairRateRange,
    confidence,
    assumptions: {
      annualRate,
      effectiveAnnualRate,
      tenureMonths,
    },
  };
}