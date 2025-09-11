import { useEffect, useState } from "react";

function PercentageInput({ id, step = 0.01, value, onChange }) {
  const [innerValue, setInnerValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    // Keep local numeric value in sync if parent updates it
    setInnerValue(value);
    if (!isFocused) {
      setText("");
    }
  }, [value]);

  const toDisplayText = (num) => String(num).replace(".", ",");

  const sanitise = (s) => {
    // Normalize dot to comma and keep only digits and a single comma
    const normalised = s.replace(/\./g, ",");
    const allowed = normalised.replace(/[^\d,]/g, "");
    const firstComma = allowed.indexOf(",");
    if (firstComma === -1) return allowed;
    const before = allowed.slice(0, firstComma + 1);
    const after = allowed.slice(firstComma + 1).replace(/,/g, "");
    return before + after;
  };

  const maybeParse = (s) => {
    // Parse only when we have a complete number (not ending with comma)
    if (!s) return null;
    if (s.endsWith(",")) return null;
    // Replace comma with dot for JS parse
    const raw = s.replace(",", ".");
    const parsed = parseFloat(raw);
    return isNaN(parsed) ? null : parsed;
  };

  const handleChange = (e) => {
    const next = sanitise(e.target.value);
    setText(next);
    const parsed = maybeParse(next);
    if (parsed !== null) {
      const rounded = +parsed.toFixed(2);
      setInnerValue(rounded);
      if (onChange) onChange(rounded);
    }
  };

  const increment = () => {
    setInnerValue((prev) => {
      const newVal = +((prev ?? 0) + step).toFixed(2);
      if (onChange) onChange(newVal);
      // If focused, reflect change in text using comma
      if (isFocused) setText(toDisplayText(newVal));
      return newVal;
    });
  };

  const decrement = () => {
    setInnerValue((prev) => {
      const newVal = +((prev ?? 0) - step).toFixed(2);
      if (onChange) onChange(newVal);
      if (isFocused) setText(toDisplayText(newVal));
      return newVal;
    });
  };

  const displayValue = () => {
    if (isFocused) {
      return text;
    }
    return formatter.format(innerValue) + "%";
  };

  return (
    <div className="flex items-center text-slate-700">
      <button type="button" onClick={decrement}>
        <i className="fa-solid fa-minus"></i>
      </button>

      <input
        id={id}
        type="text"
        value={displayValue()}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          setText(innerValue === undefined || innerValue === null ? "" : toDisplayText(innerValue));
        }}
        onBlur={() => {
          setIsFocused(false);
          setText("");
        }}
        className="no-spinner border border-slate-400 rounded-md mx-2 text-center w-24"
      />

      <button type="button" onClick={increment}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default PercentageInput;
