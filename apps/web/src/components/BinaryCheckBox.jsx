import { useState } from "react";

function BinaryCheckBox({ labels = ["No", "Yes"],value,  onChange }) {
  const [selected, setSelected] = useState(Number(value));

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(Boolean(value));
    }
  };

  return (
    <div className="flex space-x-4 items-center text-slate-700">
      {labels.map((label, index) => (
        <label key={index} className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selected === index}
            onChange={() => handleSelect(index)}
            className="form-checkbox"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

export default BinaryCheckBox;
