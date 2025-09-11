import EuroInput from "./EuroInput";
import NumberInput from "./NumberInput";
import PercentageInput from "./PercentageInput";
import BinaryCheckBox from "./BinaryCheckBox";
import MultiSelect from "./MultiSelect";
import * as interestRates from "../../data/interestRates";
import * as mortgageBaseInfo from "../../data/mortgageBaseInfo";
import { useState } from "react";

const MortgageInfoForm = () => {
  const [mortgageInfo, setMortgageInfo] = useState(
    mortgageBaseInfo.MORTGAGE_BASE_INFO
  );

  const handleUpdateMortgageInfo = (field) => (value) => {
    setMortgageInfo((prev) => ({ ...prev, [field]: value }));
  };

  console.log(mortgageInfo);

  return (
    <form
      className="flex flex-col border border-slate-400 p-6 rounded-2xl bg-white/50"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col sm:flex-row my-2 justify-between">
        <label htmlFor="houseCost" className="text-slate-700 mr-4 my-1">
          Coste del Inmueble:
        </label>
        <EuroInput
          id="houseCost"
          incrementMultiplier={10000}
          value={mortgageInfo.houseCost}
          onChange={handleUpdateMortgageInfo("houseCost")}
        />
      </div>
      <div className="flex flex-col sm:flex-row my-2 justify-between">
        <label htmlFor="savings" className="text-slate-700 mr-4 my-1">
          Ahorro aportado:
        </label>
        <EuroInput
          id="saving"
          incrementMultiplier={10000}
          value={mortgageInfo.savings}
          onChange={handleUpdateMortgageInfo("savings")}
        />
      </div>
      <div className="flex my-2 justify-between flex-col sm:flex-row">
        <label htmlFor="years" className="text-slate-700 mr-4 py-1">
          Duración (años):
        </label>
        <NumberInput
          id="years"
          incrementMultiplier={5}
          value={mortgageInfo.years}
          onChange={handleUpdateMortgageInfo("years")}
        />
      </div>
      <div className="flex my-2 justify-between flex-col sm:flex-row">
        <div className="flex my-1">
          <label htmlFor="interest" className="text-slate-700 mr-4 py-1">
            Interés:
          </label>
          <BinaryCheckBox
            labels={["fijo", "variable"]}
            value={mortgageInfo.variableInterest}
            onChange={handleUpdateMortgageInfo("variableInterest")}
          />
        </div>
        <PercentageInput
          id="interest"
          step={0.1}
          value={mortgageInfo.interest}
          onChange={handleUpdateMortgageInfo("interest")}
        />
      </div>
      <div className="flex my-2 justify-between sm:items-center flex-col sm:flex-row">
        <label htmlFor="place" className="text-slate-700 mr-4 py-1">
          Localización:
        </label>
        <MultiSelect
          regions={interestRates.REGIONS}
          value={mortgageInfo.location}
          onChange={handleUpdateMortgageInfo("location")}
        />
      </div>
      <div className="flex my-2 justify-between flex-col sm:flex-row">
        <label htmlFor="interest" className="text-slate-700 mr-4 py-1">
          Tipo de inmueble:
        </label>
        <BinaryCheckBox
          labels={["segunda mano", "obra nueva"]}
          value={mortgageInfo.newBuilding}
          onChange={handleUpdateMortgageInfo("newBuilding")}
        />
      </div>
    </form>
  );
};

export default MortgageInfoForm;
