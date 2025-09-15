import { useMortgageContext } from "../context/MortgageContext";
import PieChart from "./PieChart";

export default function MortgageDashboard() {
  const { mortgageFormInfo, mortgageCalculations } = useMortgageContext();

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const safeCurrency = (value) =>
    Number.isFinite(value) ? currency.format(value) : "—";

  const chartData = [
    { label: "Intereses", value: mortgageCalculations.totalInterest, color: "#0ea5e9" },
    { label: "Impuestos", value: mortgageCalculations.taxes, color: "#f59e0b" },
    { label: "Costes fijos", value: mortgageCalculations.totalFixedCosts, color: "#10b981" },
    { label: "Costes variables", value: mortgageCalculations.variableCosts, color: "#6366f1" },
  ];

  const totalForLegend = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <div className="rounded-xl bg-white/70 border border-slate-200 p-4">
            <div className="text-slate-600 text-sm">Coste total de la hipoteca</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{safeCurrency(mortgageCalculations.totalCost)}</div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="rounded-xl bg-white/70 border border-slate-200 p-4">
            <div className="text-slate-600 text-sm">Cuota mensual estimada</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{safeCurrency(mortgageCalculations.monthlyPayment)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-4">
        <PieChart data={chartData} size={220} strokeWidth={28} />
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {chartData.map((item) => {
          const percentage = totalForLegend > 0 ? Math.round((item.value / totalForLegend) * 100) : 0;
          return (
            <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/70 border border-slate-200 px-3 py-2">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }} />
                <span className="text-slate-700">{item.label}</span>
              </div>
              <div className="text-slate-900 font-medium">
                {safeCurrency(item.value)} <span className="text-slate-500 text-sm">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        <h3 className="text-slate-700 font-medium mb-2">Desglose de costes</h3>
        <ul className="text-slate-800 space-y-1">
          <li>
            <span className="text-slate-600">Intereses totales:</span>
            <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.totalInterest)}</span>
          </li>
          <li>
            <span className="text-slate-600">Impuestos:</span>
            <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.taxes)}</span>
          </li>
          <li>
            <span className="text-slate-600">Costes fijos:</span>
            <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.totalFixedCosts)}</span>
          </li>
          <li>
            <span className="text-slate-600">Costes variables:</span>
            <span className="ml-2 font-medium">{safeCurrency(mortgageCalculations.variableCosts)}</span>
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
            <span className="text-slate-600">Número de cuotas:</span>
            <span className="ml-2 font-medium">{mortgageCalculations.numberOfPayments}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

