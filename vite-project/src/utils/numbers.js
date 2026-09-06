/**
 * Converts user-entered monetary text into a number.
 *
 * Examples:
 * "₹1,10,000" → 110000
 * "1,10,000"  → 110000
 * "110000"    → 110000
 */
export function parseAmount(value) {
  if (
    typeof value !== "string" &&
    typeof value !== "number"
  ) {
    return null;
  }

  const cleaned = String(value)
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .trim();

  if (!cleaned) {
    return null;
  }

  const number = Number(cleaned);

  return Number.isFinite(number) && number >= 0
    ? number
    : null;
}

/**
 * Rounds a monetary value to a useful display step.
 */
export function roundToNearest(value, step = 100) {
  if (
    !Number.isFinite(value) ||
    step <= 0
  ) {
    return 0;
  }

  return Math.round(value / step) * step;
}