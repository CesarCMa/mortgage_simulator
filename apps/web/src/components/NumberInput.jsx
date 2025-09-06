import { useState } from "react";

function NumberInput(props) {
  const { id, incrementMultiplier } = props;
  const [value, setValue] = useState(0);
  const increment = () => setValue((prev) => prev + incrementMultiplier);
  const decrement = () => setValue((prev) => prev - incrementMultiplier);
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
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
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
