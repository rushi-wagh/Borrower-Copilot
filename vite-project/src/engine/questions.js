import { parseAmount } from "../utils/numbers";

export const CORE_QUESTIONS = [
  "purpose",
  "requestedAmount",
  "loanType",
  "age",
  "income",
  "incomeType",
  "existingEmi",
  "essentialExpenses",
  "creditScore",
];

export const QUESTION_DEFINITIONS = {
  purpose: {
    id: "purpose",
    eyebrow: "LOAN PURPOSE",
    title: "What is the primary purpose of this loan?",
    description: "Understanding your goal helps us assess the loan structure and rate expectations.",
    type: "choice",
    options: [
      { value: "personal", label: "Personal / Emergency" },
      { value: "business", label: "Business / Expansion" },
      { value: "home", label: "Home / Property Purchase" },
      { value: "education", label: "Education" },
      { value: "debt_consolidation", label: "Debt Consolidation" },
      { value: "vehicle", label: "Vehicle Purchase" },
    ],
    helper: "Different loan purposes have different typical interest rate ranges.",
    knownLabel: "Loan Purpose",
    actionLabel: "Save purpose",
    impact: "fair_rate_range",
  },
  requestedAmount: {
    id: "requestedAmount",
    eyebrow: "LOAN AMOUNT",
    title: "How much loan amount are you looking for?",
    description: "Enter the target principal loan amount you plan to request from a lender.",
    type: "amount",
    suffix: "",
    placeholder: "Enter requested loan amount",
    helper: "We will compare this principal amount with your safe borrowing capacity.",
    knownLabel: "Amount Wanted",
    actionLabel: "Save requested amount",
    impact: "borrowing_recommendation",
  },
  loanType: {
    id: "loanType",
    eyebrow: "LOAN TYPE",
    title: "What type of loan are you considering?",
    description: "Select whether the loan is secured by an asset or unsecured.",
    type: "choice",
    options: [
      { value: "unsecured_personal", label: "Unsecured Personal Loan" },
      { value: "secured_property", label: "Secured Property / LAP / Home Loan" },
      { value: "business_loan", label: "Business Loan (Unsecured)" },
      { value: "gold_loan", label: "Gold Loan" },
      { value: "vehicle_loan", label: "Vehicle Loan" },
    ],
    helper: "Secured loans generally offer lower interest rates than unsecured loans.",
    knownLabel: "Loan Type",
    actionLabel: "Save loan type",
    impact: "fair_rate_range",
  },
  age: {
    id: "age",
    eyebrow: "BORROWER AGE",
    title: "What is your age group?",
    description: "Age determines working career horizon and allowable loan tenure.",
    type: "choice",
    options: [
      { value: "18_25", label: "18 – 25 years" },
      { value: "26_45", label: "26 – 45 years" },
      { value: "46_60", label: "46 – 60 years" },
      { value: "above_60", label: "Above 60 years" },
    ],
    helper: "Working age helps establish maximum recommended loan tenure.",
    knownLabel: "Age Group",
    actionLabel: "Save age",
    impact: "tenure_suitability",
  },
  income: {
    id: "income",
    eyebrow: "YOUR INCOME",
    title: "Let's start with your monthly cash flow.",
    description: "Use your usual net monthly income after deductions.",
    type: "amount",
    suffix: "per month",
    placeholder: "Enter monthly income",
    helper: "Your income helps establish your overall repayment capacity.",
    knownLabel: "Monthly Income",
    actionLabel: "Save income",
    impact: "safe_emi_and_amount",
  },
  incomeType: {
    id: "incomeType",
    eyebrow: "INCOME PROFILE",
    title: "What is your primary source of income?",
    description: "Different income types have different stability and documentation patterns.",
    type: "choice",
    options: [
      { value: "salaried", label: "Salaried (Regular paycheck)" },
      { value: "self_employed", label: "Self-Employed / Business Owner" },
      { value: "variable", label: "Informal / Variable / Commission" },
    ],
    helper: "Lenders look for documented stability when pricing risk.",
    knownLabel: "Income Type",
    actionLabel: "Save income type",
    impact: "risk_assessment_and_confidence",
  },
  lowMonthIncome: {
    id: "lowMonthIncome",
    eyebrow: "INCOME STABILITY",
    title: "In a lower-than-average month, what is your net income?",
    description: "For variable or business income, a conservative estimate protects against tight months.",
    type: "amount",
    suffix: "per month",
    placeholder: "Enter typical low-month income",
    helper: "Using a conservative baseline prevents over-borrowing during peak months.",
    knownLabel: "Low-Month Income",
    actionLabel: "Save low-month income",
    impact: "affordability_and_confidence",
  },
  businessTenure: {
    id: "businessTenure",
    eyebrow: "BUSINESS HISTORY",
    title: "How long has your business been operating?",
    description: "Business longevity is a key indicator of revenue stability.",
    type: "choice",
    options: [
      { value: "under_1yr", label: "Less than 1 year" },
      { value: "1_to_3yrs", label: "1 to 3 years" },
      { value: "over_3yrs", label: "3+ years (Established)" },
    ],
    helper: "Businesses operating for 3+ years usually get better loan terms.",
    knownLabel: "Business History",
    actionLabel: "Save business history",
    impact: "confidence_and_rate_positioning",
  },
  productiveReturn: {
    id: "productiveReturn",
    eyebrow: "PRODUCTIVE RETURN",
    title: "What additional monthly income do you realistically expect this borrowing to generate?",
    description: "If this borrowing is for business or productive investment, enter expected net extra monthly income.",
    type: "amount",
    suffix: "per month",
    placeholder: "Enter expected extra monthly income (or ₹0)",
    helper: "Productive income addition improves future cash flow and repayment capacity.",
    knownLabel: "Expected Return",
    actionLabel: "Save expected return",
    impact: "purpose_justification_and_cashflow",
  },
  existingEmi: {
    id: "existingEmi",
    eyebrow: "EXISTING COMMITMENTS",
    title: "How much are you already paying toward loans each month?",
    description: "Include all active loan EMIs across all lenders.",
    type: "amount",
    suffix: "per month",
    placeholder: "Enter total existing EMIs",
    helper: "If you have no existing EMIs, enter ₹0.",
    knownLabel: "Existing EMIs",
    actionLabel: "Continue",
    impact: "foir_and_surplus",
  },
  essentialExpenses: {
    id: "essentialExpenses",
    eyebrow: "ESSENTIAL EXPENSES",
    title: "What does your household need each month?",
    description: "Include essential spending such as rent, food, utilities, transport and education.",
    type: "amount",
    suffix: "per month",
    placeholder: "Enter essential expenses",
    helper: "This prevents us from treating your entire surplus as available for EMI.",
    knownLabel: "Essential Expenses",
    actionLabel: "Save essential expenses",
    impact: "surplus_capacity",
  },
  creditScore: {
    id: "creditScore",
    eyebrow: "CREDIT PROFILE",
    title: "What is your credit score, if known?",
    description: "Credit score provides a signal of past repayment discipline.",
    type: "choice",
    options: [
      { value: "750_plus", label: "750+ (Excellent / Strong)" },
      { value: "700_749", label: "700 – 749 (Good)" },
      { value: "650_699", label: "650 – 699 (Fair / Moderate)" },
      { value: "below_650", label: "Below 650 (Higher Risk)" },
      { value: "unknown", label: "Don't know / Not sure" },
      { value: "na_nh", label: "No credit history (NA / NH)" },
    ],
    helper: "Unknown or NA/NH score reduces assessment confidence without marking your profile as bad.",
    knownLabel: "Credit Score",
    actionLabel: "Save credit score",
    impact: "confidence_and_fair_rate",
  },
  highCostDebt: {
    id: "highCostDebt",
    eyebrow: "HIGH-COST DEBT",
    title: "Are any of your active loans high-cost borrowings or credit app loans?",
    description: "High-interest app loans (> 24-30% p.a.) create severe repayment strain.",
    type: "choice",
    options: [
      { value: "no", label: "No, standard bank / NBFC loans" },
      { value: "yes", label: "Yes, includes high-cost app / informal loans" },
    ],
    helper: "Consolidating high-cost app debt is a high priority.",
    knownLabel: "High-Cost Debt",
    actionLabel: "Save debt profile",
    impact: "risk_assessment_and_decision",
  },
  repaymentHistory: {
    id: "repaymentHistory",
    eyebrow: "REPAYMENT HISTORY",
    title: "Have you missed or delayed any EMI payments in the last 12 months?",
    description: "Recent repayment behavior is a critical risk signal.",
    type: "choice",
    options: [
      { value: "clean", label: "No missed or delayed payments" },
      { value: "minor_delay", label: "1 or 2 minor delays (< 30 days)" },
      { value: "serious_default", label: "Delinquency or default (> 30 days / Bounced EMI)" },
    ],
    helper: "Clean repayment history significantly improves your borrowing position.",
    knownLabel: "Repayment History",
    actionLabel: "Save repayment history",
    impact: "borrowing_recommendation_and_risk",
  },
  emergencySavings: {
    id: "emergencySavings",
    eyebrow: "FINANCIAL BUFFER",
    title: "Do you have emergency savings set aside?",
    description: "A liquid savings buffer protects against unexpected income drops.",
    type: "choice",
    options: [
      { value: "3m_plus", label: "Yes (3+ months of expenses)" },
      { value: "1_to_2m", label: "Partial (1–2 months)" },
      { value: "none", label: "No dedicated emergency buffer" },
    ],
    helper: "Having 3+ months buffer gives high confidence for loan repayment.",
    knownLabel: "Emergency Buffer",
    actionLabel: "Save buffer status",
    impact: "confidence_and_stress_resilience",
  },
  collateralValue: {
    id: "collateralValue",
    eyebrow: "COLLATERAL DETAILS",
    title: "What is the estimated market value of collateral offered?",
    description: "Enter property or gold asset value backing this secured loan.",
    type: "amount",
    suffix: "",
    placeholder: "Enter collateral estimated value",
    helper: "Collateral improves loan eligibility and reduces interest rate.",
    knownLabel: "Collateral Value",
    actionLabel: "Save collateral value",
    impact: "lender_capacity_and_ltv",
  },
  lenderOffer: {
    id: "lenderOffer",
    eyebrow: "LENDER QUOTE",
    title: "Do you already have a rate quote or sanction offer from a lender?",
    description: "We can evaluate whether your offer is fair or negotiated.",
    type: "choice",
    options: [
      { value: "no", label: "No, I am exploring options" },
      { value: "yes", label: "Yes, I have an offer / quote" },
    ],
    helper: "Comparing your offer against fair rate bands helps in negotiation.",
    knownLabel: "Lender Offer",
    actionLabel: "Save offer status",
    impact: "negotiation_card_evaluation",
  },
  offeredRate: {
    id: "offeredRate",
    eyebrow: "OFFERED INTEREST RATE",
    title: "What annual interest rate (%) did the lender offer?",
    description: "Enter the annual percentage rate quoted by your lender.",
    type: "text",
    placeholder: "e.g. 13.5",
    helper: "Enter annual interest rate (e.g. 12.5 for 12.5%).",
    knownLabel: "Offered Rate",
    actionLabel: "Complete assessment",
    impact: "rate_negotiation_position",
  },
  processingFee: {
    id: "processingFee",
    eyebrow: "PROCESSING FEE",
    title: "What processing fee did the lender quote?",
    description: "Enter the one-time processing fee charged for this lender offer.",
    type: "amount",
    suffix: "one-time",
    placeholder: "Enter processing fee",
    helper: "Enter ₹0 if the lender confirmed there is no processing fee.",
    knownLabel: "Processing Fee",
    actionLabel: "Save processing fee",
    impact: "all_in_cost_comparison",
  },
};

function isEmpty(val) {
  return val === undefined || val === null || String(val).trim() === "";
}

/**
 * Priority-based adaptive question selector.
 * Returns the ID of the single highest-value unanswered question for the borrower's current state,
 * or null if no remaining question has decision-critical impact.
 *
 * assessment is passed so FOIR can be computed using the requested loan's EMI,
 * not just existing EMI or the safe EMI ceiling.
 */
export function getNextAdaptiveQuestion(borrower, assessment) {
  // Phase 1: Core Base Questions (Must collect minimum 9 core parameters)
  for (const qId of CORE_QUESTIONS) {
    if (isEmpty(borrower[qId])) {
      return qId;
    }
  }

  // Phase 2: Priority-Based Adaptive Questions (Evaluated post-Core)
  const parsedIncome = parseAmount(borrower.income);
  const parsedEmi = parseAmount(borrower.existingEmi);
  const parsedExpenses = parseAmount(borrower.essentialExpenses);

  // Priority 1: Income variability baseline (Self-employed / Variable)
  if (
    (borrower.incomeType === "self_employed" || borrower.incomeType === "variable") &&
    isEmpty(borrower.lowMonthIncome)
  ) {
    return "lowMonthIncome";
  }

  // Priority 2: Debt stress / High-cost app loans check
  if (
    parsedEmi !== null &&
    parsedEmi > 0 &&
    (borrower.incomeType === "variable" ||
      borrower.creditScore === "650_699" ||
      borrower.creditScore === "below_650" ||
      borrower.creditScore === "unknown") &&
    isEmpty(borrower.highCostDebt)
  ) {
    return "highCostDebt";
  }

  // Priority 3: Repayment history risk check (Missed/bounced payment)
  if (
    ((borrower.incomeType === "variable" && parsedEmi !== null && parsedEmi > 0) ||
      borrower.creditScore === "650_699" ||
      borrower.creditScore === "below_650" ||
      borrower.highCostDebt === "yes") &&
    isEmpty(borrower.repaymentHistory)
  ) {
    return "repaymentHistory";
  }

  // Priority 4: Business tenure (Self-employed)
  if (borrower.incomeType === "self_employed" && isEmpty(borrower.businessTenure)) {
    return "businessTenure";
  }

  // Priority 5: Productive return
  // Eligible when borrowing is clearly income-generating:
  //   - business purpose
  //   - business loan type
  //   - vehicle loan + informal/variable income (e.g. scooter for delivery earnings)
  // NOT asked when serious repayment risk exists — risk questions take priority and
  // productive intent does NOT override a serious_default signal.
  const hasProductivePurpose =
    borrower.purpose === "business" ||
    borrower.loanType === "business_loan" ||
    (borrower.loanType === "vehicle_loan" &&
      (borrower.incomeType === "variable" || borrower.incomeType === "self_employed"));

  const hasSerioUsDebtRisk = borrower.repaymentHistory === "serious_default";

  if (hasProductivePurpose && !hasSerioUsDebtRisk && isEmpty(borrower.productiveReturn)) {
    return "productiveReturn";
  }

  // Priority 6: Emergency savings buffer
  // Uses FOIR = (existingEmi + proposedEmi) / income per RULES.md Rule 4.
  // The assessment calculates proposedEmi from the requested amount and its
  // current rate/tenure assumptions.
  if (parsedIncome !== null && parsedIncome > 0 && parsedExpenses !== null && parsedEmi !== null) {
    const proposedEmi = assessment?.proposedEmi;
    const foir =
      proposedEmi !== null && proposedEmi !== undefined
        ? (parsedEmi + proposedEmi) / parsedIncome
        : null;
    const surplus = parsedIncome - parsedExpenses - parsedEmi;
    if (
      ((foir !== null && foir > 0.35) || surplus < 0.25 * parsedIncome) &&
      isEmpty(borrower.emergencySavings)
    ) {
      return "emergencySavings";
    }
  }

  // Priority 7: Collateral
  // Explicitly secured loan products (property/gold) always warrant a collateral value question.
  // For self-employed business borrowers: collateral can change lender-side capacity and loan
  // structure (e.g. converting unsecured to secured may reduce rate, improve sanction amount).
  // Collateral NEVER replaces affordability — it only affects lender-side capacity and LTV.
  // An unsecured business loan without self-employed income does NOT trigger this.
  const isExplicitlySecured =
    borrower.loanType === "secured_property" || borrower.loanType === "gold_loan";
  const isBusinessBorrowerWithPotentialCollateral =
    borrower.incomeType === "self_employed" &&
    (borrower.purpose === "business" || borrower.loanType === "business_loan");

  if ((isExplicitlySecured || isBusinessBorrowerWithPotentialCollateral) && isEmpty(borrower.collateralValue)) {
    return "collateralValue";
  }

  // Priority 8: Lender offer evaluation (Only if debt consolidation or offer explicitly indicated)
  if (borrower.purpose === "debt_consolidation" && isEmpty(borrower.lenderOffer)) {
    return "lenderOffer";
  }
  if (borrower.lenderOffer === "yes" && isEmpty(borrower.offeredRate)) {
    return "offeredRate";
  }
  if (borrower.lenderOffer === "yes" && !isEmpty(borrower.offeredRate) && isEmpty(borrower.processingFee)) {
    return "processingFee";
  }

  // No remaining unanswered question can materially change the assessment -> STOP
  return null;
}
