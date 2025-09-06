import EuroInput from "./EuroInput";
import NumberInput from "./NumberInput";
import PercentageInput from "./PercentageInput";
import BinaryCheckBox from "./BinaryCheckBox";

const MortgageInfoForm = () => {
  return (
    <form className="flex flex-col border border-slate-400 p-6 rounded-2xl bg-white/50">
      <div className="flex my-2 justify-between">
        <label htmlFor="houseCost" className="text-slate-700 mr-4">Coste del Inmueble:</label>
        <EuroInput id="houseCost" incrementMultiplier={10000}/>
      </div>
      <div className="flex my-2 justify-between">
        <label htmlFor="savings" className="text-slate-700 mr-4">Ahorro aportado:</label>
        <EuroInput id="saving" incrementMultiplier={10000}/>
      </div>
      <div className="flex my-2 justify-between">
        <label htmlFor="years" className="text-slate-700 mr-4">Duración (años):</label>
        <NumberInput id="years" incrementMultiplier={5}/>
      </div>
      <div className="flex my-2 justify-between">
        <label htmlFor="interest" className="text-slate-700 mr-4">Interés:</label>
        <BinaryCheckBox labels={["fijo", "variable"]}/>
        <PercentageInput id="interest" step={0.1}/>
      </div>
    </form>
  );
};

export default MortgageInfoForm;
