Lending Rules
1. Product Purpose
The product is a borrower-side decision support tool, not a lender approval system.
It helps the borrower decide:
whether to borrow,
how much to borrow,
what EMI is comfortable,
and what interest rate is reasonable to negotiate.

Source: Challenge brief

2. Borrowing Decision

The final recommendation can be one of three:

Borrow — the requested amount is affordable and there are no major repayment-risk concerns.
Borrow Less — the requested amount is too high, but a smaller amount is affordable.
Don't Borrow — even a smaller loan does not look safe, or there are serious repayment-risk signals.

Source: Challenge brief; My judgement

3. Existing and Proposed EMI

Both existing EMI and the proposed new EMI must be considered.

Source: RBI; My judgement

4. FOIR

FOIR is calculated as:

(Existing EMI + Proposed EMI) / Monthly Income × 100

It shows how much of the borrower's monthly income will go toward debt payments.

FOIR interpretation
≤ 35% — Comfortable debt burden
35–45% — Moderate burden
45–50% — High burden
> 50% — Very high burden

These ranges are conservative decision-support thresholds, not universal bank rules.

Source: My judgement based on FOIR-style affordability

50% reference

The 50% repayment-obligation reference comes from RBI's microfinance framework. It should not be presented as a universal 50% cutoff for every type of loan.

Source: RBI

5. Monthly Surplus

Monthly surplus is:

Income - Essential Expenses - Existing EMI

It represents the money left after normal living costs and existing debt payments.

The new EMI should be:

≤ 50% of Monthly Surplus

This keeps some of the surplus available as a financial buffer.

Source: My judgement

6. Safe EMI

The safe EMI should satisfy both affordability checks:

Safe EMI = min(FOIR-based EMI capacity, Surplus-based EMI capacity)

The borrower should pass both the overall debt-burden check and the monthly cash-flow check.

Source: My judgement

7. EMI Calculation

EMI is calculated using:

EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:

P = Principal / loan amount
r = Monthly interest rate
n = Number of monthly payments

Monthly interest rate:

Annual interest rate / 12

Total interest:

(EMI × Number of EMIs) - Principal

Total interest is calculated before applicable fees.

Source: RBI EMI guidance; Standard loan mathematics

8. Safe Borrowing Amount

The safe borrowing amount is the maximum loan amount that fits within the borrower's safe EMI at the selected interest rate and tenure.

This converts the monthly affordability limit into a practical loan amount.

Effective annual rate for borrower-safe loan-amount conversion = the existing 12% baseline, clamped to the borrower's fair-rate band.

- If 12% falls inside the fair-rate band, use 12%.
- If 12% is below the fair-rate band, use the band's lower bound.
- If 12% is above the fair-rate band, use the band's upper bound.

This is a prototype judgement used to keep safe-amount conversion consistent with the profile's displayed rate band. For example, Ravi's 15.0%–18.5% band causes the effective rate to be 15%.

Source: My judgement

9. Lender Amount vs Safe Amount
Lender Amount

An indicative estimate of what a lender may potentially sanction.

Safe Amount

The amount that appears appropriate from the borrower's own affordability perspective.

The product should clearly separate what a lender may offer from what the borrower should safely take.

Source: Challenge brief; My judgement

Prototype lender-side capacity methodology

| What | Value | Why | Source |
| --- | --- | --- | --- |
| Lender-style EMI ceiling | 50% FOIR capacity before the surplus guardrail | Represents the documented lender-style debt-burden ceiling; it is not borrower-safe affordability | Existing Rule 4; my judgement |
| Lender-side range uncertainty | High confidence: 90%–110%; Medium: 80%–120%; Low: 70%–130% of the FOIR-based amount | Shows uncertainty instead of false precision when lender underwriting information is incomplete | My judgement |
| Property/gold collateral cap | 60% of declared collateral value | Simple prototype LTV ceiling for secured property/gold products | My judgement |
| Business collateral cap | 50% of declared collateral value | Simple prototype LTV ceiling when business borrowing has declared collateral; it affects lender-side consideration only | My judgement |
| Borrower-safe boundary | Never increased by lender-side capacity or collateral | Repayment-safe amount remains based on the lower of FOIR and surplus capacity | Existing Rule 6; my judgement |

The resulting figure is an indicative lender-side range, not an approval prediction. Actual sanction depends on lender-specific underwriting and product rules. The borrower should use the borrower-safe amount as their personal ceiling.

10. Variable Income

For borrowers with variable income, use a conservative representative income instead of simply using the highest reported month.

This prevents an unusually strong month from overstating repayment capacity.

Source: My judgement

11. Self-Employed Borrowers

For self-employed borrowers, consider:

business history,
income variability,
documented income / ITR,
and collateral where relevant.

Self-employed borrowers may have different income patterns and documentation requirements.

Source: Challenge brief; My judgement

12. Credit Score

Credit score range:

300–900

Credit score interpretation
750+ — Strong credit signal
700–749 — Good / acceptable signal
650–699 — Moderate caution
< 650 — Higher-risk signal

These categories are used as signals in the prototype, not as universal lender cutoffs.

Source: CIBIL; My judgement

Unknown Credit Score

If the borrower does not know their credit score, keep it unknown.

Do not treat an unknown score as a bad score. Instead, reduce confidence in the assessment.

NA / NH

Treat NA/NH as insufficient or no recent credit history.

Lack of credit history is different from having a poor credit history.

Source: CIBIL; Challenge brief

13. Repayment History

Recent:

missed payments,
bounced payments,
delinquencies,
or defaults

are negative repayment-risk signals.

Serious repayment problems can change the final borrowing recommendation even when the affordability calculation looks acceptable.

Source: CIBIL; My judgement

14. Fair Interest Rate

The product should give a rate range, not one exact rate.

Example for a strong-profile unsecured personal-loan case:

11%–13%

The range is indicative and should be used for comparison and negotiation.

It is not a guaranteed rate and the Copilot is not a lender pricing engine.

Factors affecting the fair-rate range
Loan type
Secured / unsecured status
Credit profile
Income stability
Existing debt
Repayment history
Collateral
Loan purpose
Lender quote

Source: Challenge brief; My judgement

15. APR and Fees

When the required information is available, show the all-in annualized cost / APR.

Also include applicable processing fees when comparing loan costs.

A lower headline interest rate does not necessarily mean a lower overall borrowing cost.

Source: RBI KFS/APR framework

Prototype APR methodology

| What | Value | Why | Source |
| --- | --- | --- | --- |
| APR inputs | Requested principal, lender-offered annual rate, tenure, and supplied processing fee | Uses actual borrower-provided offer data without fabricating missing charges | Existing EMI engine; my judgement |
| APR calculation | Annualized monthly rate that equates net proceeds (principal minus processing fee) with the quoted EMI cash flows | Represents the fee-inclusive borrowing cost over the selected tenure | Standard loan mathematics; my judgement |
| Missing fees | All-in APR is not available until the processing fee is supplied; other charges are excluded unless separately supported | Prevents the headline interest rate from being presented as the full borrowing cost | RBI KFS/APR framework; my judgement |
| Fair-rate comparison | Quoted annual rate is compared with the existing indicative fair-rate band | Flags a quote above the current profile-based range without changing the borrowing recommendation | Existing Rule 14; my judgement |

The APR shown is indicative and includes only the supplied processing fee. Actual APR may be higher if insurance, taxes, documentation, foreclosure or other mandatory charges apply.

16. Tenure

Show both:

monthly EMI,
and total repayment / interest cost.

A longer tenure generally reduces the monthly EMI but increases the total interest paid.

Source: RBI loan/EMI guidance

Prototype tenure comparison

| What | Value | Why | Source |
| --- | --- | --- | --- |
| Shorter comparison tenure | 24 months less than the current 60-month assumption, or 12 months minimum | Shows the monthly-outflow versus total-interest trade-off without changing affordability rules | Existing Rule 16; my judgement |
| Longer comparison tenure | 24 months more than the current 60-month assumption | Shows the lower-EMI versus higher-total-interest trade-off | Existing Rule 16; my judgement |
| Safe EMI boundary | The existing safe EMI ceiling is unchanged | Tenure changes payment and interest only; it does not increase borrower-safe capacity | Existing Rule 6; my judgement |

17. Stress Case

Test the recommendation assuming the borrower's income falls by 15%.

The purpose is to check whether the proposed EMI would still be manageable after an income reduction.

Source: My judgement

Floating-rate loans

Where relevant, also show the effect of an increase in the interest rate because a floating rate can increase the repayment burden.

Source: RBI guidance; My judgement

18. Confidence

Confidence should be:

High
Medium
Low

Confidence depends on how much decision-critical information is available.

Missing important information should reduce confidence rather than being silently assumed.

Source: Challenge brief; My judgement

19. Adaptive Questions

The Copilot asks only questions whose answers can materially change:
- the borrowing decision (Borrow / Borrow Less / Don't Borrow),
- the safe amount,
- the EMI,
- the fair-rate range,
- risk signals,
- or confidence.

Core Base Questions (Minimum 9 parameters):
1. Purpose
2. Requested loan amount
3. Loan type
4. Age group
5. Net monthly income
6. Income type (Salaried / Self-employed / Variable)
7. Existing EMIs
8. Essential expenses
9. Credit score (if known; unknown / NA/NH is valid and reduces confidence without marking profile as bad)

Priority-Based Adaptive Evaluation (Post-Core Loop):
After collecting core inputs, `getNextAdaptiveQuestion(borrower, assessment)` evaluates unanswered questions by decision impact:
- lowMonthIncome: Evaluated for self-employed or variable income. (Impact: conservative income baseline & confidence)
- highCostDebt: Evaluated if existing EMIs > 0 and low/unknown credit score or informal profile. (Impact: debt risk & decision)
- repaymentHistory: Evaluated if existing debt > 0 or caution/low credit score. (Impact: missed/bounced payment risk signals)
- businessTenure: Evaluated for self-employed borrowers. (Impact: business stability & rate positioning)
- productiveReturn: Evaluated for business loans or productive borrowing. (Impact: extra cash-flow generation)
- emergencySavings: Evaluated ONLY when FOIR > 35% or monthly surplus < 25% of income. (Impact: liquid financial buffer)
- collateralValue: Evaluated ONLY when loan product is explicitly secured (property or gold). (Impact: LTV & lender loan structure)
- lenderOffer: Evaluated ONLY when comparing an active quote or debt consolidation. (Impact: negotiation positioning)

Stopping Rule:
The adaptive flow STOPS immediately when no remaining unanswered question can materially change the borrowing recommendation, safe limits, risk flags, or confidence.

Source: Challenge brief; My judgement

20. Collateral

Collateral should be considered when deciding whether a secured loan may be appropriate.

Collateral can change the borrowing structure, but it does not replace the affordability check.

For a self-employed borrower with meaningful collateral, business borrowing involved (`purpose === business` or `loanType === business_loan`), and an unsecured/business-style current product, the Negotiation Card recommends asking a lender about a secured business/LAP-style structure. This is a borrower-side prompt to explore an alternative, not an automatic loan-type conversion or an approval prediction. Collateral may affect lender-side structure, pricing or capacity, but it must not increase the borrower-safe EMI or borrower-safe amount.

Source: My judgement

LTV

Loan Amount / Collateral Value × 100

Source: Challenge brief; My judgement; Standard lending mathematics

21. Negotiation Card

The Negotiation Card should show:

Verdict
Requested amount
Safe amount
Fair-rate range
EMI ceiling
Confidence
Reasons
Stress case

The purpose is to give the borrower a concise summary they can use when negotiating with a lender.

Source: Challenge brief