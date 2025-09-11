import { useState } from "react";

function PercentageInput({ id, step = 0.01, value,  onChange }) {
  const [innerValue, setInnerValue] = useState(value);

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleChange = (e) => {
    // Extract numbers, allow comma/dot for decimals
    const raw = e.target.value.replace(/[^0-9.,]/g, "").replace(",", ".");
    const num = parseFloat(raw);
    const safeNum = isNaN(num) ? 0 : num;
    setInnerValue(safeNum);
    if (onChange) onChange(safeNum);
  };

  const increment = () => {
    setInnerValue((prev) => {
      const newVal = +(prev + step).toFixed(2);
      if (onChange) onChange(newVal);
      return newVal;
    });
  };

  const decrement = () => {
    setInnerValue((prev) => {
      const newVal = +(prev - step).toFixed(2);
      if (onChange) onChange(newVal);
      return newVal;
    });
  };

  return (
    <div className="flex items-center text-slate-700">
      <button type="button" onClick={decrement}>
        <i className="fa-solid fa-minus"></i>
      </button>

      <input
        id={id}
        type="text"
        value={formatter.format(innerValue) + "%"}
        onChange={handleChange}
        className="no-spinner border border-slate-400 rounded-md mx-2 text-center w-24"
      />

      <button type="button" onClick={increment}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default PercentageInput;
