const DEFAULT_MAX_FOIR = 0.5;
const DEFAULT_SURPLUS_SHARE = 0.5;

/**
 * Calculates the money remaining after essential household
 * expenses and existing monthly debt obligations.
 */
export function calculateMonthlySurplus({
  income,
  essentialExpenses,
  existingEmi,
}) {
  return Math.max(
    0,
    income - essentialExpenses - existingEmi
  );
}

/**
 * Calculates the maximum room available for a new EMI
 * before reaching the product's borrower-safety FOIR ceiling.
 *
 * This is a borrower-side safety threshold, not a lender
 * approval threshold.
 */
export function calculateFoirCapacity({
  income,
  existingEmi,
  maxFoir = DEFAULT_MAX_FOIR,
}) {
  return Math.max(
    0,
    income * maxFoir - existingEmi
  );
}

/**
 * Keeps the proposed EMI within a portion of the borrower's
 * remaining monthly surplus.
 */
export function calculateSurplusCapacity({
  surplus,
  surplusShare = DEFAULT_SURPLUS_SHARE,
}) {
  return Math.max(
    0,
    surplus * surplusShare
  );
}

/**
 * Uses both affordability guardrails.
 *
 * A borrower must satisfy both:
 * - income-based debt capacity
 * - cash-flow-based capacity
 *
 * The lower value becomes the safe EMI ceiling.
 */
export function calculateSafeEmi({
  income,
  essentialExpenses,
  existingEmi,
}) {
  const surplus = calculateMonthlySurplus({
    income,
    essentialExpenses,
    existingEmi,
  });

  const foirCapacity = calculateFoirCapacity({
    income,
    existingEmi,
  });

  const surplusCapacity = calculateSurplusCapacity({
    surplus,
  });

  const safeEmi = Math.min(
    foirCapacity,
    surplusCapacity
  );

  return {
    surplus,
    foirCapacity,
    surplusCapacity,
    safeEmi,
  };
}