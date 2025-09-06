import { useState } from "react";

function EuroInput(props) {
  const { id, incrementMultiplier } = props;
  const [value, setValue] = useState(0);

  const formatter = new Intl.NumberFormat("de-DE"); // de-DE uses dots for thousands

  const increment = () => setValue((prev) => prev + incrementMultiplier);
  const decrement = () => setValue((prev) => Math.max(0, prev - incrementMultiplier)); // avoid negatives if you want

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setValue(Number(raw) || 0);
  };

  return (
    <div className="flex items-center text-slate-700">
      <button type="button" onClick={decrement}>
        <i className="fa-solid fa-minus"></i>
      </button>

      <input
        id={id}
        type="text"
        value={value ? formatter.format(value) + " €" : ""}
        onChange={handleChange}
        className="no-spinner border border-slate-400 rounded-md mx-2 text-center"
      />

      <button type="button" onClick={increment}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default EuroInput;
