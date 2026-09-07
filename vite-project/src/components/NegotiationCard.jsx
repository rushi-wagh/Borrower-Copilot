import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { formatINR } from "../utils/currency";

export default function NegotiationCard({ assessment, borrower }) {
  if (!assessment) {
    return null;
  }

  const lenderQuestions = buildLenderQuestions(borrower);
  const isRisky = assessment.recommendation === "Don't Borrow";
  const lenderSideCapacity = assessment.lenderSideCapacity;

  return (
    <section id="negotiation-card" className="negotiation-card" aria-label="Negotiation card">
      <div className="negotiation-header">
        <div>
          <span className="eyebrow">BORROWER SUMMARY</span>
          <h2>My borrowing position</h2>
        </div>
        <span className={`position-badge ${isRisky ? "risk" : ""}`}>
          {assessment.recommendation}
        </span>
      </div>

      <div className="negotiation-reason">
        {isRisky ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
        <div>
          <strong>Why</strong>
          <ul>
            {assessment.reasons.recommendation.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="negotiation-grid">
        <SummaryItem
          label="I'm asking for"
          value={formatINR(assessment.requestedAmount)}
        />
        <SummaryItem
          label="Borrower-safe amount"
          value={formatINR(assessment.safeAmount)}
          note="What I can reasonably carry based on my cash flow."
        />
        <SummaryItem
          label="Comfortable EMI"
          value={`${formatINR(assessment.safeEmi)} / month`}
          note={assessment.reasons.safeEmi}
        />
        <SummaryItem
          label="Fair rate to negotiate"
          value={assessment.fairRateRange}
          note="Indicative range for your profile, not a guaranteed lender offer."
        />
      </div>

      <div className="offer-cost-grid">
        <SummaryItem
          label="Lender quote"
          value={
            assessment.offerCost.offeredRate === null
              ? "Not available yet"
              : `${assessment.offerCost.offeredRate.toFixed(1)}%`
          }
          note={
            assessment.offerCost.offeredRate === null
              ? "Shown when a lender offer and annual rate are supplied."
              : assessment.offerCost.quoteAboveFairBand
                ? "Above the fair-rate band for this profile."
                : "Within the current fair-rate band."
          }
        />
        <SummaryItem
          label="All-in cost / APR"
          value={assessment.offerCost.aprLabel}
          note={assessment.offerCost.reason}
        />
      </div>

      <div className="capacity-split">
        <div>
          <span className="summary-label">Borrower-safe</span>
          <strong>{formatINR(assessment.safeAmount)}</strong>
          <p>What I can reasonably carry based on my cash flow.</p>
        </div>
        <div>
          <span className="summary-label">Lender-side</span>
          <strong>{lenderSideCapacity.range}</strong>
          <p>{lenderSideCapacity.reason} The card does not predict approval.</p>
        </div>
      </div>

      <p className="capacity-guidance">Use the borrower-safe amount as your personal ceiling.</p>

      {assessment.securedAlternativeSuggestion && (
        <p className="capacity-guidance">{assessment.securedAlternativeSuggestion}</p>
      )}

      {assessment.tenureTradeoff && (
        <div className="tenure-tradeoff">
          <div className="tenure-heading">
            <div>
              <span className="summary-label">Tenure trade-off</span>
              <strong>Keep EMI below your comfortable ceiling</strong>
            </div>
            <span className="tenure-assumption">
              {assessment.tenureTradeoff.annualRate}% p.a.
            </span>
          </div>
          <div className="tenure-options">
            <TenureOption
              label="Shorter tenure"
              option={assessment.tenureTradeoff.shorter}
              direction="Higher EMI / lower total interest"
            />
            <TenureOption
              label="Longer tenure"
              option={assessment.tenureTradeoff.longer}
              direction="Lower EMI / higher total interest"
            />
          </div>
        </div>
      )}

      <div className="negotiation-stress">
        <div>
          <span className="summary-label">Stress check</span>
          <strong>15% income-drop scenario</strong>
        </div>
        <div className="stress-values">
          <span>Safe EMI <strong>{formatINR(assessment.stressCase.stressedSafeEmi)}</strong></span>
          <span>Safe amount <strong>{formatINR(assessment.stressCase.stressedSafeAmount)}</strong></span>
        </div>
      </div>

      <div className="lender-questions">
        <div className="questions-heading">
          <div>
            <span className="summary-label">Ask your lender</span>
            <strong>Questions to take into the conversation</strong>
          </div>
          <ShieldCheck size={16} />
        </div>
        <ol>
          {lenderQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SummaryItem({ label, value, note }) {
  return (
    <div className="summary-item">
      <span className="summary-label">{label}</span>
      <strong>{value}</strong>
      {note && <p>{note}</p>}
    </div>
  );
}

function buildLenderQuestions(borrower) {
  if (borrower.lenderOffer === "yes") {
    return [
      "What is the all-in APR on this offer, including every applicable charge?",
      "What processing fee and other charges apply, and can any be waived?",
      "Is the quoted rate fixed or floating, and when can it change?",
      "What is the total repayment over the full tenure at this offered rate?",
      "Can the interest rate or processing fee be negotiated against the indicative range?",
    ];
  }

  return [
    "What is the all-in APR?",
    "What processing fee and other charges apply?",
    "Is the rate fixed or floating?",
    "What is the total repayment over the full tenure?",
    "Can the interest rate or processing fee be negotiated?",
  ];
}

function TenureOption({ label, option, direction }) {
  return (
    <div className="tenure-option">
      <span className="summary-label">{label}</span>
      <strong>{option.tenureMonths / 12} years</strong>
      <span className="tenure-emi">{formatINR(option.emi)} / month</span>
      <span className="tenure-interest">
        {formatINR(option.totalInterest)} total interest
      </span>
      <span className="tenure-direction">{direction}</span>
      {option.aboveSafeEmi && (
        <span className="tenure-warning">Above your comfortable EMI ceiling</span>
      )}
    </div>
  );
}