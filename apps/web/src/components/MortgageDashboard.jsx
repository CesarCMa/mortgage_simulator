import { useMortgageContext } from "../context/MortgageContext";

export default function MortgageDashboard() {
  const { mortgageFormInfo, mortgageCalculations } = useMortgageContext();

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const percent = (value) => `${(value * 100).toFixed(2)}%`;

  const safeCurrency = (value) =>
    Number.isFinite(value) ? currency.format(value) : "—";

  return (
    <div className="flex flex-col border border-slate-400 p-6 rounded-2xl bg-white/50 w-full">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Resumen de hipoteca</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="text-slate-700 font-medium mb-2">Datos introducidos</h3>
          <ul className="text-slate-800 space-y-1">
            <li>
              <span className="text-slate-600">Coste del inmueble:</span>
              <span className="ml-2 font-medium">{currency.format(mortgageFormInfo.houseCost)}</span>
            </li>
            <li>
              <span className="text-slate-600">Ahorro aportado:</span>
              <span className="ml-2 font-medium">{currency.format(mortgageFormInfo.savings)}</span>
            </li>
            <li>
              <span className="text-slate-600">Duración:</span>
              <span className="ml-2 font-medium">{mortgageFormInfo.years} años</span>
            </li>
            <li>
              <span className="text-slate-600">Interés:</span>
              <span className="ml-2 font-medium">{percent(mortgageFormInfo.interest)}</span>
            </li>
            <li>
              <span className="text-slate-600">Tipo de interés:</span>
              <span className="ml-2 font-medium">{mortgageFormInfo.variableInterest ? "Variable" : "Fijo"}</span>
            </li>
            <li>
              <span className="text-slate-600">Localización:</span>
              <span className="ml-2 font-medium capitalize">{mortgageFormInfo.location.replaceAll("_", " ")}</span>
            </li>
            <li>
              <span className="text-slate-600">Tipo de inmueble:</span>
              <span className="ml-2 font-medium">{mortgageFormInfo.newBuilding ? "Obra nueva" : "Segunda mano"}</span>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-slate-700 font-medium mb-2">Cálculos</h3>
          <ul className="text-slate-800 space-y-1">
            <li>
              <span className="text-slate-600">Impuestos:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.taxes)}</span>
            </li>
            <li>
              <span className="text-slate-600">Costes variables:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.variableCosts)}</span>
            </li>
            <li>
              <span className="text-slate-600">Costes fijos:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.totalFixedCosts)}</span>
            </li>
            <li>
              <span className="text-slate-600">Costes iniciales totales:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.totalUpfrontCosts)}</span>
            </li>
            <li>
              <span className="text-slate-600">Entrada efectiva:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.downPayment)}</span>
            </li>
            <li>
              <span className="text-slate-600">Importe del préstamo:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.loanAmount)}</span>
            </li>
            <li>
              <span className="text-slate-600">Cuota mensual estimada:</span>
              <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.monthlyPayment)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

