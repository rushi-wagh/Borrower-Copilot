What it is
Borrower Copilot is a borrower-side decision-support tool for Indian borrowers. It helps a borrower understand:

Should I borrow at all?
How much can I safely carry?
What interest rate is reasonable?
What EMI should I agree to?
The product then produces a one-page Negotiation Card for lender conversations.

Borrower Copilot is not a lender approval system, credit model, or bureau-based decision engine. It does not predict approval or replace lender underwriting.

Problem
Lenders may communicate eligibility, approval, or a possible sanction amount, but that does not tell a borrower what they can safely afford or whether the proposed terms are reasonable. Borrower Copilot gives the borrower a transparent affordability and negotiation view before they commit to a loan.

Key Features
Adaptive borrower assessment
Affordability and FOIR-style analysis
Safe EMI and safe borrowing amount
Borrow / Borrow Less / Don't Borrow recommendation
Indicative fair interest-rate band
All-in cost and APR-aware comparison when offer data is available
15% income-drop stress scenario
Confidence based on available information
One-page Negotiation Card
Three borrower scenarios: salaried, self-employed/business, and variable/informal income
How the assessment works
Collect essential borrower information such as purpose, requested amount, loan type, income, existing EMIs, expenses, and credit profile.
Ask additional questions only when their answers can materially improve the decision, range, risk assessment, or confidence.
Calculate affordability using the documented borrower-side rules.
Separate borrower-safe affordability from an indicative lender-side capacity or likely sanction range.
Show the recommendation, fair-rate range, EMI ceiling, confidence, and stress case after the assessment is complete.
Generate the Negotiation Card with the borrower-facing position and negotiation points.
Important design principles
Borrower-first, not lender-first
Explain every important number
Unknown information widens uncertainty; it does not automatically become zero or bad
Conservative assumptions are explicitly disclosed
Serious repayment risk can override a purely mathematical affordability result
Rules and calculations are separated from the UI
Tech Stack
React
Vite
JavaScript
CSS
Lucide React
Project Structure
src/
  components/   Assessment, insight, navigation, and Negotiation Card UI
  engine/       Adaptive questions, affordability, assessment, and EMI calculations
  utils/        Currency formatting and numeric parsing helpers
  App.jsx       Application state and assessment composition
  App.css       Application layout and component styling
Key files include:

src/components/AssesmentPanel.jsx - normal core and adaptive interview flow
src/components/InsightPanel.jsx - live assessment status and result metrics
src/components/NegotiationCard.jsx - final borrower-facing negotiation summary
src/engine/questions.js - priority-based adaptive question selection
src/engine/affordability.js - surplus, FOIR, and safe EMI calculations
src/engine/assesment.js - recommendation, rate, confidence, lender-side capacity, stress, APR, and tenure outputs
src/engine/emi.js - EMI, loan amount, and loan-cost calculations
Running locally
From the vite-project directory:

npm install
npm run dev
Other available checks:

npm run build
npm run lint
Rules & Assumptions
Financial thresholds, product assumptions, rate bands, affordability rules, APR methodology, stress assumptions, and tenure assumptions are documented in the root-level RULES.md file. Those documented prototype assumptions explain how the displayed values should be interpreted.

Run-throughs
The root-level RUNTHROUGHS.md contains the three documented borrower scenarios, their question flows, assumptions, and assessment outputs:

Priya: salaried borrower
Ravi: self-employed/business borrower
Anita: variable/informal-income borrower
Disclaimer
Borrower Copilot is a prototype decision-support tool, not financial advice, lender approval, credit underwriting, or a guarantee of eligibility, sanction amount, or interest rates. Actual borrowing decisions should consider complete financial information and lender-specific terms.
