# Borrower Copilot — Run-throughs

These three run-throughs document the final prototype behavior using the challenge personas. Values not supplied by the challenge persona are explicitly marked as run-through assumptions.

---

## 1. Priya — Salaried Borrower

### Profile

| Input | Value |
|---|---|
| Age / location | 29 / Bengaluru |
| Employment | Salaried MNC software engineer; 5 years |
| Monthly income | ₹1,10,000 |
| Existing EMI | ₹14,000 car EMI |
| Essential expenses | ₹28,000 rent only — run-through assumption because other essentials were not supplied |
| Credit score | CIBIL 780 |
| Request | ₹8,00,000 personal loan |
| Purpose | Wedding, mapped to the current `Personal / Emergency` option |
| Loan type | Unsecured Personal Loan |

### Questions asked

| # | Question | Answer | Why it was asked |
|---|---|---|---|
| 1 | Loan purpose | Personal / Emergency | Core purpose input |
| 2 | Amount wanted | ₹8,00,000 | Compared with borrower-safe affordability |
| 3 | Loan type | Unsecured Personal Loan | Selects product/rate assumptions |
| 4 | Age | 26–45 years | Core borrower profile input |
| 5 | Monthly income | ₹1,10,000 | Core affordability input |
| 6 | Income type | Salaried | Income stability and confidence |
| 7 | Existing EMIs | ₹14,000 | Used in FOIR and monthly-surplus capacity |
| 8 | Essential expenses | ₹28,000 | Used to calculate monthly surplus |
| 9 | Credit score | 750+ | Strong credit branch and confidence |
| 10 | Adaptive questions | None | No adaptive trigger was met |

**Stopping point:** Credit score. No additional adaptive question was necessary for the current decision, range or confidence.

### O1 — Should I borrow?

**BORROW**

The requested ₹8,00,000 is below the borrower-safe amount, with stable salaried income, strong credit and manageable existing debt.

### O2 — How much?

- **Borrower-safe amount:** ₹15,28,471
- **Indicative lender-side capacity:** ₹16,60,000–₹20,30,000
- **Personal ceiling:** ₹15,28,471

The lender-side estimate is deliberately separated from what the borrower should safely carry.

### O3 — Fair rate

- **Fair-rate band:** 11.0%–13.0%
- **Lender quote:** Not supplied
- **APR:** Not calculated because no lender-specific rate and processing fee were supplied.

Compare a future lender's all-in APR against the fair-rate band rather than only the headline rate.

### O4 — EMI / outflow ceiling

- **Safe EMI ceiling:** ₹34,000/month
- **Stress:** 15% income drop → safe EMI ₹25,750; safe amount ₹11,57,592.
- **36 months:** ₹26,571 EMI / ₹1,56,572 interest
- **84 months:** ₹14,122 EMI / ₹3,86,264 interest

Shorter tenure increases monthly outflow but reduces total interest; longer tenure does the opposite.

### Negotiation Card

| Card value | Priya's position |
|---|---|
| Recommendation | **BORROW** |
| Borrower-safe amount | **₹15,28,471** |
| Lender-side capacity | ₹16,60,000–₹20,30,000 |
| Fair-rate band | **11.0%–13.0%** |
| EMI ceiling | **₹34,000/month** |
| Stress | 15% income drop → safe EMI ₹25,750; safe amount ₹11,57,592 |
| Tenure trade-off | 36m: ₹26,571 EMI / ₹1,56,572 interest; 84m: ₹14,122 EMI / ₹3,86,264 interest |
| Negotiation point | Treat ₹15,28,471 as the personal ceiling and compare the lender's all-in APR against 11.0%–13.0%. |

**What this demonstrates:** Priya shows the strong salaried path: the requested amount fits within borrower-safe affordability while lender-side capacity remains visibly separate.

---

## 2. Ravi — Self-employed Borrower

### Profile

| Input | Value |
|---|---|
| Age / location | 42 / Mysuru |
| Employment | Self-employed kirana business; 14 years |
| Monthly cash income | ₹40,000–₹80,000 |
| Run-through income | ₹40,000 — conservative lower-bound assumption |
| ITR | ₹4.2 lakh/year |
| Existing formal loans | None |
| Existing EMI | ₹0 |
| Essential expenses | ₹25,000 — run-through assumption |
| Credit score | NA / NH |
| Collateral | Unencumbered shop premises, approximately ₹45,00,000 |
| Request | ₹15,00,000 |
| Purpose | Second stock line + delivery vehicle, mapped to Business |
| Loan type | Business Loan |
| Expected productive return | ₹15,000/month — run-through assumption |

### Questions asked

| # | Question | Answer | Why it was asked |
|---|---|---|---|
| 1 | Loan purpose | Business / Expansion | Core purpose input |
| 2 | Amount wanted | ₹15,00,000 | Compared with safe borrowing capacity |
| 3 | Loan type | Business Loan | Selects business/product assumptions |
| 4 | Age | 26–45 years | Core borrower profile input |
| 5 | Monthly income | ₹40,000 | Conservative lower-bound run-through assumption |
| 6 | Income type | Self-employed | Triggers self-employed income questions |
| 7 | Lower-month income | ₹40,000 | Tests conservative income capacity |
| 8 | Business history | 3+ years | Supports business stability assessment |
| 9 | Expected productive return | ₹15,000/month | Adds context for productive borrowing |
| 10 | Existing EMIs | ₹0 | Used in FOIR and surplus capacity |
| 11 | Essential expenses | ₹25,000 | Used in monthly-surplus capacity |
| 12 | Credit score | NA / NH | Unknown credit stays unknown |
| 13 | Emergency savings | 3+ months | Triggered by limited affordability headroom |
| 14 | Collateral value | ₹45,00,000 | Supports lender-side structure, not borrower-safe affordability |

### O1 — Should I borrow?

**BORROW LESS**

The requested ₹15,00,000 is materially above the borrower-safe amount. Business purpose and collateral provide useful context, but collateral does not replace monthly repayment capacity.

### O2 — How much?

- **Borrower-safe amount:** ₹3,15,259
- **Indicative lender-side capacity:** ₹7,20,000–₹10,80,000
- **Personal ceiling:** ₹3,15,259

- **Effective annual rate used for safe-amount conversion:** 15.0% — the existing 12% assumption is clamped to Ravi's 15.0%–18.5% fair-rate band.

The safe amount uses the existing 15% effective annual rate selected within Ravi's 15.0%–18.5% fair-rate band. The safe amount uses the existing 15% effective annual rate selected within Ravi's 15.0%–18.5% fair-rate band. The lender-side amount is not an approval prediction.

### O3 — Fair rate

- **Fair-rate band:** 15.0%–18.5%
- **Lender quote:** Not supplied
- **APR:** Not calculated because no lender rate or processing fee was supplied.

The wider band reflects the absence of a formal credit score and the self-employed/business profile.

### O4 — EMI / outflow ceiling

- **Safe EMI ceiling:** ₹7,500/month
- **Emergency buffer:** 3+ months

The EMI ceiling is the amount Ravi should treat as his personal new-debt limit.

### Negotiation Card

| Card value | Ravi's position |
|---|---|
| Recommendation | **BORROW LESS** |
| Borrower-safe amount | **₹3,15,259** |
| Lender-side capacity | ₹7,20,000–₹10,80,000 |
| Fair-rate band | **15.0%–18.5%** |
| EMI ceiling | **₹7,500/month** |
| Emergency buffer | 3+ months |
| Collateral | ₹45,00,000 shop premises |
| Negotiation point | Keep the ₹45L collateral separate from borrower-safe affordability; the card also flags a secured business/LAP-style route worth discussing with the lender. Negotiate around the ₹3.15L personal ceiling. |

**What this demonstrates:** Ravi shows why lender-side structure and borrower affordability must remain separate. Property collateral does not automatically make a ₹15L loan affordable.

---

## 3. Anita — Variable / Informal Income Borrower

### Profile

| Input | Value |
|---|---|
| Age / location | 35 / Hubballi |
| Work | Informal delivery rider + home tailoring |
| Monthly income | ₹26,000–₹30,000 |
| Run-through income | ₹26,000 — conservative lower-bound assumption |
| Household | Two children; husband unemployed for 8 months |
| Existing debt | Three app loans; ₹35,000 outstanding; 30%+ rate |
| Existing EMI | ₹5,000 — run-through assumption; outstanding debt is not treated as EMI |
| Repayment history | One EMI bounced last month |
| Essential expenses | ₹18,000 — run-through assumption |
| Credit score | Don't know / Not sure |
| Request | ₹1,50,000 |
| Purpose | Electric scooter / productive delivery borrowing |
| Loan type | Vehicle Loan |
| Productive return | ₹8,000/month — run-through test assumption |
| Emergency buffer | Partial, 1–2 months |

### Questions asked

| # | Question | Answer | Why it was asked |
|---|---|---|---|
| 1 | Loan purpose | Vehicle Purchase | Core purpose/product input |
| 2 | Amount wanted | ₹1,50,000 | Compared with safe borrowing capacity |
| 3 | Loan type | Vehicle Loan | Selects product/rate assumptions |
| 4 | Age | 26–45 years | Core borrower profile input |
| 5 | Monthly income | ₹26,000 | Conservative lower-bound run-through assumption |
| 6 | Income type | Informal / Variable / Commission | Triggers variable-income questions |
| 7 | Lower-month income | ₹26,000 | Conservative income basis |
| 8 | Existing EMIs | ₹5,000 | Run-through assumption |
| 9 | High-cost debt | Yes | Three app loans at 30%+ indicate high-cost debt |
| 10 | Repayment history | Serious default / bounced EMI | Direct repayment-risk signal |
| 11 | Productive return | ₹8,000/month | Tests the claimed economic benefit |
| 12 | Essential expenses | ₹18,000 | Used in monthly-surplus capacity |
| 13 | Credit score | Don't know / Not sure | Unknown remains unknown |
| 14 | Emergency savings | Partial, 1–2 months | Shows limited financial buffer |

### O1 — Should I borrow?

**DON'T BORROW**

The borrower has multiple high-cost app loans and a recent bounced EMI. Combined with limited monthly cash-flow headroom, additional borrowing is unsafe.

The productive-return assumption does not override the serious repayment-risk signal.

### O2 — How much?

- **Borrower-safe amount:** ₹67,433
- **Requested amount:** ₹1,50,000
- **Decision:** Do not take the requested ₹1,50,000 loan.

The calculated safe amount is already far below the requested amount, and the repayment-risk signal independently supports avoiding new borrowing.

### O3 — Fair rate

- **Fair-rate band:** 11.5%–13.5%
- **Lender quote:** Not supplied
- **APR:** Not calculated because no lender-specific rate and processing fee were supplied.

A fair rate does not make an unaffordable or high-risk loan safe.

### O4 — EMI / outflow ceiling

- **Safe EMI ceiling:** ₹1,500/month
- **Stress safe EMI:** ₹0
- **Stress safe amount:** ₹0
- **Stress:** At a 15% income reduction, income becomes ₹22,100. After ₹18,000 essential expenses and ₹5,000 existing EMI, there is no remaining safe capacity for a new EMI.

### Negotiation Card

| Card value | Anita's position |
|---|---|
| Recommendation | **DON'T BORROW** |
| Requested amount | ₹1,50,000 |
| Borrower-safe amount | ₹67,433 |
| Fair-rate band | 11.5%–13.5% |
| EMI ceiling | ₹1,500/month |
| Stress | 15% income drop → safe EMI ₹0; safe amount ₹0 |
| High-cost debt | Yes — three app loans at 30%+ |
| Repayment risk | Recent bounced EMI |
| Emergency buffer | Partial, 1–2 months |
| Negotiation point | Do not add a new loan while high-cost debt and repayment stress remain unresolved. |

**What this demonstrates:** Anita is the safety-boundary case. A potentially productive purpose does not automatically override existing debt stress and repayment risk.

---

## Summary

| Borrower | Recommendation | Safe amount | Safe EMI | Fair-rate band | Confidence |
|---|---|---:|---:|---|---|
| **Priya** | **BORROW** | ₹15,28,471 | ₹34,000 | 11.0%–13.0% | High |
| **Ravi** | **BORROW LESS** | ₹3,37,163 | ₹7,500 | 15.0%–18.5% | Medium |
| **Anita** | **DON'T BORROW** | ₹67,433 | ₹1,500 | 11.5%–13.5% | Low |

### What the three scenarios demonstrate

- **Priya:** strong salaried borrower whose requested amount fits within a conservative borrower-safe ceiling.
- **Ravi:** self-employed borrower where income variability, limited formal credit history and collateral must be considered separately.
- **Anita:** financially stressed borrower where high-cost debt and repayment history justify a strong **Don't Borrow** recommendation despite the productive purpose.

> These are prototype outputs based on the documented assumptions in `RULES.md`. They are not lender approvals, guarantees of eligibility, or financial advice.
