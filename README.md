Borrower Copilot

Borrower-side decision support for making smarter borrowing decisions.

🔗 Live Demo
🔗 GitHub Repository

Borrower Copilot helps Indian borrowers build a clear borrowing position before they approach a lender. It answers four practical questions:

Should I borrow at all?
How much can I safely carry?
What interest rate is reasonable for me?
What EMI should I agree to?

The assessment then turns those answers into a one-page Negotiation Card that the borrower can use when discussing a loan with a lender.

Important: Borrower Copilot is a borrower-side decision-support tool. It is not a lender approval system, credit model, bureau-based decision engine, or underwriting system. It does not predict approval or guarantee eligibility.

The Problem

A lender may tell a borrower how much they are eligible for or what they could potentially be sanctioned.

But lender eligibility is not the same as borrower affordability.

A borrower also needs to know:

What EMI can I comfortably carry?
Am I taking on too much debt?
Is the quoted interest rate reasonable?
What happens if my income drops?
What should I ask or negotiate before accepting the loan?

Borrower Copilot gives the borrower this perspective before they commit to a loan.

What It Does
1. Adaptive Borrower Assessment

The assessment starts with the minimum information needed and asks additional questions only when they can materially improve:

the borrowing decision
the affordability range
risk assessment
confidence in the result

This avoids turning the product into a long, fixed questionnaire.

2. Borrower-Safe Affordability

The engine evaluates:

monthly income
essential expenses
existing EMIs
proposed EMI
FOIR-style affordability
monthly surplus

It produces a borrower-safe EMI ceiling and converts that into a safe borrowing amount.

3. Borrow / Borrow Less / Don't Borrow

The borrower receives one of three clear outcomes:

Borrow — the requested amount appears supportable within the documented assumptions.
Borrow Less — borrowing may be possible, but the requested amount exceeds the borrower-safe range.
Don't Borrow — affordability or repayment-risk signals make borrowing inappropriate under the current profile.

Serious repayment risk can override a purely mathematical affordability result.

4. Fair Interest-Rate Range

The product provides an indicative interest-rate band, rather than pretending there is one universally correct rate.

The range considers factors such as:

loan type
secured vs unsecured structure
credit profile
income stability
existing debt
repayment history
collateral
available lender offers

When lender offer information is available, the product also supports all-in cost and APR-aware comparison.

5. Stress Scenario

The assessment includes a 15% income-drop stress case to show how the borrower's safe repayment capacity changes under income pressure.

This helps answer:

"What happens if my income falls?"

6. Confidence

Confidence reflects how much decision-critical information is available.

Unknown information does not automatically become zero or "bad." Instead, missing information widens uncertainty and can reduce confidence.

7. Negotiation Card

The final output is a one-page borrower-facing Negotiation Card containing the key borrowing position:

recommendation
borrower-safe amount
EMI ceiling
fair-rate range
stress scenario
important assumptions
questions to ask the lender
relevant negotiation points

The goal is to give the borrower something practical to take into a lender conversation.

How the Assessment Works
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

The system deliberately separates:

What a lender might potentially sanction

from

What the borrower should personally be comfortable carrying.

The borrower-safe position is the primary recommendation.

Design Principles
Borrower-first, not lender-first

The product is designed around the borrower's financial capacity rather than maximizing potential loan eligibility.

Explain every important number

Displayed financial outputs are backed by documented rules, assumptions, or calculations.

Unknown ≠ Bad

If the borrower does not know something, the system does not automatically treat it as a negative signal.

Instead, uncertainty is reflected through the confidence and range.

Conservative assumptions are explicit

Where the borrower provides a range or incomplete information, the prototype uses documented conservative assumptions rather than silently inventing precision.

Risk can override affordability

A mathematically affordable loan can still be a poor decision when there are serious repayment-risk signals.

Rules are separated from the UI

Financial rules and calculations live in the engine layer rather than being embedded directly inside presentation components.

Example Borrower Profiles

The prototype includes three deliberately different scenarios:

Borrower	Profile	Outcome
Priya	Salaried MNC employee with strong credit	Borrow
Ravi	Self-employed business owner with limited formal credit history and substantial collateral	Borrow Less
Anita	Variable-income borrower with high-cost debt and a recent bounced EMI	Don't Borrow

These scenarios demonstrate how the assessment adapts its questions and recommendations based on the borrower's circumstances.

Tech Stack
React
Vite
JavaScript
CSS
Lucide React

No machine-learning model or LLM is used in the core financial decision engine. The important calculations remain deterministic and traceable to documented rules.

Project Structure
src/
├── components/
│   ├── AssesmentPanel.jsx
│   ├── InsightPanel.jsx
│   ├── NegotiationCard.jsx
│   └── ...
│
├── engine/
│   ├── questions.js
│   ├── affordability.js
│   ├── assesment.js
│   └── emi.js
│
├── utils/
│   ├── currency.js
│   └── numbers.js
│
├── App.jsx
├── App.css
└── index.css
Key Files
src/components/AssesmentPanel.jsx — core and adaptive assessment flow
src/components/InsightPanel.jsx — live assessment status and financial outputs
src/components/NegotiationCard.jsx — borrower-facing negotiation summary
src/engine/questions.js — priority-based adaptive question selection
src/engine/affordability.js — surplus, FOIR, and safe EMI calculations
src/engine/assesment.js — recommendation, rate, confidence, lender-side capacity, stress and APR-related outputs
src/engine/emi.js — EMI, loan amount, and loan-cost calculations
Running Locally
Prerequisites

Make sure you have:

Node.js installed — LTS recommended
npm installed — included with Node.js
Git installed
1. Clone the repository
git clone https://github.com/rushi-wagh/Borrower-Copilot.git
cd Borrower-Copilot
2. Install dependencies
npm install
3. Start the development server
npm run dev

Vite will start the development server. Open the URL shown in the terminal, typically:

http://localhost:5173
4. Build the application

To verify the production build:

npm run build
5. Run lint checks
npm run lint
Available Commands
Command	Purpose
npm install	Install project dependencies
npm run dev	Start the local development server
npm run build	Create a production build
npm run lint	Run ESLint checks
Rules & Assumptions

All financial thresholds, product assumptions, rate bands, affordability rules, APR methodology, stress assumptions, and tenure assumptions are documented in:

📄 RULES.md

The rules document explains:

what each rule is
the value or threshold used
why it exists
whether it comes from a source or is a prototype judgement
how important financial outputs are calculated
Run-throughs

Three complete borrower scenarios are documented in:

📄 RUNTHROUGHS.md

They cover:

Priya — salaried borrower
Ravi — self-employed/business borrower
Anita — variable/informal-income borrower

Each run-through documents the questions asked, assumptions used, assessment outputs, and borrower-facing result.

Live Demo

Try the deployed application:

🚀 Open Borrower Copilot : https://vite-project-henna-three.vercel.app/

Source code:

💻 View on GitHub : https://github.com/rushi-wagh/Borrower-Copilot

Disclaimer

Borrower Copilot is a prototype decision-support tool, not financial advice, lender approval, credit underwriting, or a guarantee of eligibility, sanction amount, or interest rate.

Actual borrowing decisions should consider complete financial information, lender-specific terms, applicable fees, and the borrower's individual circumstance
