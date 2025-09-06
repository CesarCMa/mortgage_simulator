import { useState } from "react";

function BinaryCheckBox({ labels = ["Yes", "No"], onChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex space-x-4 items-center">
      {labels.map((label, index) => (
        <label key={index} className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selected === index}
            onChange={() => handleSelect(index)}
            className="form-checkbox text-emerald-500"
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

export default BinaryCheckBox;
