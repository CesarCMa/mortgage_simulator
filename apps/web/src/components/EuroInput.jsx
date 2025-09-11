import { useState } from "react";

function EuroInput(props) {
  const { id, incrementMultiplier, value, onChange } = props;
  const [innerValue, setInnerValue] = useState(value);

  const formatter = new Intl.NumberFormat("de-DE"); // de-DE uses dots for thousands

  const increment = () => {
    const newValue = innerValue + incrementMultiplier;
    setInnerValue(newValue);
    onChange(newValue);
  };
  const decrement = () => {
    const newValue = Math.max(0, innerValue - incrementMultiplier);
    setInnerValue(newValue );
    onChange(newValue);
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const newValue = parseInt(raw) || 0;
    setInnerValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center text-slate-700">
      <button type="button" onClick={decrement}>
        <i className="fa-solid fa-minus"></i>
      </button>

      <input
        id={id}
        type="text"
        value={innerValue ? formatter.format(innerValue) + " €" : ""}
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
