# Borrower Copilot

**Borrower-side decision support for making smarter borrowing decisions.**

Borrower Copilot helps Indian borrowers build a clear borrowing position before they approach a lender. It answers four practical questions:

- **Should I borrow at all?**
- **How much can I safely carry?**
- **What interest rate is reasonable for me?**
- **What EMI should I agree to?**

The assessment then turns those answers into a **one-page Negotiation Card** that the borrower can use when discussing a loan with a lender.

> **Important:** Borrower Copilot is a borrower-side decision-support tool. It is **not** a lender approval system, credit model, bureau-based decision engine, or underwriting system. It does not predict approval or guarantee eligibility.

---

## The Problem

A lender may tell a borrower how much they are eligible for or what they could potentially be sanctioned.

But **lender eligibility is not the same as borrower affordability**.

A borrower also needs to know:

- What EMI can I comfortably carry?
- Am I taking on too much debt?
- Is the quoted interest rate reasonable?
- What happens if my income drops?
- What should I ask or negotiate before accepting the loan?

Borrower Copilot gives the borrower this perspective **before they commit to a loan**.

---

## What It Does

### 1. Adaptive Borrower Assessment

The assessment starts with the minimum information needed and asks additional questions only when they can materially improve:

- the borrowing decision
- the affordability range
- risk assessment
- confidence in the result

This avoids turning the product into a long, fixed questionnaire.

### 2. Borrower-Safe Affordability

The engine evaluates:

- monthly income
- essential expenses
- existing EMIs
- proposed EMI
- FOIR-style affordability
- monthly surplus

It produces a **borrower-safe EMI ceiling** and converts that into a safe borrowing amount.

### 3. Borrow / Borrow Less / Don't Borrow

The borrower receives one of three clear outcomes:

- **Borrow** — the requested amount appears supportable within the documented assumptions.
- **Borrow Less** — borrowing may be possible, but the requested amount exceeds the borrower-safe range.
- **Don't Borrow** — affordability or repayment-risk signals make borrowing inappropriate under the current profile.

Serious repayment risk can override a purely mathematical affordability result.

### 4. Fair Interest-Rate Range

The product provides an **indicative interest-rate band**, rather than pretending there is one universally correct rate.

The range considers factors such as:

- loan type
- secured vs unsecured structure
- credit profile
- income stability
- existing debt
- repayment history
- collateral
- available lender offers

When lender offer information is available, the product also supports **all-in cost and APR-aware comparison**.

### 5. Stress Scenario

The assessment includes a **15% income-drop stress case** to show how the borrower's safe repayment capacity changes under income pressure.

This helps answer:

> "What happens if my income falls?"

### 6. Confidence

Confidence reflects how much decision-critical information is available.

Unknown information does **not** automatically become zero or "bad." Instead, missing information widens uncertainty and can reduce confidence.

### 7. Negotiation Card

The final output is a **one-page borrower-facing Negotiation Card** containing the key borrowing position:

- recommendation
- borrower-safe amount
- EMI ceiling
- fair-rate range
- stress scenario
- important assumptions
- questions to ask the lender
- relevant negotiation points

The goal is to give the borrower something practical to take into a lender conversation.

---

## How the Assessment Works

```text
Essential borrower information
            ↓
Adaptive follow-up questions
            ↓
Affordability & risk analysis
            ↓
Borrower-safe borrowing position
            ↓
Lender-side capacity / likely range
            ↓
Recommendation + fair-rate range
            ↓
Stress scenario + confidence
            ↓
Negotiation Card
