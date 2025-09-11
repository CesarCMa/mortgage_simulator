import { useState } from "react";

function NumberInput(props) {
  const { id, incrementMultiplier, value, onChange } = props;
  const [innerValue, setInnerValue] = useState(value);

  const increment = () => {
    const newValue = innerValue + incrementMultiplier;
    setInnerValue(newValue);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = innerValue - incrementMultiplier;
    setInnerValue(newValue);
    onChange(newValue);
  };
  return (
    <div className="flex items-center text-slate-700">
      {" "}
      <button type="button" onClick={decrement}>
        {" "}
        <i className="fa-solid fa-minus"></i>{" "}
      </button>{" "}
      <input
        id={id}
        type="number"
        value={innerValue}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setInnerValue(newValue);
          onChange(newValue);
        }}
        className="no-spinner border border-slate-400 rounded-md mx-2 text-center"
      />{" "}
      <button type="button" onClick={increment}>
        {" "}
        <i className="fa-solid fa-plus"></i>{" "}
      </button>{" "}
    </div>
  );
}
export default NumberInput;
