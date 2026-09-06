import { useState } from "react";

import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import AssessmentPanel from "./components/AssesmentPanel";
import InsightPanel from "./components/InsightPanel";
import NegotiationCard from "./components/NegotiationCard";
import { calculateAssessment } from "./engine/assesment";
import { parseAmount } from "./utils/numbers";

import "./App.css";

function App() {
  const [borrower, setBorrower] = useState({
    purpose: "",
    requestedAmount: "",
    loanType: "",
    age: "",
    income: "",
    incomeType: "",
    lowMonthIncome: "",
    businessTenure: "",
    productiveReturn: "",
    highCostDebt: "",
    existingEmi: "",
    essentialExpenses: "",
    creditScore: "",
    repaymentHistory: "",
    emergencySavings: "",
    collateralValue: "",
    lenderOffer: "",
    offeredRate: "",
    processingFee: "",
  });

  const updateBorrower = (field, value) => {
    setBorrower((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const parsedIncome = parseAmount(borrower.income);
  const parsedExistingEmi = parseAmount(borrower.existingEmi);
  const parsedEssentialExpenses = parseAmount(borrower.essentialExpenses);
  const parsedRequestedAmount = parseAmount(borrower.requestedAmount);
  const parsedLowMonthIncome = parseAmount(borrower.lowMonthIncome);
  const parsedProcessingFee = parseAmount(borrower.processingFee);

  const hasAffordabilityData =
    parsedIncome !== null &&
    parsedExistingEmi !== null &&
    parsedEssentialExpenses !== null;

  const assessment = hasAffordabilityData
    ? calculateAssessment({
        income: parsedIncome,
        existingEmi: parsedExistingEmi,
        essentialExpenses: parsedEssentialExpenses,
        requestedAmount: parsedRequestedAmount,
        incomeType: borrower.incomeType,
        lowMonthIncome: parsedLowMonthIncome,
        loanType: borrower.loanType,
        creditScore: borrower.creditScore,
        repaymentHistory: borrower.repaymentHistory,
        collateralValue: parseAmount(borrower.collateralValue),
        lenderOffer: borrower.lenderOffer,
        offeredRate: borrower.offeredRate,
        processingFee: parsedProcessingFee,
      })
    : null;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <section className="workspace">
          <AssessmentPanel
            borrower={borrower}
            updateBorrower={updateBorrower}
            assessment={assessment}
          />

          <InsightPanel assessment={assessment} borrower={borrower} />
        </section>

        <NegotiationCard assessment={assessment} borrower={borrower} />
      </main>
    </div>
  );
}

export default App;