import { createContext, useContext, useState } from 'react';
import { MORTGAGE_BASE_INFO } from '../data/mortgageBaseInfo';

const MortgageContext = createContext();

export const MortgageProvider = ({ children }) => {
  const [mortgageFormInfo, setMortgageFormInfo] = useState(MORTGAGE_BASE_INFO);

  const updateMortgageInfo = (newInfo) => {
    setMortgageFormInfo(newInfo);
  };

  return (
    <MortgageContext.Provider value={{ mortgageFormInfo, updateMortgageInfo }}>
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