import { createContext, useContext, useState, useMemo } from 'react';
import { MORTGAGE_BASE_INFO } from '../data/mortgageBaseInfo';
import { calculateMortgageDetails } from '../utils/mortgageCalculations';

const MortgageContext = createContext();

export const MortgageProvider = ({ children }) => {
  const [mortgageFormInfo, setMortgageFormInfo] = useState(MORTGAGE_BASE_INFO);

  const mortgageCalculations = useMemo(() => 
    calculateMortgageDetails(mortgageFormInfo),
    [mortgageFormInfo]
  );

  console.log('Mortgage Calculations:', mortgageCalculations);

  const updateMortgageInfo = (newInfo) => {
    setMortgageFormInfo(newInfo);
  };

  return (
    <MortgageContext.Provider 
      value={{ 
        mortgageFormInfo, 
        updateMortgageInfo,
        setMortgageFormInfo,
        mortgageCalculations 
      }}
    >
      {children}
    </MortgageContext.Provider>
  );
};

export const useMortgageContext = () => {
  const context = useContext(MortgageContext);
  if (!context) {
    throw new Error('useMortgageContext must be used within a MortgageProvider');
  }
  return context;
};