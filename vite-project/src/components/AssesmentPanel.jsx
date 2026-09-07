import { useState } from "react";
import {
  BarChart3,
  ChevronRight,
  Sparkles,
  Wallet,
  Shield,
  FileCheck,
  Building2,
  DollarSign,
  PieChart,
  User,
} from "lucide-react";
import { formatINR } from "../utils/currency";
import { parseAmount } from "../utils/numbers";
import {
  QUESTION_DEFINITIONS,
  getNextAdaptiveQuestion,
  CORE_QUESTIONS,
} from "../engine/questions";

const ICON_MAP = {
  purpose: Shield,
  requestedAmount: DollarSign,
  loanType: FileCheck,
  age: User,
  income: BarChart3,
  incomeType: Building2,
  lowMonthIncome: PieChart,
  businessTenure: Building2,
  productiveReturn: DollarSign,
  highCostDebt: FileCheck,
  existingEmi: Wallet,
  essentialExpenses: Wallet,
  creditScore: Shield,
  repaymentHistory: FileCheck,
  emergencySavings: Wallet,
  collateralValue: Building2,
  lenderOffer: FileCheck,
  offeredRate: DollarSign,
  processingFee: DollarSign,
};

export default function AssessmentPanel({ borrower, updateBorrower, assessment }) {
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [draftQuestionId, setDraftQuestionId] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  // Evaluate the next decision-critical adaptive question based on current borrower state.
  // assessment is passed so the FOIR check uses (existingEmi + safeEmi) / income per Rule 4.
  const nextAdaptiveId = getNextAdaptiveQuestion(borrower, assessment);
  const activeQuestionId = editingQuestionId || nextAdaptiveId;
  const isComplete = activeQuestionId === null;

  const question = activeQuestionId ? QUESTION_DEFINITIONS[activeQuestionId] : null;
  const currentValue = activeQuestionId
    ? draftQuestionId === activeQuestionId
      ? draftValue
      : borrower[activeQuestionId]
    : "";

  const isCurrentValid = () => {
    if (!question) return false;
    if (question.type === "amount") {
      return parseAmount(currentValue) !== null;
    }
    if (question.type === "choice" || question.type === "text") {
      return (
        currentValue !== undefined &&
        currentValue !== null &&
        String(currentValue).trim() !== ""
      );
    }
    return false;
  };

  const handleContinue = () => {
    if (activeQuestionId) {
      updateBorrower(activeQuestionId, currentValue);
    }
    if (editingQuestionId) {
      setEditingQuestionId(null);
    }
    setDraftQuestionId(null);
    setDraftValue("");
  };

  const jumpToQuestion = (qId) => {
    setEditingQuestionId(qId);
    setDraftQuestionId(qId);
    setDraftValue(borrower[qId] ?? "");
  };

  if (isComplete) {
    return (
      <Panel
        borrower={borrower}
        activeQuestionId={null}
        onSelectQuestion={jumpToQuestion}
        eyebrow="ASSESSMENT COMPLETE"
        title="Your adaptive borrowing position is ready."
        description="All decision-critical information for your profile has been collected. No further questions are required."
      >
        <div className="completed-summary">
          <SummaryRow
            label="Monthly income"
            value={formatINR(parseAmount(borrower.income) ?? 0)}
          />
          {borrower.requestedAmount && (
            <SummaryRow
              label="Amount wanted"
              value={formatINR(parseAmount(borrower.requestedAmount) ?? 0)}
            />
          )}
          <SummaryRow
            label="Existing EMIs"
            value={formatINR(parseAmount(borrower.existingEmi) ?? 0)}
          />
          <SummaryRow
            label="Essential expenses"
            value={formatINR(parseAmount(borrower.essentialExpenses) ?? 0)}
          />
        </div>

      </Panel>
    );
  }

  return (
    <Panel
      borrower={borrower}
      activeQuestionId={activeQuestionId}
      onSelectQuestion={jumpToQuestion}
      eyebrow={question.eyebrow}
      title={question.title}
      description={question.description}
    >
      {question.type === "amount" && (
        <AmountInput
          value={currentValue}
          placeholder={question.placeholder}
          suffix={question.suffix}
          onChange={(val) => {
            setDraftQuestionId(activeQuestionId);
            setDraftValue(val);
          }}
        />
      )}

      {question.type === "choice" && (
        <ChoiceGrid
          options={question.options}
          value={currentValue}
          onChange={(val) => {
            setDraftQuestionId(activeQuestionId);
            setDraftValue(val);
          }}
        />
      )}

      {question.type === "text" && (
        <TextInput
          value={currentValue}
          placeholder={question.placeholder}
          onChange={(val) => {
            setDraftQuestionId(activeQuestionId);
            setDraftValue(val);
          }}
        />
      )}

      <InputHelper>{question.helper}</InputHelper>

      <Action onClick={handleContinue} disabled={!isCurrentValid()}>
        {question.actionLabel || "Continue"}
      </Action>
    </Panel>
  );
}

function Panel({
  borrower,
  activeQuestionId,
  onSelectQuestion,
  eyebrow,
  title,
  description,
  children,
}) {
  const getAnsweredQuestionIds = () => {
    const answered = [];
    // Include core questions that have values
    for (const qId of CORE_QUESTIONS) {
      if (isFilled(borrower[qId])) {
        answered.push(qId);
      }
    }
    // Include any adaptive questions that have values
    for (const qId of Object.keys(QUESTION_DEFINITIONS)) {
      if (!CORE_QUESTIONS.includes(qId) && isFilled(borrower[qId])) {
        answered.push(qId);
      }
    }
    // If active question is not in answered list yet, add it so user sees it
    if (activeQuestionId && !answered.includes(activeQuestionId)) {
      answered.push(activeQuestionId);
    }
    return answered;
  };

  const getKnownValue = (qId) => {
    const val = borrower[qId];
    const def = QUESTION_DEFINITIONS[qId];
    if (!isFilled(val)) {
      return "Not added yet";
    }
    if (def.type === "amount") {
      const parsed = parseAmount(val);
      return parsed !== null ? formatINR(parsed) : "Not added yet";
    }
    if (def.type === "choice") {
      const opt = def.options.find((o) => o.value === val);
      return opt ? opt.label : String(val);
    }
    return String(val);
  };

  const answeredIds = getAnsweredQuestionIds();

  return (
    <div id="assessment" className="assessment-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="assessment-status">
          <span className="status-dot" />
          Adaptive Profile
        </div>
      </div>

      <div className="question-card">{children}</div>

      <div className="section-label">
        <span>WHAT WE KNOW</span>
        <span>Adaptive assessment</span>
      </div>

      <div className="known-grid">
        {answeredIds.map((qId) => {
          const def = QUESTION_DEFINITIONS[qId];
          const Icon = ICON_MAP[qId] || BarChart3;
          return (
            <KnownItem
              key={qId}
              icon={Icon}
              label={def.knownLabel}
              value={getKnownValue(qId)}
              active={activeQuestionId === qId}
              onClick={() => onSelectQuestion(qId)}
            />
          );
        })}
      </div>
    </div>
  );
}

function isFilled(val) {
  return val !== undefined && val !== null && String(val).trim() !== "";
}

function AmountInput({ value, placeholder, suffix = "per month", onChange }) {
  return (
    <label className="input-wrapper">
      <span className="currency">₹</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {suffix && suffix.trim() !== "" && (
        <span className="input-suffix">{suffix}</span>
      )}
    </label>
  );
}

function TextInput({ value, placeholder, onChange }) {
  return (
    <label className="input-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function ChoiceGrid({ options, value, onChange }) {
  return (
    <div className="choice-grid">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`choice-card ${value === opt.value ? "selected" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function InputHelper({ children }) {
  return (
    <div className="input-helper">
      <Sparkles size={14} />
      {children}
    </div>
  );
}

function Action({ children, onClick, disabled = false }) {
  return (
    <div className="question-actions">
      <button
        className="primary-button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function KnownItem({ icon: Icon, label, value, active, onClick }) {
  return (
    <div
      className={`known-card ${active ? "active" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="known-icon">
        <Icon size={17} />
      </div>

      <div className="known-content">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}