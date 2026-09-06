import {
  CircleHelp,
  ShieldCheck,
  Sparkles,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { formatINR } from "../utils/currency";

export default function InsightPanel({ assessment }) {
  const hasAffordabilityData = assessment !== null;

  return (
    <aside id="overview" className="insight-panel">
      <div className="insight-header">
        <div>
          <span className="eyebrow">LIVE VIEW</span>
          <h3>Your borrowing position</h3>
        </div>

        <button className="close-button">
          <X size={17} />
        </button>
      </div>

      <div className="progress-section">
        <div className="progress-top">
          <span>Assessment status</span>
          <strong>
            {hasAffordabilityData ? `Calculated (${assessment.confidence} Confidence)` : "Building"}
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{
              width: hasAffordabilityData ? "75%" : "29%",
            }}
          />
        </div>
      </div>

      <div className="recommendation-block">
        <div className="metric-title">
          <span>Recommendation</span>
        </div>
        <strong className="recommendation-value">
          {assessment ? assessment.recommendation : "—"}
        </strong>
        {assessment && (
          <ul className="reason-list">
            {assessment.reasons.recommendation.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        )}
      </div>

      {assessment && assessment.requestedAmount !== null && (
        <div className="requested-comparison">
          <div className="comparison-header">
            {assessment.requestedWithinSafeAmount ? (
              <CheckCircle2 size={16} className="text-success" />
            ) : (
              <AlertTriangle size={16} className="text-warning" />
            )}
            <span>
              {assessment.requestedWithinSafeAmount
                ? "Requested amount is safe"
                : "Borrow less recommendation"}
            </span>
          </div>
          <p>
            {assessment.requestedWithinSafeAmount
              ? `Your requested ${formatINR(assessment.requestedAmount)} fits within your safe limit of ${formatINR(assessment.safeAmount)}.`
              : `Your requested ${formatINR(assessment.requestedAmount)} exceeds your safe limit of ${formatINR(assessment.safeAmount)}.`}
          </p>
        </div>
      )}

      <div className="metric-list">
        <div className="metric">
          <div className="metric-title">
            <span>Comfortable EMI</span>
            <CircleHelp size={14} />
          </div>

          <strong className={assessment ? "" : "metric-muted"}>
            {assessment ? formatINR(assessment.safeEmi) : "—"}
          </strong>

          <span className="metric-caption">
            {assessment
              ? `Why: ${assessment.reasons.safeEmi}`
              : "We'll calculate this once we understand your essential expenses and existing EMIs."}
          </span>
        </div>

        <div className="metric">
          <div className="metric-title">
            <span>Safe borrowing amount</span>
          </div>

          <strong className={assessment ? "" : "metric-muted"}>
            {assessment ? formatINR(assessment.safeAmount) : "—"}
          </strong>

          <span className="metric-caption">
            {assessment
              ? `Why: ${assessment.reasons.safeAmount}`
              : "Estimated from your available monthly cash flow."}
          </span>
        </div>

        <div className="metric">
          <div className="metric-title">
            <span>Indicative fair rate</span>
          </div>

          <strong className={assessment ? "" : "metric-muted"}>
            {assessment ? assessment.fairRateRange : "—"}
          </strong>

          <span className="metric-caption">
            {assessment
              ? `Why: ${assessment.reasons.fairRate}`
              : "The range will reflect your loan type and borrower profile."}
          </span>
        </div>

        <div className="metric">
          <div className="metric-title">
            <span>Confidence</span>
          </div>

          <strong className={assessment ? "" : "metric-muted"}>
            {assessment ? assessment.confidence : "—"}
          </strong>

          <span className="metric-caption">
            {assessment
              ? `Why: ${assessment.reasons.confidence}`
              : "Confidence will reflect the completeness and strength of your profile."}
          </span>
        </div>
      </div>

      {assessment && (
        <div className="stress-card">
          <div className="metric-title">
            <span>Stress case</span>
          </div>
          <strong>{formatINR(assessment.stressCase.stressedSafeAmount)}</strong>
          <p>{assessment.stressCase.interpretation}</p>
        </div>
      )}

      <div className="why-card">
        <div className="why-icon">
          <Sparkles size={17} />
        </div>

        <div>
          <strong>Why this matters</strong>
          <p>
            We're not trying to tell you what a lender will approve. We're estimating what you can comfortably carry.
          </p>
        </div>
      </div>

      <div className="card-footer">
        <span>Borrower-side decision support</span>
        <ShieldCheck size={15} />
      </div>
    </aside>
  );
}