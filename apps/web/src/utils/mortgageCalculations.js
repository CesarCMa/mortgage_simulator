import * as interestRates from "../data/interestRates.js";
import { MORTGAGE_COSTS } from "../data/mortgageBaseInfo";

export const calculateMortgageDetails = (mortgageInfo) => {
  const totalFixedCosts = MORTGAGE_COSTS.valuation + MORTGAGE_COSTS.gestoria;
  const taxes = mortgageInfo.newBuilding
    ? calculateNewBuildingTaxes(mortgageInfo.houseCost)
    : calculateSeconHandTaxes(mortgageInfo.houseCost, mortgageInfo.location);

  const variableCosts =
    mortgageInfo.houseCost *
    (MORTGAGE_COSTS.notary + MORTGAGE_COSTS.propertyRegistry);

  const totalUpfrontCosts = totalFixedCosts + taxes + variableCosts;
  const downPayment = mortgageInfo.savings - totalUpfrontCosts;

  const loanAmount = mortgageInfo.houseCost - downPayment;
  const monthlyInterestRate = mortgageInfo.interest / 12;
  const numberOfPayments = mortgageInfo.years * 12;

  // Calculate monthly principal and interest
  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = totalPaid - loanAmount;
  const totalCost = totalFixedCosts + taxes + variableCosts + totalInterest;

  return {
    totalFixedCosts,
    taxes,
    totalUpfrontCosts,
    downPayment,
    variableCosts,
    monthlyPayment,
    loanAmount,
    numberOfPayments,
    totalInterest,
    totalCost,
  };
};

function calculateSeconHandTaxes(propertyPrice, location) {
  const itpRate = interestRates.ITP_RATES[location] || 0;
  const iajRate = interestRates.IAJ_RATES[location] || 0;

  return propertyPrice * (itpRate + iajRate);
}

function calculateNewBuildingTaxes(propertyPrice) {
  return propertyPrice * MORTGAGE_COSTS.iva;
}
